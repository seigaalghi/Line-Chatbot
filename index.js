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
            altText: 'this is a flex message',
            contents: {
              type: 'carousel',
              contents: [
                {
                  type: 'bubble',
                  hero: {
                    type: 'image',
                    size: 'full',
                    aspectRatio: '20:13',
                    aspectMode: 'cover',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png',
                  },
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Arm Chair, White',
                        wrap: true,
                        weight: 'bold',
                        size: 'xl',
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'text',
                            text: '$49',
                            wrap: true,
                            weight: 'bold',
                            size: 'xl',
                            flex: 0,
                          },
                          {
                            type: 'text',
                            text: '.99',
                            wrap: true,
                            weight: 'bold',
                            size: 'sm',
                            flex: 0,
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
                        style: 'primary',
                        action: {
                          type: 'uri',
                          label: 'Add to Cart',
                          uri: 'https://linecorp.com',
                        },
                      },
                      {
                        type: 'button',
                        action: {
                          type: 'uri',
                          label: 'Add to wishlist',
                          uri: 'https://linecorp.com',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'bubble',
                  hero: {
                    type: 'image',
                    size: 'full',
                    aspectRatio: '20:13',
                    aspectMode: 'cover',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png',
                  },
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Metal Desk Lamp',
                        wrap: true,
                        weight: 'bold',
                        size: 'xl',
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        flex: 1,
                        contents: [
                          {
                            type: 'text',
                            text: '$11',
                            wrap: true,
                            weight: 'bold',
                            size: 'xl',
                            flex: 0,
                          },
                          {
                            type: 'text',
                            text: '.99',
                            wrap: true,
                            weight: 'bold',
                            size: 'sm',
                            flex: 0,
                          },
                        ],
                      },
                      {
                        type: 'text',
                        text: 'Temporarily out of stock',
                        wrap: true,
                        size: 'xxs',
                        margin: 'md',
                        color: '#ff5551',
                        flex: 0,
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
                        flex: 2,
                        style: 'primary',
                        color: '#aaaaaa',
                        action: {
                          type: 'uri',
                          label: 'Add to Cart',
                          uri: 'https://linecorp.com',
                        },
                      },
                      {
                        type: 'button',
                        action: {
                          type: 'uri',
                          label: 'Add to wish list',
                          uri: 'https://linecorp.com',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'bubble',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'button',
                        flex: 1,
                        gravity: 'center',
                        action: {
                          type: 'uri',
                          label: 'See more',
                          uri: 'https://linecorp.com',
                        },
                      },
                    ],
                  },
                },
              ],
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
