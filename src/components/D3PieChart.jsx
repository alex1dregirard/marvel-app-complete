import { useEffect } from "react";
import * as d3 from "d3";
import { prepareData } from './chart-utils';

// Define the diameter of the pie
const diameter = 100;

// Define the margin
const margin = {
    top: 10, right: 10, bottom: 10, left: 10,
};

// Define the width and height using the margin conventions
const width = 2 * diameter + margin.left + margin.right;
const height = 2 * diameter + margin.top + margin.bottom;

// Define the radius
const radius = Math.min(width, height) / 2;

/**
 * Draw the pie chart
 * @param {*} data 
 * @param {*} displayTooltip 
 * @param {*} displayValue 
 */
const drawChart = (data) => {
    // Remove the old svg if it exists (in development)
    d3.select('#pie-container')
        .select('svg')
        .remove();

    // Create the color scale
    const color = d3.scaleOrdinal()
        // colors based on data
        .domain(data.map(d => d.name))
        // .range(["red", "blue", "green", "yellow", "orange", "purple"]);
        // .range(d3.schemeDark2);
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Create the arc
    const arc = d3.arc()
        .cornerRadius(5) // Rounded corners
        .innerRadius(radius * 0.5) // This is the size of the donut hole
        .outerRadius(radius) // This is the size of the donut
        .padAngle(0.011) // padding between slices

    // Create the pie
    const pie = d3.pie(data)
        .sort(null) // disable sorting of data
        .value(d => d.value);

    // Create the svg, with the right dimensions
    const svg = d3
        .select('#pie-container')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]) // center the pie chart

    // draw the donut
    svg.append("g")
        .selectAll()
        .data(pie(data))
        .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)

    // add labels over the donut
    svg.append("g")
        // text style
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll()
        .data(pie(data))
        .join("text")
        // center the text
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        // add the name of the data
        .call(text => text.append("tspan")
            .attr("id", d => `pie-labels-name-${d.data.name}`)
            .attr("x", 0) // center the text
            .attr("y", "-0.4em") // add a space between the name and the value
            .attr("font-weight", "bold")
            .text(d => d.data.name))
        // add the value of the data
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("id", d => `pie-labels-value-${d.data.name}`)
            .attr("x", 0) // center the text
            .attr("y", "0.7em") // add a space between the name and the value
            .attr("fill-opacity", 0.7) // make it lighter
            .text(d => d.data.value)); // add the value
};

/**
 * Draw a pie chart with the statistics of a character
 * 
 * @param {*} data
 * @param {*} displayTooltip
 * @param {*} displayValue
 */
export default function D3PieChart({
    data,
}) {
    // useEffect is a hook that will run the code inside it only once when data is loaded
    useEffect(() => {
        // transform data
        const preparedData = prepareData(data);

        // draw the chart
        drawChart(preparedData);
    }, [data]);

    return (
        // Return the div that will contain the chart
        <div id="pie-container" />
    );
}