import "./style.css";
import * as d3 from "d3";
import { drawHisto } from "./histo-d3";
import { BubbleBoard } from "./BubbleBoard";

(async () => {
  try {
    const n = 10;
    const data = new Array(10).fill(0).map(n => ({
      cx: Math.random(),
      cy: Math.random(),
      r: Math.random(),
      key: Math.random()
    }));
    const bubbleBoard = new BubbleBoard(document.querySelector("svg"), data);
    setInterval(() => {
      bubbleBoard.update();
      bubbleBoard.redraw();
    }, 1000);
  } catch (e) {
    console.error(e);
  }
})();
