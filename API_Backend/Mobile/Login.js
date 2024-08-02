const { startQuery } = require("../database/config");
const crypto = require("crypto");
const { setStatus } = require("./accountStatus");
const loginUser = async (username, password) => {
  try {
    const validate = await checkStatus(username, password);
    if (await isHaveEmail(username, password)) {
      if (validate) {
        const query =
          "select count(*) as count from account where BINARY EmployeeID=? and Password=? ";
        const param = [username, encrypt(password)];
        const result = await startQuery(query, param);
        const count = result[0].count;
        if (count > 0) {
          if (!(await isActive(username))) {
            return {
              Error: true,
              msg: "Your account is deactivated \n Please contact the HR",
            };
          }
          const result = await setStatus(username, "online");
          if (result.Error) {
            return { Error: true, msg: "Please login again" };
          }
          return { Error: false, msg: "Login Successful" };
        } else {
          return { Error: true, msg: "Invalid Credentials" };
        }
      } else {
        return {
          Error: true,
          msg: "Please log out from your previous device before signing in again.",
        };
      }
    } else {
      if (validate) {
        const query =
          "select count(*) as count from account where BINARY EmployeeID=? and Password=? ";
        const param = [username, encrypt(password)];
        const result = await startQuery(query, param);
        const count = result[0].count;
        if (count > 0) {
          if (!(await isActive(username))) {
            return {
              Error: true,
              msg: "Your account is deactivated \n Please contact the HR",
            };
          }
          return { Error: false, msg: "Login Successful" };
        } else {
          return { Error: true, msg: "Invalid Credentials" };
        }
      } else {
        return {
          Error: true,
          msg: "Please log out from your previous device before signing in again.",
        };
      }
    }
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};

const isActive = async (username) => {
  try {
    const query = "select Status from employee where EmployeeID=?";
    const result = await startQuery(query, [username]);
    const res = result[0].Status;
    if (res == "Inactive") {
      return false;
    }
    return true;
  } catch (error) {}
};

async function isHaveEmail(username, password) {
  try {
    const query =
      "select email from account where BINARY EmployeeID=? and Password=? ";
    const param = [username, encrypt(password)];
    const result = await startQuery(query, param);
    return result[0].email != "" ? true : false;
  } catch (error) {
    return error.message;
  }
}

async function checkStatus(username, password) {
  try {
    const query =
      "select * from account where BINARY EmployeeID=? and Password=? ";
    const param = [username, encrypt(password)];
    const result = await startQuery(query, param);
    return result[0].Status == "offline" ||
      result[0].Status == "" ||
      result[0].Status == null
      ? true
      : false;
  } catch (error) {
    return error.message;
  }
}

function encrypt(inputString) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  const encryptedString = hash.digest("hex");
  return encryptedString;
}

module.exports = { loginUser };
