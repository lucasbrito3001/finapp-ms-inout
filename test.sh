#!/bin/bash

secrets_list=($(yq -o=json '.secrets.list' helm-values.yaml | jq -rc '.[]'))

for secret in ${secrets_list[@]}; do
  secret_name="$(echo $secret | jq -r '.name')"
  echo $secret_name
done