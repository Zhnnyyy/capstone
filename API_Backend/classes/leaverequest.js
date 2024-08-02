const { startQuery } = require("../database/config");
const fs = require("fs");
class RequestLeave {
  #UID;
  #status;
  #startDate;
  #endDate;
  #employee;
  constructor(UID, status, startdate, enddate, employee) {
    this.#UID = UID;
    this.#status = status;
    this.#startDate = startdate;
    this.#endDate = enddate;
    this.#employee = employee;
  }

  show = async () => {
    try {
      const query =
        "SELECT request.id, request.EmployeeID, concat(employee.Lastname,' ', employee.Firstname) as name, request.startDate, request.endDate, leavetypes.Name as types, request.reason, request.status FROM `request` INNER JOIN employee on employee.EmployeeID = request.EmployeeID INNER JOIN leavetypes on leavetypes.id = request.types where request.status='pending'";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  history = async () => {
    try {
      const query =
        "SELECT request.id, request.EmployeeID, concat(employee.Lastname,' ', employee.Firstname) as name, request.startDate, request.endDate, leavetypes.Name as types, request.reason, request.status, request.Date FROM `request` INNER JOIN employee on employee.EmployeeID = request.EmployeeID INNER JOIN leavetypes on leavetypes.id = request.types where request.status !='pending' ";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  update = async () => {
    try {
      const query = "UPDATE `request` SET `status`=? WHERE id=?";
      const param = [this.#status, this.#UID];
      const mdates = this.addAttendanceForLeave();
      const type = await this.getType();
      await startQuery("START TRANSACTION");
      if (this.#status == "Approved" && type != "Unpaid Leave") {
        for (const data of mdates) {
          const query1 =
            "INSERT INTO `attendance`(`EmployeeID`, `DayType`, `WorkHours`, `Date`, `Status`) VALUES (?,?,?,?,?)";
          const param1 = [
            this.#employee,
            this.holidayChecker(data),
            "540",
            data,
            "Leave",
          ];
          await startQuery(query1, param1);
        }
      }
      await startQuery(query, param);
      await startQuery("COMMIT");
      return { Error: false };
    } catch (error) {
      await startQuery("ROLLBACK");
      return { Error: true, msg: error.messsage };
    }
  };

  getType = async () => {
    try {
      const query =
        "select leavetypes.Name from request INNER JOIN leavetypes on leavetypes.id = request.types where request.id=?";
      const result = await startQuery(query, [this.#UID]);
      return result[0].Name;
    } catch (error) {
      return error.message;
    }
  };

  addAttendanceForLeave() {
    let currentDate = new Date(this.#startDate);
    let end = new Date(this.#endDate);

    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }
    let attendanceDates = [];

    while (currentDate <= end) {
      if (!this.isWeekend(currentDate)) {
        attendanceDates.push(formatDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return attendanceDates;
  }

  isWeekend = (mdate) => {
    let date = new Date(mdate);
    const days = date.getDay();
    return days === 0 || days === 6;
  };

  holidayChecker = (date) => {
    if (this.regularHolidayChecker(date).match) {
      return "RegularHoliday";
    }
    if (this.specialHolidayChecker(date).match) {
      return "SpecialHoliday";
    }
    return "Regular";
  };

  regularHolidayChecker = (date) => {
    try {
      const data = fs.readFileSync("./json/holidays.json");
      const result = JSON.parse(data);
      const regularHolidays = result.Regular_Holidays;
      for (const holiday of regularHolidays) {
        if (holiday.date === date) {
          return { match: true, name: holiday.name, date: holiday.date };
        }
      }
      return { match: false };
    } catch (error) {
      return error.message;
    }
  };
  specialHolidayChecker = (date) => {
    try {
      const data = fs.readFileSync("./json/holidays.json");
      const result = JSON.parse(data);
      const regularHolidays = result.Special_Holidays;
      for (const holiday of regularHolidays) {
        if (holiday.date === date) {
          return { match: true, name: holiday.name, date: holiday.date };
        }
      }
      return { match: false };
    } catch (error) {
      return error.message;
    }
  };
}
module.exports = RequestLeave;
