const settings = require('./settings');
const TmpCache = require('../utils/tmpCache');

const database = new TmpCache('records');

database.TMP_DIR = settings.dataFilePath;

database.version = '1.0.0';
database.save();
database.load();

module.exports = database;
