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

function mainProgram(event) {
  console.log(event);
  switch (event.type) {
    case 'join':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hallo Semuanya, Seiga is here',
      });
    case 'message':
      if (event.message.text.toLowerCase().includes('halo' || 'hai' || 'salam')) {
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
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Waduh saya tidak paham',
      });
  }
}

app.listen(port, () => console.log(`Server Started at port ${port}`));
