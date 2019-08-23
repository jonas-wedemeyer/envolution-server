#!/bin/bash

set -a
. .env
set +a

DB_HOST=localhost npx sequelize db:seed:all --config ./db/config.js --seeders-path ./db/seeders
