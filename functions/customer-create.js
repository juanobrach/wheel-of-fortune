/* code from functions/todos-create.js */
const faunadb = require("faunadb"); /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAEKRfO0HACBlUk1obxZWxz_tCYCZyswWw3Xc9M",
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  console.log("event.body:", event);
  return {
    statusCode: 200,
    body: JSON.stringify(JSON.parse(event.body)),
  };
  /* parse the string body into a useable JS object */
  const todoItem = {
    data: {
      name: "juan",
    },
  };
  /* construct the fauna query */
  return client
    .query(
      q.Create(q.Collection("Customer"), {
        data: {
          name: "ingrid",
        },
      })
    )
    .then((response) => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    });
};
