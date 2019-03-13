const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app  = express();

var user = require('./routes/user.js');
var product = require('./routes/product.js');
const api = require('./server/api');


// Parsers
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type : '*/*' }));

//Enable CORS from client-side
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/register', user.signup);
app.post('/login', user.login);
app.get('/api/user/edition/:id', user.getuserDetails);

app.get('/users', user.getUses);
app.put('/api/userEdition/:id', user.updateUser);


app.put('/api/userPassword/:id', user.updatePassword);
 //app.get('/', function(req, res) {
 //	res.status(201).json({ message: 'Welcome to the authenticated routes!' });
 //});
app.post('/user/product/:id', product.saveproduct);

app.get('/api/users/products/', product.selectUsersProductsCount);
app.delete('/user/product/:id', product.deleproduct);
app.get('/api/user/products/:id', product.selectproducts);



app.put('/user/product/:id', product.updateProduct);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

