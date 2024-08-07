const { startQuery } = require("../database/config");
require("dotenv").config();
class Attendance {
  #startDate;
  #endDate;
  constructor(starDate, endDate) {
    this.#startDate = starDate;
    this.#endDate = endDate;
  }

  show = async () => {
    try {
      const query =
        "select attendance.id, attendance.EmployeeID, concat(employee.Lastname,' ',employee.Firstname)as name, attendance.TimeIn, attendance.TimeOut,  CASE " +
        "WHEN attendance.WorkHours > 300 THEN attendance.WorkHours-60 " +
        "ELSE attendance.WorkHours " +
        "END as WorkHours, attendance.Date, attendance.Status from attendance INNER JOIN employee on employee.EmployeeID = attendance.EmployeeID WHERE employee.Status = 'Active' ORDER BY Date DESC, attendance.id DESC";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  update = async (id, time1, time2, wrkhrs) => {
    try {
      const query =
        "update attendance set TimeIn=?, TimeOut=?, WorkHours=? where id=?";
      const param = [time1, time2, wrkhrs, id];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: false, msg: error.message };
    }
  };

  filtered = async () => {
    try {
      const query =
        "select attendance.id, attendance.EmployeeID, concat(employee.Lastname,' ',employee.Firstname)as name, attendance.TimeIn, attendance.TimeOut,  CASE " +
        "WHEN attendance.WorkHours > 300 THEN attendance.WorkHours-60 " +
        "ELSE attendance.WorkHours " +
        "END as WorkHours, attendance.Date, attendance.Status from attendance INNER JOIN employee on employee.EmployeeID = attendance.EmployeeID where attendance.Date >= ? and attendance.Date <= ? and employee.Status = 'Active' ORDER BY Date DESC, attendance.id DESC ";
      const param = [this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      return result;
    } catch (error) {
      return error.message;
    }
  };
}
const currentDate = () => {
  return new Date().toISOString().substr(0, 10);
};
const isRegHoliday = () => {
  const result = process.env.HOLIDAYS;
  const response = JSON.parse(result);
  const data = response.Regular_Holidays;
  for (const _date of data) {
    const res = _date.date;
    if (currentDate() == res) {
      return true;
    }
  }
  return false;
};

const getEmployeeID = async () => {
  let employeeID = [];
  const query = "select EmployeeID from employee where Status='Active'";
  const res = await startQuery(query);
  for (const data of res) {
    employeeID.push(data.EmployeeID);
  }
  return employeeID;
};

const attendanceID = async () => {
  let employeeID = [];
  const query = `select EmployeeID from attendance where Date='2024-04-05'`;
  const res = await startQuery(query);
  for (const data of res) {
    employeeID.push(data.EmployeeID);
  }
  return employeeID;
};
const finalListofID = async () => {
  const employeeID = await getEmployeeID();
  const attendance = await attendanceID();
  for (const data of attendance) {
    let index = employeeID.indexOf(data);
    if (index !== -1) {
      employeeID.splice(index, 1);
    }
  }
  return employeeID;
};
const addAttendance = async (data) => {
  try {
    let arr = data;
    await startQuery("START TRANSACTION");
    for (const employee of arr) {
      const query =
        "INSERT INTO `attendance`(`EmployeeID`, `DayType`, `WorkHours`, `Date`, `Status`) VALUES (?,?,?,?,?)";
      const param = [employee, "RegularHoliday", 0, currentDate(), "Regular"];
      await startQuery(query, param);
    }
    await startQuery("COMMIT");
  } catch (error) {
    console.log(error.message);
  }
};
setInterval(async () => {
  isRegHoliday();
  if (isRegHoliday()) {
    const arrID = await finalListofID();
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    if (currentHour === 23) {
      addAttendance(arrID);
    }
  }
}, 1000);
module.exports = Attendance;
