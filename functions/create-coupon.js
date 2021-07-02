/* code from functions/todos-create.js */
const faunadb = require("faunadb"); /* Import faunaDB sdk */
const moment = require("moment");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAEKRfO0HACBlUk1obxZWxz_tCYCZyswWw3Xc9M",
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  const expire_at = moment().add(7, "d").format("YYYY-MM-DD");
  const created_at = moment().format("YYYY-MM-DD");

  const body = JSON.parse(event.body);
  /* parse the string body into a useable JS object */
  const data = {
    customerId: body.customerId,
    bussinessId: body.bussinessGameId,
    prizeId: body.prizeId,
    created_at,
    expire_at,
  };
  /* construct the fauna query */
  try {
    const response = await client.query(
      q.Create(q.Collection("Coupon"), {
        data,
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
