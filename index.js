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

const mainProgram = async (event) => {
  console.log(event);
  const profile = await client.getProfile(event.source.userId);
  const message = event.message;
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
        text: `Hallo ${profile.displayName}, Foody Ways telah tiba di grup. Ketikan "/help" untuk petunjuk`,
      });
    case 'message':
      if (message.type === 'text') {
        if (contains(message.text.toLowerCase(), ['/hai', '/halo', '/hi'])) {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: `Halo Juga ${profile.displayName}, Silahkan pesan makanan!!`,
          });
        } else if (message.text === '/help') {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Silahkan ketikkan keyword berikut :\n/menu\n/hi\n/about\n/link',
          });
        } else if (message.text === '/menu') {
          return client.replyMessage(event.replyToken, {
            type: 'flex',
            contents: {
              type: 'bubble',
              hero: {
                type: 'image',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
                size: 'full',
                aspectRatio: '20:13',
                aspectMode: 'cover',
                action: {
                  type: 'uri',
                  uri: 'http://linecorp.com/',
                },
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'Brown Cafe',
                    weight: 'bold',
                    size: 'xl',
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'lg',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'Price',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 1,
                          },
                          {
                            type: 'text',
                            text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              footer: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'WEBSITE',
                      uri: 'https://linecorp.com',
                    },
                  },
                ],
                flex: 0,
              },
            },
          });
        } else {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Maaf command tidak diketahui silahkan kirim "/help" untuk petunjuk',
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
        text: 'Maaf command tidak diketahui silahkan kirim "/help" untuk petunjuk',
      });
  }
};

app.listen(port, () => console.log(`Server Started at port ${port}`));
