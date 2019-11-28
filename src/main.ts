import "./style.css";
import * as d3 from "d3";

import { drawHisto } from "./histo-d3";

(async () => {
  try {
    console.log("startxxx");
    const data = await d3.dsv(",", "data/group.csv");
    const sortedData = data.sort((a, b) => Math.sign(+b.nbr - +a.nbr));
    sortedData.length = 10;
    drawHisto(document.querySelector(".histo-car"), sortedData);
    console.log("end");
  } catch (e) {
    console.error(e);
  }
})();


