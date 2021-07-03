const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json') // Update this to your file

const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}


// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'wheeloffortune-fe46d-default-rtdb.firebaseio.com'
})

const db = admin.firestore()

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  /* parse the string body into a useable JS object */
  const bussinessName = body.bussinessName.replace('-', ' ');
  const gameId = body.gameId;
  const snapshot  = await db.collection('businesses').where('name', '==', bussinessName).get();
  
  if (snapshot.empty) {
    return callback(null, {
      statusCode: statusCode,
      headers: headers,
      body: JSON.stringify({
        prizes: false
      })
    })
  }

  snapshot.docs.forEach(  async (bussiness) => {
    let appObj = bussiness.data();
    let bussinessId = appObj.id;
    const query =  await db.collectionGroup('games').where('gameId', '==', gameId).get();
    query.docs.forEach( games => {
      const data = games.data();
      console.log('data:', data.prizes)
      return callback(null, {
        statusCode: statusCode,
        headers: headers,
        body: JSON.stringify({
          prizes: data.prizes
        })
      })
    })
  })
}


