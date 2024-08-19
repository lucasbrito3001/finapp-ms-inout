#!/bin/bash

secrets_list=($(yq -o=json '.secrets.list' helm-values.yaml | jq -rc '.[]'))

for secret in ${secrets_list[@]}; do
  secret_name="$(echo $secret | jq '.name')"
  echo $secret_name
done