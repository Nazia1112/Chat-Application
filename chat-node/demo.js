var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');

var swaggerJSDoc = require('swagger-jsdoc');


var indexRouter = require('./routes/index');
var productRouter = require('./routes/productRouter');



//Db Connection 
const url = config.mongoURL
const connect = mongoose.connect(url, {
   useNewUrlParser: true
  });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



//express application
var app = express();


// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//BodyParser MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.jsvar createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');

var swaggerJSDoc = require('swagger-jsdoc');


var indexRouter = require('./routes/index');
var productRouter = require('./routes/productRouter');



//Db Connection 
const url = config.mongoURL
const connect = mongoose.connect(url, {
   useNewUrlParser: true
  });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



//express application
var app = express();


// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//BodyParser MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/products', productRouter);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpevar createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const config = require('./config');
  const cors = require('cors');
  
  var swaggerJSDoc = require('swagger-jsdoc');
  
  
  var indexRouter = require('./routes/index');
  var productRouter = require('./routes/productRouter');
  
  
  
  //Db Connection 
  const url = config.mongoURL
  const connect = mongoose.connect(url, {
     useNewUrlParser: true
    });
  
  connect.then((db) => {
      console.log("Connected correctly to server");
  }, (err) => { console.log(err); });
  
  
  
  //express application
  var app = express();
  
  
  // swagger definition
  var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);
  
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  //BodyParser MiddleWare
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(cors());
  app.use('/', indexRouter);
  app.use('/products', productRouter);
  
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  // catch 404 and forward to error handler
  app.use(function(req,var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const config = require('./config');
  const cors = require('cors');
  
  var swaggerJSDoc = require('swagger-jsdoc');
  
  
  var indexRouter = require('./routes/index');
  var productRouter = require('./routes/productRouter');
  
  
  
  //Db Connection 
  const url = config.mongoURL
  const connect = mongoose.connect(url, {
     useNewUrlParser: true
    });
  
  connect.then((db) => {
      console.log("Connected correctly to server");
  }, (err) => { console.log(err); });
  
  
  
  //express application
  var app = express();
  
  
  // swagger definition
  var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);
  
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const config = require('./config');
  const cors = require('cors');
  
  var swaggerJSDoc = require('swagger-jsdoc');
  
  
  var indexRouter = require('./routes/index');
  var productRouter = require('./routes/productRouter');
  
  
  
  //Db Connection 
  const url = config.mongoURL
  const connect = mongoose.connect(url, {
     useNewUrlParser: true
    });
  
  connect.then((db) => {
      console.log("Connected correctly to server");
  }, (err) => { console.log(err); });
  
  
  
  //express application
  var app = express();
  
  
  // swagger definition
  var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);
  
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  //BodyParser MiddleWare
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(cors());
  app.use('/', indexRouter);
  app.use('/products', productRouter);
  
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const config = require('./config');
  const cors = require('cors');
  
  var swaggerJSDoc = require('swagger-jsdoc');
  
  
  var indexRouter = require('./routes/index');
  var productRouter = require('./routes/productRouter');
  
  
  
  //Db Connection 
  const url = config.mongoURL
  const connect = mongoose.connect(url, {
     useNewUrlParser: true
    });
  
  connect.then((db) => {
      console.log("Connected correctly to server");
  }, (err) => { console.log(err); });
  
  
  
  //express application
  var app = express();
  
  
  // swagger definition
  var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);
  
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  //BodyParser MiddleWare
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(cors());
  app.use('/', indexRouter);
  app.use('/products', productRouter);
  
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });
  
  module.exports = app;
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });
  
  module.exports = app;
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  //BodyParser MiddleWare
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(cors());
  app.use('/', indexRouter);
  app.use('/products', productRouter);
  
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });
  
  module.exports = app;
   res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });
  
  module.exports = app;
  c);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
on());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// app.use('/', indexRouter);
app.use('/', productRouter);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
