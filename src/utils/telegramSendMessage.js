const requrest = require('ax')
const BOT_TOKEN = '<YOUR_TOKEN_HERE>'
const CHAT_ID = 0 // <YOUR_CHAT_ID>

const tmMsg = (text) => {
  const options = {
    method: 'POST',
    url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  };
  request(options, function (error, response) {
    if (!error) //throw new Error(error);
      console.log(response.body);
    else console.log(error);
  });
};