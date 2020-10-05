const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport');
const {sequelize} = require('./models');
require('dotenv').config();

const app = express();
sequelize.sync();
const rootRouter = require('./route');


app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
passportConfig(passport);


app.use('/api/v1/', rootRouter);

app.use((req, res, next) => {
    next(createError(404, 'page not found!'));
});

app.use((err, req, res) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).send({ message });
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기중`);
});