import "./style.css";
import { BubbleBoard } from "./BubbleBoard";

(async () => {
  try {
    const n = 10;
    const data = new Array(10).fill(0).map(() => ({
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
