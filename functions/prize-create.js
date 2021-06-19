/* code from functions/todos-create.js */
const faunadb = require("faunadb"); /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAEKRfO0HACBlUk1obxZWxz_tCYCZyswWw3Xc9M",
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  /* parse the string body into a useable JS object */
  const prize = {
    data: {
      customerId: body.customerId,
      prizeName: body.prizeName,
    },
  };
  /* construct the fauna query */
  try {
    const response = await client.query(
      q.Create(q.Collection("Coupon"), {
        data: prize,
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.ref),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ response: error.description }),
    };
  }
};
