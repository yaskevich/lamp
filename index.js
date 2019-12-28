const express = require('express');
const fetch = require('node-fetch');
const proxy = require('http-proxy-middleware');
const app = express();
app.use(express.static('public'));

const prxopts =   { pathRewrite: {'^/api' : ''}, target: 'http://localhost:5000/', 
					changeOrigin: false, "secure": false 
				  };

app.use('/api', proxy(prxopts));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/d3/dist'));
app.use(express.static(__dirname + '/node_modules/popper.js/dist/umd'));

// app.get('/', function (req, res) {
  // res.send('Hello World!');
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.get('/fallback', function (req, res) {
  res.json([ {"label": "привет"}, {"label": "конфета"}, {"label": "кукушка"}, {"label": "чебурек"}, {"label": "треножник"} ]);
});


app.listen(7000, function () {
  console.log('The app on port 7000');
});