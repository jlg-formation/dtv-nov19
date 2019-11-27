import { drawHisto } from "./histo-d3.js";

(async () => {
  try {
    console.log("startxxx");
    const data = await d3.dsv(",", "data/group.csv");
    const svg = document.querySelector("svg");
    drawHisto(svg, data);

    console.log("end");
  } catch (e) {
    console.error(e);
  }
})();
