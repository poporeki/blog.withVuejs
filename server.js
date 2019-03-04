const express = require('express'),
  app = express();
const history = require('connect-history-api-fallback');

const PORT=9001;
app.use(history());
app.use(express.static("./dist"));
app.get('./', (req, res) =>res.sendFile("./index.html"));
app.listen(PORT, () =>console.log('success'));