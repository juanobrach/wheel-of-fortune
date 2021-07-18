var voucher_codes = require("voucher-code-generator");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  const code = voucher_codes.generate({
    length: 8,
    count: 1,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(code[0]),
  };
};
