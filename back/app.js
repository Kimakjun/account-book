const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/', (req, res, next)=> {
    res.json({success: true, message: {hello: 'hihi'}});
})

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