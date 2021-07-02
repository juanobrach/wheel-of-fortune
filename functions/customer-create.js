const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json') // Update this to your file

// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'wheeloffortune-fe46d-default-rtdb.firebaseio.com'
})

const db = admin.firestore()

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  /* parse the string body into a useable JS object */
  const customer = {
      email: body.email,
  };

  const snapshot  = await db.collection('customers').where('email', '==', customer.email).get();
  if (snapshot.empty) {

    const response = await db.collection('customers').add(customer);

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        created: true,
        customerId: response.id
      })
    })
  }  


  return callback(null, {
    statusCode: 400,
    body: JSON.stringify({
      created: false
    })
  })
}


