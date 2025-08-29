# BFHL Placement Task API

Simple Express.js REST API implementing the Bajaj Finserv Health placement question.

## Endpoint
POST /bfhl

Request Body JSON:
{
  "data": ["a", "1", "334", "4", "R", "$"]
}

## Response
{
  "is_success": true,
  "user_id": "shambhavi_jha_27022004",
  "email": "shambhavi.jha2022@vitbhopal.ac.in",
  "roll_number": "22BCE11413",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}

Numbers and sum are always strings. Alphabets are returned uppercased. Concat string is reverse order of appearance of all alphabetical characters with alternating caps starting with Upper.

## Run locally
npm install
npm start

Then POST to http://localhost:3000/bfhl

## Deploy
You can deploy this repository directly to:
- Vercel (Node serverless) – set "build command" none, output not needed, use serverless function adaptation OR just use Railway/Render.
- Railway / Render – just import repo, it will run `npm install` then `npm start`.

Environment vars: none required.

## Testing quick
curl -X POST http://localhost:3000/bfhl -H 'Content-Type: application/json' -d '{"data":["2","a","y","4","&","-","*","5","92","b"]}'

## Author
Shambhavi Jha (22BCE11413)
