const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getHeaderForPost, getHeanderForGet } = require('./apiHandler');
const axios = require('axios');


const app = express();

const version = '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb'
// const BASE_URL = `https://replicate.com/api/models/stability-ai/stable-diffusion/versions/${version}/predictions`;
const BASE_URL = `https://replicate.com/api/models/prompthero/openjourney/versions/${version}/predictions`;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    console.log("Just got a request!");

    const ratioMap = {
        '1:1': {height: 512, width: 512},
        '2:3': {height: 768, width: 512},
        '3:2': {height: 512, width: 1024},
      }

    let searchString = req.query.value;
    let ratio = req.query.ratio;

    let config = getHeaderForPost();
    

    try {

        var data = JSON.stringify({
            "version": version,
            "inputs": {
                "width": ratioMap[ratio].width || 512,
                "height": ratioMap[ratio].height || 512 ,
                "prompt": searchString || "Iron man as thor",
                "num_outputs": 1,
                "guidance_scale": "7",
                "num_inference_steps": 50,
                "seed": null
            }
        });

        config = {
            method: 'post',
            url: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        const result = await axios(config);

        let newUrl = BASE_URL + '/' + result.data.uuid;
        console.log(newUrl);

        recursiveApiHandler(req, res, newUrl);

    } catch (error) {
        console.log('Error dusing POST request', error);
    }

});

const recursiveApiHandler = (req, res, URL) => {

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

        setTimeout(() => {
            body = JSON.parse(body);
            if (body.prediction.status === 'processing') {
                return recursiveApiHandler(req, res, URL);
            }
            res.send(body.prediction);
        }, 1500);
    });

}

app.get('/home', async (req, res) => {
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started at PORT ', PORT)
});