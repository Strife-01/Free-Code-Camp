let movieUrl =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';
let gamesUrl =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';
let kickstarterUrl =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json';

let width = 1000;
let height = 600;

let movieData;
let gamesData;
let kickstarterData;

let movieCanvas = d3.select('#movie-canvas');
let gamesCanvas = d3.select('#games-canvas');
let kickstarterCanvas = d3.select('#kickstarter-canvas');

let movieTooltip = d3.select('#movieTooltip');
let gamesTooltip = d3.select('#gamesTooltip');
let kickstarterTooltip = d3.select('#kickstarterTooltip');

let drawTreeMap = (canvas, data, tooltip) => {
    let hierarchy = d3
        .hierarchy(data, (node) => {
            return node.children;
        })
        .sum((node) => {
            return node.value;
        })
        .sort((node1, node2) => node2.value - node1.value);

    let createTreeMap = d3.treemap().size([width, height]);

    createTreeMap(hierarchy); // this will attach inside each leave of the the tree like object structure 4 key/value pairs which represent the x0 x1 y0 y1 coordinates which represent the placements from the origin for drawing the rectangles

    let dataLeaves = hierarchy.leaves();

    // we have a tree like syntax with different levels of depth based on descendancy
    // console.log(hierarchy); - this shows the hierarchy in the tree like syntax with the depth and height
    // console.log(hierarchy.leaves()); - the leaves() returns all the individual nodes in the tree, the ones that have no descendent

    let block = canvas
        .selectAll('g')
        .data(dataLeaves)
        .enter()
        .append('g')
        .attr('transform', (data) => `translate(${data.x0}, ${data.y0})`);

    block
        .append('rect')
        .attr('class', 'tile')
        .attr('fill', (color) => {
            let category = color.data.category;
            console.log(category);

            if (
                category === 'Action' ||
                category === 'Wii' ||
                category === 'Product Design'
            )
                return 'rgb(76, 146, 195)';
            else if (
                category === 'Adventure' ||
                category === 'DS' ||
                category === 'Tabletop Games'
            )
                return 'rgb(190, 210, 237)';
            else if (
                category === 'Comedy' ||
                category === 'X360' ||
                category === 'Video Games'
            )
                return 'rgb(255, 153, 62)';
            else if (
                category === 'Drama' ||
                category === 'GB' ||
                category === 'Technology'
            )
                return 'rgb(255, 201, 147)';
            else if (
                category === 'Animation' ||
                category === 'PS3' ||
                category === 'Hardware'
            )
                return 'rgb(86, 179, 86)';
            else if (
                category === 'Family' ||
                category === 'NES' ||
                category === 'Sound'
            )
                return 'rgb(173, 229, 161)';
            else if (
                category === 'Biography' ||
                category === 'PS2' ||
                category === 'Gaming Hardware'
            )
                return 'rgb(222, 82, 83)';
            else if (category === '3DS' || category === 'Narrative Film')
                return 'rgb(255, 173, 171)';
            else if (category === 'PS4' || category === '3D Printing')
                return 'rgb(169, 133, 202)';
            else if (category === 'SNES' || category === 'Television')
                return 'rgb(163, 120, 111)';
            else if (category === 'PS' || category === 'Web')
                return 'rgb(208, 176, 169)';
            else if (category === 'N64' || category === 'Wearables')
                return 'rgb(233, 146, 206)';
            else if (category === 'GBA' || category === 'Food')
                return 'rgb(249, 197, 219)';
            else if (category === 'XB' || category === 'Games')
                return 'rgb(153, 153, 153)';
            else if (category === 'PC' || category === 'Sculpture')
                return 'rgb(210, 210, 210)';
            else if (category === '2600' || category === 'Apparel')
                return 'rgb(201, 202, 78)';
            else if (category === 'PSP' || category === 'Art')
                return 'rgb(226, 226, 164)';
            else if (category === 'XOne' || category === 'Gadgets')
                return 'rgb(32,178,170)';
            else if (category === 'Drinks') return 'rgb(85,107,47)';
        })
        .attr('data-name', (data) => data.data.name)
        .attr('data-category', (data) => data.data.category)
        .attr('data-value', (data) => data.data.value)
        .attr('width', (data) => data.x1 - data.x0)
        .attr('height', (data) => data.y1 - data.y0)
        .attr('stroke', 'whitesmoke')
        .on('mouseover', (e) => {
            let data = e.target.__data__;
            tooltip.transition().style('visibility', 'visible');
            tooltip.text(
                () =>
                    `Name: ${data.data.name} | Category: ${data.data.category} | Value: ${data.data.value}`
            );
            tooltip.attr('data-value', () => data.data.value);
        })
        .on('mouseout', () =>
            tooltip.transition().style('visibility', 'hidden')
        );

    block
        .append('text')
        .text((data) => data.data.name)
        .attr('font-size', '10px')
        .attr('x', (data) => 0)
        .attr('y', (data) => 0)
        .attr('overflow', 'hidden');
};

d3.json(movieUrl)
    .then((data) => {
        movieData = data;
        drawTreeMap(movieCanvas, movieData, movieTooltip);
    })
    .catch((err) => console.log(err));

d3.json(gamesUrl)
    .then((data) => {
        gamesData = data;
        drawTreeMap(gamesCanvas, gamesData, gamesTooltip);
    })
    .catch((err) => console.log(err));

d3.json(kickstarterUrl)
    .then((data) => {
        kickstarterData = data;
        drawTreeMap(kickstarterCanvas, kickstarterData, kickstarterTooltip);
    })
    .catch((err) => console.log(err));

