const puppeteer = require('puppeteer');
const data = {
    list : []
};

async function main(skill) {
    //open chromium 
    const browser = await puppeteer.launch({ headless: false });
    //open new tab
    const page = await browser.newPage();

    await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=Bengaluru%252C+Karnataka`, {
        timeout: 0,
        waitUntil: 'networkidle0'
    });
    
    browser.close();
};

module.exports = main;