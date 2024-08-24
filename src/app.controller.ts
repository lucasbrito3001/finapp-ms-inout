import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InternalErrorException } from './shared/exceptions';
import { RequestOutput } from './shared/response';

@Controller()
export class AppController {
  constructor(
    @InjectDataSource('pgsql')
    private pgsqlDataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('healthz')
  getHealthz(): RequestOutput {
    return new RequestOutput(200, 'The app is healthy', 'HEALTHY');
  }

  @Get('readyz')
  async getReadyz(): Promise<RequestOutput> {
    const queryRunner = this.pgsqlDataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.query('SELECT 1');
      await queryRunner.release();
    } catch (error) {
      console.log(error);
      throw new InternalErrorException('Database is not initialized');
    }

    return new RequestOutput(200, 'The app is ready to be executed', 'READY');
  }
}