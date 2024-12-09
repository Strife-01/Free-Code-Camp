// const { error } = require('console');
// const { resolve } = require('path');

const colorArray = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];

const setColor = () => {
  const index = Math.floor(Math.random() * 12);
  const color = colorArray[index];
  $("body").css("background-color", `${color}`);
  $("#quote-box").css("color", `${color}`);
  $(".button").css("background-color", `${color}`);
};
setColor();

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const getData = async () => {
  // if we want to make the function dynamic, we will pass the URL inside the async( -here )
  try {
    const serverResp = await fetch(url);
    const data = await serverResp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

getData().then((data) => {
  const randomQuoteIndex = Math.floor(Math.random() * 102);
  const quotes = [...data.quotes];
  const { quote, author } = quotes[randomQuoteIndex];
  $(".span-text").html(`${quote}`);
  $(".span-author").html(`${author}`);
  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      '"' +
      quote +
      '" - ' +
      author
  );
  $("#tumblr-quote").attr(
    "href",
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,&caption=" +
      author +
      "&content=" +
      quote +
      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
  );
  $("#new-quote").on("click", function () {
    setColor();
    const randomQuoteIndex = Math.floor(Math.random() * 102);
    const { quote, author } = quotes[randomQuoteIndex];
    $(".span-text").html(`${quote}`);
    $(".span-author").html(`${author}`);
    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
        '"' +
        quote +
        '" - ' +
        author
    );
  });
});

