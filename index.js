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
  const profile = client.getProfile(event.source.userId);
  console.log(profile);
  switch (event.type) {
    case 'join':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hallo Semuanya, Foody Ways telah tiba di grup. Ketikan "/help" untuk petunjuk',
      });
    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hallo Semuanya, Foody Ways telah tiba di grup. Ketikan "/help" untuk petunjuk',
      });
    case 'message':
      const message = event.message;
      if (message.type === 'text') {
        if (contains(message.text.toLowerCase(), ['/hai', '/halo', '/hi'])) {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Halo Juga, Silahkan pesan makanan!!',
          });
        } else if (message.text === '/help') {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: '/menu /hi /about /link',
          });
        } else {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Maaf command tidak diketahui',
          });
        }
      } else if (message.type === 'sticker') {
        return client.replyMessage(event.replyToken, {
          type: 'sticker',
          stickerId: '52002744',
          packageId: '11537',
        });
      }
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Maaf command tidak diketahui',
      });
  }
}

app.listen(port, () => console.log(`Server Started at port ${port}`));
