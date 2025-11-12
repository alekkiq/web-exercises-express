import app from './app.js';

const port = 3000;
const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log(`Server started on port ${host}:${port}`);
});