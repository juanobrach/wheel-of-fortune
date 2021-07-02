const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json') // Update this to your file

// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'wheeloffortune-fe46d-default-rtdb.firebaseio.com'
})

const db = admin.firestore()

exports.handler = async (event, context, callback) => {
  await db.collection('COLLECTION').add({
    name: 'Test'
  })

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: `Test data added successfully`
    })
  })
}