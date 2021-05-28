exports.handler = async function(event, context) {
  // your server-side functionality
  console.log("hello function");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
