import dbClient from '../utils/db';

const shai1 = require('sha1');

async function postNew(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: 'Missing email' });
  if (!password) return res.status(400).json({ error: 'Missing password' });

  const usr = await dbClient.users.findOne({ email });
  if (usr) return res.status(400).json({ error: 'Already exist' });

  const newUser = {
    email,
    password: shai1(password),
  };
  dbClient.users.insertOne(newUser);

  const user = await dbClient.users.findOne({ email });
  return res.status(201).json({ id: user._id, email: user.email });
}

module.exports = {
  postNew,
};
