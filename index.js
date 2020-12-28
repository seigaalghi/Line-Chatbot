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
const data = require('./data.json');

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

const food = data.foods.map((food) => ({
  type: 'bubble',
  hero: {
    type: 'image',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    url: food.img,
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'text',
        text: food.name,
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
            text: `Rp.${food.price}`,
            wrap: true,
            weight: 'bold',
            size: 'xl',
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
          label: 'Open App',
          uri: 'https://liff.line.me/1655315643-O6DqdDE8',
        },
      },
    ],
  },
}));
const drink = data.drinks.map((drink) => ({
  type: 'bubble',
  hero: {
    type: 'image',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    url: drink.img,
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'text',
        text: drink.name,
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
            text: `Rp.${drink.price}`,
            wrap: true,
            weight: 'bold',
            size: 'xl',
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
          label: 'Open App',
          uri: 'https://liff.line.me/1655315643-O6DqdDE8',
        },
      },
    ],
  },
}));

const seeMore = {
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
          uri: 'https://liff.line.me/1655315643-O6DqdDE8',
        },
      },
    ],
  },
};

const mainProgram = async (event) => {
  console.log(event);
  const profile = event.type === 'join' ? null : await client.getProfile(event.source.userId);
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
        text: `Hallo ${profile.displayName}, Terimakasih telah follow Foody Ways. Ketikan "/help" untuk petunjuk`,
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
            text: `Hi ${profile.displayName},Silahkan ketikkan keyword berikut :\n/hi : Salam\n/food : Daftar Makanan\n/drink : Daftar Minuman\n/about : Deskripsi App\n/link : App Link\n/help : Daftar Command`,
          });
        } else if (message.text === '/food') {
          return client.replyMessage(event.replyToken, {
            type: 'flex',
            altText: 'this is a flex message',
            contents: {
              type: 'carousel',
              contents: [...food, seeMore],
            },
          });
        } else if (message.text === '/drink') {
          return client.replyMessage(event.replyToken, {
            type: 'flex',
            altText: 'this is a flex message',
            contents: {
              type: 'carousel',
              contents: [...drink, seeMore],
            },
          });
        } else if (message.text === '/link') {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: `Hi ${profile.displayName}, silahkan akses App nya di\nhttps://liff.line.me/1655315643-O6DqdDE8`,
          });
        } else if (message.text === '/about') {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text:
              'Foody Ways, adalah platform food delivery berbasis LIFF, bisa diakses melalui https://liff.line.me/1655315643-O6DqdDE8',
          });
        } else if (message.text.includes('/')) {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: `Hi ${profile.displayName}, Keyword yang kamu masukkan salah, silahkan ikuti petunjuk berikut :\n/hi : Salam\n/food : Daftar Makanan\n/drink : Daftar Minuman\n/about : Deskripsi App\n/link : App Link\n/help : Daftar Command`,
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
      return `Hi ${profile.displayName}, Keyword yang kamu masukkan salah, silahkan ikuti petunjuk berikut :\n/hi : Salam\n/food : Daftar Makanan\n/drink : Daftar Minuman\n/about : Deskripsi App\n/link : App Link\n/help : Daftar Command`;
  }
};

app.listen(port, () => console.log(`Server Started at port ${port}`));
