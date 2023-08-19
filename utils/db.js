const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
let AUTH = '';
if (process.env.DB_USER && process.env.DB_PASSWORD) {
  AUTH = `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`;
}
const url = `mongodb://${AUTH}${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) console.error(err);

      this.db = client.db(DB_DATABASE);
      if (!this.collectionExists('users')) {
        this.db.createCollection('users', (err) => {
          if (err) console.error(err);
        });
      }
      this.users = this.db.collection('users');

      if (!this.collectionExists('files')) {
        this.db.createCollection('files', (err) => {
          if (err) console.error(err);
        });
      }
      this.files = this.db.collection('files');
    });
  }

  async collectionExists(collectionName) {
    const collections = await this.db.listCollections({ name: collectionName }).toArray();
    return collections.length > 0;
  }

  async isAlive() {
    return this.db === null;
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
