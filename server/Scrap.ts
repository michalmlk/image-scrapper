import { getImages } from "./service/scrapper";
const express = require('express');

const router = express.Router();

router.get('/scrap/:url', async (req: any, res: any) => {
    const url = req.params.url;
    const decodedUrl = decodeURIComponent(url);

    try {
        const images = await getImages(decodedUrl);
        res.status = 201;
        res.send(images);

    } catch (e: any) {
        res.status = 401;
        throw new Error('Error when scrapping data')
    }
})

module.exports = router;