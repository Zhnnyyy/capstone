const { startQuery } = require("../database/config");

const attendanceLog = async (uid) => {
  try {
    const query =
      "select * from attendance where EmployeeID=? order by Date  desc";

    const result = await startQuery(query, [uid]);
    return result;
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};
module.exports = { attendanceLog };
