var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://lexica.art/api/infinite-prompts',
  'headers': {
    'authority': 'lexica.art',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'cookie': '__Secure-next-auth.callback-url=https%3A%2F%2Flexica.art; __Host-next-auth.csrf-token=7b0324bd61e6ea9f83db81e3801fe8661a195ec766e46225fb449ce71ab6244b%7C8cafa8d59991b731fa3f01de48c7f772ff928ab8c69686b7acd3fb10a1fb5858',
    'origin': 'https://lexica.art',
    'referer': 'https://lexica.art/',
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  },
  body: JSON.stringify({
    "text": "",
    "searchMode": "images",
    "source": "search",
    "cursor": 10,
    "model": "lexica-aperture-v2"
  })

};
request(options, function (error, response) {
//   if (error) throw new Error(error);
  console.log(response.body);
});
