// Simple BFHL API without external dependencies
// Runs with: node server.js

const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 4000; // changed from 3000

const isNumericString = (s) => /^-?\d+$/.test(s.trim());
const isAlphabeticString = (s) => /^[a-zA-Z]+$/.test(s.trim());

function processData(data) {
  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  const alphaCharsForConcat = [];

  for (const raw of data) {
    if (raw === null || raw === undefined) continue;
    const item = String(raw).trim();
    if (!item.length) continue;

    if (isNumericString(item)) {
      const num = parseInt(item, 10);
      sum += num;
      if (Math.abs(num) % 2 === 0) even_numbers.push(item); else odd_numbers.push(item);
    } else if (isAlphabeticString(item)) {
      alphabets.push(item.toUpperCase());
      for (const ch of item) alphaCharsForConcat.push(ch);
    } else {
      special_characters.push(item);
    }
  }

  alphaCharsForConcat.reverse();
  let concat_string = '';
  alphaCharsForConcat.forEach((ch, idx) => {
    const lower = ch.toLowerCase();
    concat_string += idx % 2 === 0 ? lower.toUpperCase() : lower.toLowerCase();
  });

  return { odd_numbers, even_numbers, alphabets, special_characters, sum: String(sum), concat_string };
}

function sendJSON(res, statusCode, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS,GET'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,OPTIONS,GET'
    });
    return res.end();
  }

  if (urlObj.pathname === '/') {
    return sendJSON(res, 200, { message: 'BFHL API running', endpoint: '/bfhl' });
  }

  if (urlObj.pathname === '/bfhl') {
    if (req.method === 'POST') {
      let raw = '';
      req.on('data', chunk => {
        raw += chunk;
        if (raw.length > 100_000) req.destroy();
      });
      req.on('end', () => {
        try {
          const parsed = raw ? JSON.parse(raw) : {};
          const { data } = parsed;
          if (!Array.isArray(data)) {
            return sendJSON(res, 200, {
              is_success: false,
              user_id: 'shambhavi_jha_27022004',
              email: 'shambhavi.jha2022@vitbhopal.ac.in',
              roll_number: '22BCE11413',
              message: 'Invalid input: data should be an array.'
            });
          }
          const result = processData(data);
          return sendJSON(res, 200, {
            is_success: true,
            user_id: 'shambhavi_jha_27022004',
            email: 'shambhavi.jha2022@vitbhopal.ac.in',
            roll_number: '22BCE11413',
            ...result
          });
        } catch (e) {
          return sendJSON(res, 200, {
            is_success: false,
            user_id: 'shambhavi_jha_27022004',
            email: 'shambhavi.jha2022@vitbhopal.ac.in',
            roll_number: '22BCE11413',
            message: 'Invalid JSON'
          });
        }
      });
      return;
    } else {
      return sendJSON(res, 200, { operation_code: 1 });
    }
  }

  sendJSON(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;
