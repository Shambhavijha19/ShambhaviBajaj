#!/usr/bin/env bash
set -euo pipefail
URL=${1:-http://localhost:3000/bfhl}

json(){
  echo -e "\nRequest: $1" >&2
  curl -s -X POST "$URL" -H 'Content-Type: application/json' -d "$1" | jq .
}

json '{"data":["a","1","334","4","R","$"]}'
json '{"data":["2","a","y","4","&","-","*","5","92","b"]}'
json '{"data":["A","ABcD","DOE"]}'
