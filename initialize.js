const PPTX = require("nodejs-pptx");
let pptx = new PPTX.Composer();

const fileName = "products";

async function initPowerPoint() {
  pptx.save(`./${fileName}.pptx`);
}

initPowerPoint();
