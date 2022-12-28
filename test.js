

const URL = "https://replicate.com/api/models/stability-ai/stable-diffusion/versions/f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1/predictions/35smlahezvbf5f4q6rrj2kxk6u";

const request = require('request');

const options = {
  method: 'GET',
  url: URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


