const { startQuery } = require("../database/config");
const crypto = require("crypto");
const { setStatus } = require("./accountStatus");
const setEmail = async (id, email, deviceid, pass) => {
  try {
    const query =
      "update account set email=?, deviceID=?, Password=?, Status=? where EmployeeID=?";
    const param = [email, deviceid, encrypt(pass), "online", id];
    await startQuery(query, param);
    return { Error: false };
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};

function encrypt(inputString) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  const encryptedString = hash.digest("hex");
  return encryptedString;
}
module.exports = { setEmail };
