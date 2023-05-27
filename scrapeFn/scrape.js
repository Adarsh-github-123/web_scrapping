const puppeteer = require('puppeteer');
const fs = require('fs');
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

    const jobData = await page.evaluate(async (data) => {
        const items = document.querySelectorAll('td.resultContent');
        items.forEach((item, index) => {
            const title = item.querySelector('h2.jobTitle>a')?.innerText
            const link = item.querySelector('h2.jobTitle>a')?.href
            const salary = item.querySelector('div.metadata.salary-snippet-container > div')
            const companyName = item.querySelector('span.companyName')

            if(salary === null){
                salary = "not defined"
            }

            data.list.push({
                title,
                link,
                salary,
                companyName
            })
        });
        return data;
    }, data);
    
    let respose = await jobData;
    let json = await JSON.stringify(jobData, null, 2);
    fs.writeFile('job.json', json, 'utf-8', () => {
        console.log('written in job.json');
    })
    browser.close();
    return respose;
};

module.exports = main;