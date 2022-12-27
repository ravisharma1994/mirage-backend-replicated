var axios = require('axios');


const getHeaderForPost = () => {


    var data = JSON.stringify({
        "inputs": {
            "width": 768,
            "height": 768,
            "prompt": "A dream of a distant galaxy, concept art, matte painting , hd, dramatic lighting, detailed",
            "scheduler": "K_EULER",
            "num_outputs": "1",
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
        }
    });

    var config = {
        method: 'post',
        url: 'https://replicate.com/api/models/stability-ai/stable-diffusion/versions/f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1/predictions',
        headers: {
            'authority': 'replicate.com',
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'cookie': 'replicate_anonymous_id=a221e5ee-e572-44da-9122-20a2b400e4b2; csrftoken=IuI7kpKoaM1n2T1KgFFdjLQaJJv3Cd0k; rl_user_id=RudderEncrypt%3AU2FsdGVkX19PXdwE0wdQyq6Dg9f5zatwy5fLyXXgAp0%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2Bz8ZidneEXb2yetC9zhxow3pWAitc%2BJN0%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX19H6BYUTYM%2BG2fu%2Bka6roQdzAJF3TOPDds%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX1%2FTrRK4teSexAGGCztWSoHP7pDDE2OvMHE%3D; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX19fEKXgZlrtuZpsHZvy8CoyC3UNiI7AzgD4QxZou529Ra5DRtnvggd3NgkkhvTOBzPOC2DlJdWrUqyhkFK2oWj6juNLhEIyM0c%3D; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX19kSbO6bWC8bsQZ%2B09mCx0Tc2V7YazT3EY%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX19PVVqGzjUI7tdqIvfjsi8ZhII2R54leWDd3nat9U5wpaKO1V%2FAIQIsyXmiE8eDbOxj7uogll6JkQ%3D%3D; rl_session=RudderEncrypt%3AU2FsdGVkX1%2Bu80qeVKOxIGF2kmbkftH%2BHLArKn0SvYwbsyXdAyONjG9DzSCV8Pt6m%2BmiI2%2B8A0NuqQ12U4vxWeva9Y3EhcNcK4fXM74duCUN8x1b77QCUz38sgX45IFWG2agghs%2BYK9q8RnPm9x1LQ%3D%3D',
            'origin': 'https://replicate.com',
            'referer': 'https://replicate.com/stability-ai/stable-diffusion',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'x-csrftoken': 'IuI7kpKoaM1n2T1KgFFdjLQaJJv3Cd0k'
        },
        data: data
    };

    return config;
};


const getHeanderForGet = (apiUrl) => {
    var config = {
        method: 'get',
        url: apiUrl,
    };

    return config;
}

module.exports = { getHeaderForPost, getHeanderForGet };

