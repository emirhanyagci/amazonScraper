const axios = require("axios");
const cheerio = require("cheerio");
const PPTX = require("nodejs-pptx");

let pptx = new PPTX.Composer();

const fetchPrice = async (productUrl) => {
  await pptx.compose((pres) => {
    pres.addSlide((slide) => {
      slide.addText((text) => {
        text.value("Hello World");
      });
    });
  });
  await pptx.save(`./hello-world.pptx`);

  axios.get(productUrl).then(({ data }) => {
    const $ = cheerio.load(data);
    const priceUnFormatted = $(
      "#corePriceDisplay_desktop_feature_div .a-offscreen"
    ).text();
    console.log(priceUnFormatted.slice(0, priceUnFormatted.length - 2));
  });
};

fetchPrice(
  "https://www.amazon.com.tr/HyperX-KHX-HSCP-RD-Cloud-II-Kulakl%C4%B1k/dp/B00SAYCXWG?ref_=Oct_DLandingS_D_8af3e6ec_0"
);
