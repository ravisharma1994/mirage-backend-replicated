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
        let response = await axios.post(BASE_URL, data);

        // Keep maing the GET API using we got the final result 
        let newUrl = BASE_URL + '/' + response.data.uuid;
        console.log(newUrl);
        config = getHeanderForGet(newUrl);
        let resultUlr = await recursiveApiHandler(newUrl);
        console.log(resultUlr);
        // console.log(response);

        res.json({ url: resultUlr });
    } catch (error) {
        console.log('Error dusing POST request');
    }

});

const recursiveApiHandler = async (newUrl) => {


    let response;
    try {
        response = await axios.get(newUrl);
        if (response.prediction.status !== "succeeded") {
            setTimeout(() => {
                return recursiveApiHandler(config);
            }, 2000);
        }
        return response.output[0];
    } catch (error) {
        console.log('Errr in get');
    } finally {
        return recursiveApiHandler(newUrl);
    }

}

app.get('/home', async (req, res) => {
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App started at PORT ', PORT)
});