const express = require('express'),
  app = express();
const history = require('connect-history-api-fallback');
const path = require('path');

const PORT = 9001;
app.use(history({
  history: path.join(__dirname, './dist/index.html')
}));
app.use(express.static(path.join(__dirname, "./dist")));

app.listen(PORT, () => console.log('success'));