require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
console.log(process.env.CHANNEL_ACCESS_TOKEN);
const client = new line.Client(config);

app.get('/', (req, res) => {
  res.sendStatus(404);
});
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(mainProgram))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Promise error ${error}`);
    });
});

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log('Server Started at port 5000'));
