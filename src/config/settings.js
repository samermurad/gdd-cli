const path = require('path');
console.log('PWD:', process.cwd());
require('dotenv').config({
    path: 
        path.join(process.cwd(), '.env')
        || 
        path.join(process.cwd(), '..', '..', '.env')
})

module.exports = {
    apiToken: (process.env.API_TOKEN || '').trim(),
    dataFilePath: process.env.DATA_FILE_PATH || '/home/pi/.godaddy-dyndns',
    telegramChatId: process.env.TL_CHAT_ID,
    telegramBotToken: process.env.TL_BOT_TOKEN,
}
