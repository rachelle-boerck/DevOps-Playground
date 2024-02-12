const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let fact = 'Get your useless fact of the day!'

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static('src/public'));
app.use(express.static('src/images'));

app.get('/', (req, res) => {
  res.send(`<html>
  <head>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div style="grid-area: centerTop">
      <img src="top_left_decoration.svg">
      <img src="top_right_decoration.svg">
    </div>
    <section>
      <h2>Useless facts</h2>
      <h3>${fact}</h3>
      <form action="/facts" method="GET">
      <button>Generate your random fact!</button>
    </form>
    </section>
    <div style="grid-area: centerBottom">
    <img src="bottom_left_decoration.svg">
    <img src="bottom_right_decoration.svg">
    </div>
  </body> 
</html>`
  )
});

app.get('/facts', (req, res) => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("Request succeeded with JSON response", data);
      fact = data.text;
      res.redirect('/');
    })
    .catch(function (error) {
      console.log("Request failed", error);
  
    });
});



app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on http://localhost:${process.env.SERVER_PORT}`);
});

