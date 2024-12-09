let url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let data = [];

let height = 600;
let width = 800;
let padding = 40;

let xScale;
let yScale;

let xAxis;
let yAxis;

let timeRange = [];
let yearArray = [];

let svg = d3.select('svg');
let tooltip = d3.select('#tooltip');

let drawCanvas = () => {
    svg.attr('width', width).attr('height', height);
};

let generateScales = () => {
    xScale = d3
        .scaleLinear()
        .domain([
            d3.min(data, (d) => d.Year) - 1,
            d3.max(data, (d) => d.Year) + 1,
        ])
        .range([padding, width - padding]);
    yScale = d3
        .scaleTime()
        .domain([
            d3.min(data, (d) => new Date(d.Seconds * 1000)),
            d3.max(data, (d) => new Date(d.Seconds * 1000)),
        ])
        .range([padding, height - padding]);
};

let drawPoints = () => {
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 5)
        .attr('data-xvalue', (d) => d.Year)
        .attr('data-yvalue', (d) => {
            return new Date(d.Seconds * 1000);
        })
        .attr('cx', (d) => {
            return xScale(d.Year);
        })
        .attr('cy', (d) => {
            return yScale(new Date(d.Seconds * 1000));
        })
        .attr('fill', (d) => {
            if (d.Doping !== '') {
                return 'blue';
            }
            return 'orange';
        })
        .on('mouseover', (e) => {
            tooltip.transition().style('visibility', 'visible');

            let d = e.target.__data__;

            if (d.Doping != '') {
                tooltip.text(
                    d.Year + ' - ' + d.Name + ' - ' + d.Time + ' - ' + d.Doping
                );
            } else {
                tooltip.text(
                    d.Year +
                        ' - ' +
                        d.Name +
                        ' - ' +
                        d.Time +
                        ' - No Allegations'
                );
            }

            tooltip.attr('data-year', d.Year);
        })
        .on('mouseout', (d) => {
            tooltip.transition().style('visibility', 'hidden');
        });
};

let generateAxes = () => {
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d')); // ti will round whatever we have there as decimal
    let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`);

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-scale')
        .attr('transform', 'translate(40, 0)');
};

req.open('GET', url, true);
req.onload = () => {
    data = JSON.parse(req.responseText);
    console.log(data);
    drawCanvas();
    generateScales();
    generateAxes();
    drawPoints();
};
req.send();

