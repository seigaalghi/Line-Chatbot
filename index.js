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
              type: 'carousel',
              contents: [
                {
                  type: 'bubble',
                  size: 'micro',
                  hero: {
                    type: 'image',
                    url:
                      'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip10.jpg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '320:213',
                  },
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: 'Brown Cafe',
                        weight: 'bold',
                        size: 'sm',
                        wrap: true,
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                          },
                          {
                            type: 'text',
                            text: '4.0',
                            size: 'xs',
                            color: '#8c8c8c',
                            margin: 'md',
                            flex: 0,
                          },
                        ],
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'box',
                            layout: 'baseline',
                            spacing: 'sm',
                            contents: [
                              {
                                type: 'text',
                                text: '東京旅行',
                                wrap: true,
                                color: '#8c8c8c',
                                size: 'xs',
                                flex: 5,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    spacing: 'sm',
                    paddingAll: '13px',
                  },
                },
                {
                  type: 'bubble',
                  size: 'micro',
                  hero: {
                    type: 'image',
                    url:
                      'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '320:213',
                  },
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: "Brow&Cony's Restaurant",
                        weight: 'bold',
                        size: 'sm',
                        wrap: true,
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                          },
                          {
                            type: 'text',
                            text: '4.0',
                            size: 'sm',
                            color: '#8c8c8c',
                            margin: 'md',
                            flex: 0,
                          },
                        ],
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'box',
                            layout: 'baseline',
                            spacing: 'sm',
                            contents: [
                              {
                                type: 'text',
                                text: '東京旅行',
                                wrap: true,
                                color: '#8c8c8c',
                                size: 'xs',
                                flex: 5,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    spacing: 'sm',
                    paddingAll: '13px',
                  },
                },
                {
                  type: 'bubble',
                  size: 'micro',
                  hero: {
                    type: 'image',
                    url:
                      'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '320:213',
                  },
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: 'Tata',
                        weight: 'bold',
                        size: 'sm',
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                          },
                          {
                            type: 'icon',
                            size: 'xs',
                            url:
                              'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                          },
                          {
                            type: 'text',
                            text: '4.0',
                            size: 'sm',
                            color: '#8c8c8c',
                            margin: 'md',
                            flex: 0,
                          },
                        ],
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'box',
                            layout: 'baseline',
                            spacing: 'sm',
                            contents: [
                              {
                                type: 'text',
                                text: '東京旅行',
                                wrap: true,
                                color: '#8c8c8c',
                                size: 'xs',
                                flex: 5,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    spacing: 'sm',
                    paddingAll: '13px',
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
