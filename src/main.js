import './style.css';
import * as d3 from 'd3';


import { drawHisto } from "./histo-d3.js";

(async () => {
  try {
    console.log("startxxx");
    let data = await d3.dsv(",", "data/group.csv");
    // data = data.sort((a, b) => Math.sign(b.nbr - a.nbr))
    const svg = document.querySelector("svg");
    drawHisto(svg, data);

    console.log("end");
  } catch (e) {
    console.error(e);
  }
})();
