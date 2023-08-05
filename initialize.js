const fileName = require("./fileName");
const PPTX = require("nodejs-pptx");
let pptx = new PPTX.Composer();

async function initPowerPoint() {
  pptx.save(`./${fileName}.pptx`);
}

initPowerPoint();
