const { startQuery } = require("../database/config");

const sendReq = async (id, startdate, enddate, types, reason) => {
  try {
    const query =
      "insert into request(EmployeeID,startDate,endDate,types,reason,status,Date)values(?,?,?,?,?,?,?)";
    const param = [
      id,
      startdate,
      enddate,
      types,
      reason,
      "pending",
      currentDate(),
    ];
    const dateHired = new Date(await employeeDate(id));
    const dateToday = new Date(currentDate());
    const _credits = await TypesCredits(types);
    const _employeeRequest = await requestCount(id, types);
    if (isQualified(dateHired, dateToday) >= 6) {
      if (_credits <= _employeeRequest) {
        return {
          Error: true,
          msg: "Sorry you have no available credits",
        };
      }
      //Go insert
      await startQuery(query, param);
      return { Error: false, msg: "Request has been sent to HR" };
    } else {
      return {
        Error: true,
        msg: "Sorry this feature is not yet available to your account!",
      };
    }
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};

function isQualified(date1, date2) {
  const date1LastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
  const date2LastDay = new Date(date2.getFullYear(), date2.getMonth() + 1, 0);

  const diffInDays = (date2LastDay - date1LastDay) / (1000 * 60 * 60 * 24);
  const months = diffInDays / 30;

  return months;
}

const requestCount = async (id, type) => {
  try {
    const query =
      "select count(*) as count from request where EmployeeID=? and YEAR(Date)=? and types=? and Status='Approved'";
    const param = [id, currentDate(), type];
    const result = await startQuery(query, param);
    return result[0].count;
  } catch (error) {
    return error.message;
  }
};

const employeeDate = async (id) => {
  try {
    const query = "select DateHired from employee where EmployeeID=?";
    const param = [id];
    const result = await startQuery(query, param);
    return result[0].DateHired;
  } catch (error) {
    return error.message;
  }
};

const TypesCredits = async (id) => {
  try {
    const query = "select Credit from leavetypes where id=?";
    const param = [id];
    const result = await startQuery(query, param);
    return result[0].Credit;
  } catch (error) {
    return error.message;
  }
};
const currentDate = () => {
  return new Date().toISOString().substr(0, 10);
};
module.exports = { sendReq };
