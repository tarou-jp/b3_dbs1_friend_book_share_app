const { MongoClient } = require('mongodb');

const url = 'mongodb://s2210573:Iwm2HC4C@dbs1.slis.tsukuba.ac.jp:27018';
const dbName = 's2210573';

const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // ユーザーデータを挿入
    const user = { name: 'tarou', password: 'password123' }; // パスワードはプレーンテキストのままでOKです。後でハッシュ化を追加できます。
    const result = await usersCollection.insertOne(user);
    console.log('User inserted with _id:', result.insertedId);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log('Disconnected successfully from server');
  }
})();
