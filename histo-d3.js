export function drawHisto(svg, data) {
  const scale = (1000 / Math.max(...data.map(d => d.nbr))) * 0.95;
  console.log("scale: ", scale);

  const height = 60;
  const margin = 20;

  const selection = d3
    .select(svg)
    .selectAll("rect")
    .data(data);

  console.log("selection: ", selection);

  selection.enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => 10 + (height + margin) * i)
    .attr("width", d => scale * d.nbr)
    .attr("height", height);
}
