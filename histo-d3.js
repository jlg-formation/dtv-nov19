export function drawHisto(svg, data) {
  const scale = 1000 / Math.max(...data.map(d => d.nbr));
  console.log("scale: ", scale);

  const height = 60;
  const margin = 20;

  d3.select(svg)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => 10 + (height + margin) * i)
    .attr("width", d => Math.floor(scale * d.nbr))
    .attr("height", height);

}
