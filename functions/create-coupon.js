const moment = require("moment");
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json') // Update this to your file

// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'wheeloffortune-fe46d-default-rtdb.firebaseio.com'
})

const db = admin.firestore()

exports.handler = async (event, context, callback) => {
  const expire_at = moment().add(7, "d").format("YYYY-MM-DD");
  const created_at = moment().format("YYYY-MM-DD");
  const body = JSON.parse(event.body);
  const coupon = {
    customerId: body.customerId,
    bussinessId: body.bussinessId,
    prizeId: body.prizeId,
    prizeName: body.prizeName,
    created_at,
    expire_at,
  };


  const response = await db.collection('coupons').add(coupon);

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      created: true,
      couponId: response.id
    })
  })
  
}







