const { startQuery } = require("../database/config");
const crypto = require("crypto");
class account {
  #username;
  #password;
  constructor(uname, pass) {
    this.#username = uname;
    this.#password = pass;
  }

  validate = async () => {
    try {
      const query =
        "select count(*) as count from sysaccount where BINARY username=? and password=?";
      const param = [this.#username, this.encrypt(this.#password)];
      const result = await startQuery(query, param);
      if (result[0].count > 0) {
        return { Error: false };
      }
      return { Error: true, msg: "Invalid Credentials" };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  encrypt = (inputString) => {
    const hash = crypto.createHash("sha256");
    hash.update(inputString);
    const encryptedString = hash.digest("hex");
    return encryptedString;
  };
}
module.exports = account;
