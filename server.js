const express = require('express'),
  app = express();
const history = require('connect-history-api-fallback');

const PORT = 9001;
app.use(history({
  history: './dist/index.html'
}));
app.use(express.static("./dist"));

app.listen(PORT, () => console.log('success'));