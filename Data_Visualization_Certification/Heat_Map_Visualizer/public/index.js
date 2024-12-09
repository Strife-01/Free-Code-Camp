let height = 600;
let width = 1200;
let padding = 60;

let url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
let req = new XMLHttpRequest();

let baseTemp;
let data = [];

let canvas = d3.select('#canvas');
canvas.attr('height', height);
canvas.attr('width', width);

let description = d3.select('#description');
let tooltip = d3.select('#tooltip');

let xScale;
let yScale;
let barHeight;

const monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

let generateScales = () => {
    xScale = d3
        .scaleLinear()
        .domain([d3.min(data, (d) => d.year), d3.max(data, (d) => d.year) + 1])
        .range([padding, width - padding]);

    yScale = d3
        .scaleTime()
        .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
        .range([padding, height - padding]);
};

let drawAxes = () => {
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%B'));

    canvas
        .append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`);

    canvas
        .append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`);
};

let drawCells = () => {
    canvas
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('fill', (d) => {
            let temp = baseTemp + d.variance;

            console.log(temp);

            if (temp < 2.8) return 'blue';
            else if (temp < 3.9) return '#6495ED';
            else if (temp < 5.0) return '#00BFFF';
            else if (temp < 6.1) return '#00CED1';
            else if (temp < 7.2) return '#E0FFFF';
            else if (temp < 8.3) return '#FFFACD';
            else if (temp < 9.5) return '#F0E68C';
            else if (temp < 10.6) return '#DAA520';
            else if (temp < 11.7) return '#F08080';
            else if (temp < 12.8) return '#CD5C5C';
            else return 'red';
        })
        .attr('data-year', (d) => {
            return d.year;
        })
        .attr('data-month', (d) => {
            return monthArray[d.month - 1];
        })
        .attr('data-temp', (d) => {
            return baseTemp + d.variance;
        })
        .attr('height', (height - 2 * padding) / 12)
        .attr(
            'width',
            (width - 2 * padding) /
                (d3.max(data, (d) => {
                    return d.year;
                }) -
                    d3.min(data, (d) => {
                        return d.year;
                    }))
        )
        .attr('y', (d) => {
            return yScale(new Date(0, d.month - 1, 0, 0, 0, 0, 0));
        })
        .attr('x', (d) => {
            return xScale(d.year);
        })
        .on('mouseover', (e) => {
            tooltip.transition().style('visibility', 'visible');
            let d = e.target.__data__;

            tooltip.text(
                d.year +
                    ' - ' +
                    monthArray[d.month - 1] +
                    ' - temp: ' +
                    (baseTemp + d.variance) +
                    '℃'
            );

            tooltip.attr('data-year', () => {
                return d.year;
            });
        })
        .on('mouseout', (d) => {
            tooltip.transition().style('visibility', 'hidden');
        });
};

req.open('GET', url, true);
req.onload = () => {
    let response = JSON.parse(req.responseText);
    baseTemp = response.baseTemperature;
    data = response.monthlyVariance;
    description.text(
        `${d3.min(data, (d) => d.year)} - 
        ${d3.max(data, (d) => d.year)}: 
        base temperature ${baseTemp}℃`
    );

    generateScales();
    drawAxes();
    drawCells();

    console.log(data);
};
req.send();

