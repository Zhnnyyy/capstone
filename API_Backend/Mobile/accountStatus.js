const { startQuery } = require("../database/config");

const setStatus = async (ID, STATUS) => {
  try {
    const query = "update account set Status=? where EmployeeID=?";
    const param = [STATUS, ID];
    await startQuery(query, param);
    return { Error: false };
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};
module.exports = { setStatus };
