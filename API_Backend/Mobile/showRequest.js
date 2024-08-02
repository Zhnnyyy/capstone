const { startQuery } = require("../database/config");
const showRequest = async (id) => {
  try {
    const query =
      "SELECT * FROM `request` INNER JOIN leavetypes on leavetypes.id = request.types WHERE EmployeeID=? ORDER BY Date DESC";
    const result = await startQuery(query, [id]);
    return result;
  } catch (error) {
    return error.message;
  }
};
module.exports = { showRequest };
