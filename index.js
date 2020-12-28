require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(mainProgram))
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.error(`Promise error ${error}`);
    });
});

function contains(target, pattern) {
  var value = 0;
  pattern.forEach(function (word) {
    value = value + target.includes(word);
  });
  return value === 1;
}

function mainProgram(event) {
  console.log(event);
  switch (event.type) {
    case 'join':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hallo Semuanya, Seiga telah tiba di grup',
      });
    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hallo teman, terimakasih sudah follow Seiga',
      });
    case 'message':
      const message = event.message;
      if (message.type === 'text') {
        if (contains(message.text.toLowerCase(), ['hai', 'hallo', 'halo', 'salam'])) {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Halo Juga, Yoroshiku!!',
          });
        } else {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Waduh saya tidak paham',
          });
        }
      } else if (message.type === 'sticker') {
      }
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Waduh saya tidak paham',
      });
  }
}

app.listen(port, () => console.log(`Server Started at port ${port}`));
