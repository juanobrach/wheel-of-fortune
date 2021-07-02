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
  const body = JSON.parse(event.body);

  const getUser = (bussinessGameId) => {
    return new Promise((resolve, reject) => {
      client
        .query(
          q.Map(
            q.Paginate(
              q.Match(q.Index("all_prizes_by_bussinessGame"), bussinessGameId)
            ),
            q.Lambda("x", q.Get(q.Var("x")))
          )
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  try {
    const response = await getUser(body.bussinessGameId);
    console.log("response:", response);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({ response: e.description }),
    };
  }
};
