require('dotenv').config();
const puppeteer = require("puppeteer");

const scrape = async (res) => {

    const browser = await puppeteer.launch({
        executablePath:
            process.env.NODE_ENV === 'production'
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    try {
        const page = await browser.newPage();

        await page.goto('https://developer.chrome.com/');

        await page.setViewport({ width: 1080, height: 1024 });

        await page.type('.devsite-search-field', 'automate beyond recorder');

        const searchResultSelector = '.devsite-result-item-link';
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);

        const textSelector = await page.waitForSelector(
            'text/Customize and automate'
        );
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        res.send(fullTitle);
    } catch (e) {
        console.log(e)
        res.send('not working solo\n' + e);
    } finally {
        await browser.close();
    }
}

module.exports = scrape