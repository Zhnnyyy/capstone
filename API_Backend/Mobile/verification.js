const { startQuery } = require("../database/config");

const isHaveEmail = async (id) => {
  try {
    const query = "select email from account where EmployeeID=?";
    const result = await startQuery(query, [id]);
    if (result[0].email == "") {
      return { Error: false, haveEmail: false };
    }
    return { Error: false, haveEmail: true };
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};
module.exports = { isHaveEmail };
