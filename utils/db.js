const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (client, error) => {
      if (error) {
        console.error(`Error connecting to database: ${error}`);
      }
      if (!error) {
        this.db = client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
        this.a = true;
      }
    });
  }

  async isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const users = this.users.countDocuments();
    return users;
  }

  async nbFiles() {
    const files = this.files.countDocuments();
    return files;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
