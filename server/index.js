const express = require('express');
const path = require('path');
const volleyball = require('volleyball');

const app = express();

app.use(volleyball);

app.use(require('express').json());
app.use(express.urlencoded({extended: true}));

//static path
app.use('/', express.static(path.join(__dirname, '..', 'public')));

//404 handler
app.use((req, res, next) => {
  const error = Error(`Page not found(${req.url})`);
  error.status = 404;
    next(error);
})

//500 handler
app.use((err, req, res, next) => {
  console.log(err, err.stack);
  res.status(err.status || 500).send(`
  <html>
    <body>
      <h1>${err}</h1>
      <p>${err.stack}</p>
    </body>
  </html>`)
})

//Port and listen
const PORT = process.env.PORT || 5055;

app.listen(PORT, ()=> console.log(`
  Listening on port ${PORT}
  http://localhost:${PORT}/
`));
