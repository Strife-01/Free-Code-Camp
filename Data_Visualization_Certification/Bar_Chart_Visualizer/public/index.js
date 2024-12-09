let url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let req = new XMLHttpRequest();

let data; // the response from the server request
let values = []; // the values in the array

let heightScale, xScale, yScale, xAxisScale, yAxisScale; // scales

let width = 800, height = 600, padding = 40; // dimensions
let svg = d3.select('svg'); // select the first svg element

// Draw canvas function
let drawCanvas = () => {
    svg.attr('width', width);
    svg.attr('height', height);
};

// Generate scales function
let generateScales = () => {
    heightScale = d3.scaleLinear()
        .domain([0, d3.max(values, (d) => d[1])])
        .range([0, height - 2 * padding]);

    xScale = d3.scaleLinear()
        .domain([0, values.length - 1])
        .range([padding, width - padding]);

    let datesArray = values.map((item) => new Date(item[0]));

    xAxisScale = d3.scaleTime()
        .domain([d3.min(datesArray), d3.max(datesArray)])
        .range([padding, width - padding]);

    yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(values, (d) => d[1])])
        .range([height - padding, padding]);
};

// Draw bars function
let drawBars = () => {
    // Create and style the tooltip
    let tooltip = d3.select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'rgba(0, 0, 0, 0.7)')
        .style('color', 'white')
        .style('padding', '10px')
        .style('border-radius', '5px')
        .style('font-size', '14px')
        .style('pointer-events', 'none');

    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('width', (d, i) => (width - 2 * padding) / values.length)
        .attr('class', 'bar')
        .attr('data-date', (item) => item[0])
        .attr('data-gdp', (item) => item[1])
        .attr('height', (item) => heightScale(item[1]))
        .attr('x', (item, index) => xScale(index))
        .attr('y', (item, index) => height - padding - heightScale(item[1]))
        .attr('fill', 'rgb(51, 173, 255)')
        .on('mouseover', (event, item) => {
            const date = item[0];  // Access the date from the item data
            const gdp = item[1];   // Access the GDP from the item data

            tooltip.transition().style('visibility', 'visible');
            tooltip.text(`Date: ${date} - GDP: ${gdp} in billions`)
                .attr('data-date', date)
                .attr('data-gdp', gdp);

            // Get the header height (assuming a header exists)
            const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;

            // Set tooltip position relative to the page and below the header
            tooltip.style('top', `${event.pageY + 10 + headerHeight}px`)  // Position the tooltip below the header
                .style('left', `${event.pageX + 10}px`); // Position the tooltip to the right of the mouse
        })
        .on('mouseout', () => {
            tooltip.transition().style('visibility', 'hidden');
        });
};

// Generate axes function
let generateAxes = () => {
    let xAxis = d3.axisBottom(xAxisScale);
    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`);

    let yAxis = d3.axisLeft(yAxisScale);
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`);
};

// Fetch the data and draw the chart
req.open('GET', url, true);
req.onload = () => {
    data = JSON.parse(req.responseText);
    values = data.data;
    drawCanvas();
    generateScales();
    drawBars();
    generateAxes();
    console.log(values);
};
req.send();

