const { chromium } = require('playwright')

export const getImages = async (url: string): Promise<Array<string>> => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.$$eval('img', (imgs: any) => {
        const arr: any[] = [];
        imgs.map((img: any) => arr.push(img.src))
        return arr
    })
    await browser.close();
    return data;
}