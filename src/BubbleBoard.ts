import * as d3 from "d3";
import { select } from "d3";

const rand = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export class BubbleBoard {
  public svg: SVGElement;
  public data: any[];

  constructor(svg: SVGElement, data: any[]) {
    this.svg = svg;
    this.data = data;
  }

  public redraw() {
    console.log("redraw");
    const selection = d3
      .select(this.svg)
      .selectAll("circle")
      .data(this.data, (d: any) => d.key);

    selection
      .enter()
      .append("circle")
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("r", d => d.r / 10);

    selection.exit().remove();

    selection
      .transition()
      .duration(800)
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("r", d => d.r / 10);
  }

  public update() {
    console.log("update");
    const step = 20;
    for (let i = 0; i < step; i++) {
      const prop = rand(["c", "r"]);
      const index = Math.floor(Math.random() * this.data.length);
      if (prop === 'r') {
          this.data[index].r = Math.random();
          continue;
      }
      this.data[index].cx = Math.random();
      this.data[index].cy = Math.random();
    }
  }
}
