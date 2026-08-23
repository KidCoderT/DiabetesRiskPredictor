#!/usr/bin/env bash
set -e
git pull
docker compose up -d --build
