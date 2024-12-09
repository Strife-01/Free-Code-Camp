// Choropleth Map - a type of map where the map is shaded or patterned based on specific data
// Type: Topology - topojson - a format that stores information about geography - geographical data for maps

// let reqED = new XMLHttpRequest();
// let reqCD = new XMLHttpRequest();

let countyURL =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
let educationURL =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let reqEDdata;
let reqCDdata;
let counties;

let tooltip = d3.select('#tooltip');

let height = 600;
let width = 1000;

const canvas = d3.select('#canvas');

const drawCanvas = () => {
    canvas.attr('width', width);
    canvas.attr('height', height);
};

drawCanvas();

const drawMap = () => {
    canvas
        .selectAll('path')
        .data(reqCDdata)
        .enter()
        .append('path')
        .attr('d', d3.geoPath()) // d - data used by the SVG to draw the path | geoPath() - converts the geojson data into path that SVG can use
        .attr('class', 'county')
        .attr('fill', (d) => {
            let id = d.id;

            let data = reqEDdata.find((data) => data.fips === d.id);
            let percentage = data.bachelorsOrHigher;

            if (percentage < 3) return 'whitesmoke';
            else if (percentage < 12) return '#e5f5e0';
            else if (percentage < 21) return '#c7e9c0';
            else if (percentage < 30) return '#a1d99b';
            else if (percentage < 39) return '#74c476';
            else if (percentage < 48) return '#41ab5d';
            else if (percentage < 57) return '#238b45';
            else if (percentage < 66) return '#006d2c';
            else return '#1A2421';
        })
        .attr('data-fips', (d) => d.id)
        .attr('data-education', (d) => {
            let id = d.id;

            let data = reqEDdata.find((data) => data.fips === d.id);
            let percentage = data.bachelorsOrHigher;

            return percentage;
        })
        .on('mouseover', (e) => {
            let d = e.target.__data__;
            console.log(d);

            let id = d.id;
            let data = reqEDdata.find((data) => data.fips === d.id);

            tooltip.transition().style('visibility', 'visible');
            tooltip.text(
                data.area_name +
                    ', ' +
                    data.state +
                    ', ' +
                    data.bachelorsOrHigher
            );
            tooltip.attr('data-education', () => data.bachelorsOrHigher);
        })
        .on('mouseout', () =>
            tooltip.transition().style('visibility', 'hidden')
        );
};

d3.json(countyURL)
    .then((data) => {
        reqCDdata = topojson.feature(data, data.objects.counties).features; // this converts topojson data into geojson data so we can use it | all that remains is a set of geojson coordinates that we can use to draw draw the lines for our map
        console.log(reqCDdata);

        d3.json(educationURL)
            .then((data) => {
                reqEDdata = data;
                console.log(reqEDdata);
                drawMap();
            })
            .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

