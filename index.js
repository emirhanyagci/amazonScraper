const fileName = require("./fileName");
const axios = require("axios");
const cheerio = require("cheerio");
const PPTX = require("nodejs-pptx");
var prompt = require("prompt");

let pptx = new PPTX.Composer();
// add new slide
// pres.addSlide();

const addToPowerPoint = async () => {
  prompt.start();
  prompt.get(["url"], async function (err, result) {
    // Printing the result
    const { image, modalName, price, soldBy, review } = await fetchDatas(
      result.url
    );
    await pptx.load(`./${fileName}.pptx`);
    await pptx.compose(async (pres) => {
      let slide = await pres.addSlide();
      await slide.addImage({
        src: image,
        x: 50,
        y: 100,
        cy: 250,
      });
      slide.addText({
        value: "Ürün ismi:" + modalName,
        x: 360,
        y: 100,
        cx: 350,
      });
      slide.addText({ value: "fiyat : " + price, x: 360, y: 190, cx: 350 });
      slide.addText({ value: "Satici : " + soldBy, x: 360, y: 240, cx: 350 });
      slide.addText({
        value: "Degerlendirme : " + review,
        x: 360,
        y: 290,
        cx: 350,
      });
    });
    await pptx.save(`./${fileName}.pptx`);
    console.log("successfully added");
  });
};
const fetchDatas = async (productUrl) => {
  let [image, modalName, price, soldBy, review] = ["", "", 0, "", ""];
  return axios
    .get(productUrl, {
      Host: "www.amazon.com",
      Pragma: "no-cache",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      TE: "Trailers",
      "Upgrade-Insecure-Request": 1,
    })
    .then(({ data }) => {
      const $ = cheerio.load(data);
      const priceUnFormatted = $(
        "#corePriceDisplay_desktop_feature_div > div:nth-of-type(1) > .a-price .a-offscreen"
      ).text();
      const reviewUnFormatted = $("#acrCustomerReviewText").text();
      soldBy = $(
        ".tabular-buybox-text[tabular-attribute-name='Satıcı'] span"
      ).text();
      review = reviewUnFormatted.split(" ")[0];
      modalName = $('h1[id="title"]').text();
      image = $(".image.item.itemNo0.maintain-height.selected img").attr("src");
      price = priceUnFormatted;
      return { image, modalName, price, soldBy, review };
      //   price = priceUnFormatted.slice(0, priceUnFormatted.length - 2);
    });
};
addToPowerPoint();
// set file name as dynamic
