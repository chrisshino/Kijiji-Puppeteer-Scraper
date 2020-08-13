const puppeteer = require("puppeteer");

function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        devtools: true,
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(
        "https://www.kijiji.ca/b-cars-vehicles/city-of-toronto/honda-civic/k0c27l1700273",
        { waitUntil: "networkidle2" }
      );
      let urls = await page.evaluate(() => {
        let results = [];
        // to get the titles
        let titles = document.querySelectorAll(
          "div.regular-ad > div.clearfix > div.info > div.info-container"
        );
        titles.forEach((title) => {
          results.push({
            title: title.querySelector("div.title").innerText,
            price: title.querySelector("div.price").innerText,
          });
        });

        return results;
      });
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
}
run().then(console.log).catch(console.error);
