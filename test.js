

const URL = "https://replicate.com/api/models/stability-ai/stable-diffusion/versions/f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1/predictions/gttuicirtvcc3iyn6s4iachylq";

const http = require('http');

const options = {
  hostname: URL,
  method: 'GET'
};

const req = http.request(options, res => {
  res.setEncoding('utf8');
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();

