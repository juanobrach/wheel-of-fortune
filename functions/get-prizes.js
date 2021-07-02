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
  const bussinessId = body.bussinessId;
  const snapshot  = await db.collection('businessesGames').where('bussinessId', '==', bussinessId).get();
  
  
  if (snapshot.empty) {
    return callback(null, {
      statusCode: statusCode,
      headers: headers,
      body: JSON.stringify({
        prizes: false
      })
    })
  }  
  let prizes = null;
  snapshot.docs.forEach(game => {
    let appObj = game.data();
    prizes = appObj.prizes
})

  return callback(null, {
    statusCode: statusCode,
    headers: headers,
    body: JSON.stringify({
      prizes
    })
  })
}


