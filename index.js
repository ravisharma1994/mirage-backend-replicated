const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getHeaderForPost, getHeanderForGet } = require('./apiHandler');
const axios = require('axios');


const app = express();

const BASE_URL = "https://replicate.com/api/models/stability-ai/stable-diffusion/versions/f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1/predictions";

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    console.log("Just got a request!");

    let searchString = req.query.value;

    let config = getHeaderForPost();

    var data = JSON.stringify({
        "inputs": {
            "width": 768,
            "height": 768,
            "prompt": searchString || "A dream of a distant galaxy, concept art, matte painting , hd, dramatic lighting, detailed",
            "scheduler": "K_EULER",
            "num_outputs": "1",
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 20
        }
    });

    try {

        var data = JSON.stringify({
            "version": "f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
            "input": {
                "prompt": "a photo of an astronaut riding a horse on mars"
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
        recursiveApiHandler(req, res , newUrl);

    } catch (error) {
        console.log('Error dusing POST request', error);
    }

});

const recursiveApiHandler = (req , res , URL) => {

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

        res.send(body);
    });

}

app.get('/home', async (req, res) => {
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started at PORT ', PORT)
});