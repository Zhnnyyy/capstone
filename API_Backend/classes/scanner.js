const { startQuery } = require("../database/config");
require("dotenv").config();
class Scanner {
  #date;
  #uid;
  #time;
  constructor(date, uid, time) {
    this.#date = date;
    this.#uid = uid;
    this.#time = time;
  }

  validate = async (target) => {
    try {
      const query = `select ${target} from attendance where EmployeeID=? and Date=? `;
      const param = [this.#uid, this.#date];
      const result = await startQuery(query, param);

      if (
        result[0][target] == "" ||
        result.length == 0 ||
        result[0][target] == null
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
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
      const data = process.env.HOLIDAYS;
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
      const data = process.env.HOLIDAYS;
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

  onLeave = async () => {
    try {
      const query =
        "select count(*) as count from attendance where EmployeeID=? and Date=? and Status ='Leave'";
      const param = [this.#uid, this.#date];
      const result = await startQuery(query, param);
      if (result[0].count > 0) {
        return false;
      }
      return true;
    } catch (error) {}
  };

  timein = async () => {
    const result = await this.checkQR();
    if (result.Error) {
      return { Error: true, msg: result.msg };
    } else {
      try {
        const query =
          "insert into attendance(EmployeeID,DayType, TimeIn, Date)values(?,?,?,?)";
        const param = [
          this.#uid,
          this.holidayChecker(this.#date),
          this.#time,
          this.#date,
        ];
        await startQuery(query, param);
        return { Error: false, msg: "Time in has been marked" };
        // if (await this.onLeave()) {
        //   await startQuery(query, param);
        //   return { Error: false, msg: "Time in has been marked" };
        // }
        // return { Error: true, msg: "You have filed a leave for today." };
      } catch (error) {
        console.log(error);
        return { Error: true, msg: error.message };
      }
    }
  };

  validateDevice = async (id, deviceID) => {
    try {
      const query = "select deviceID from account where EmployeeID=?";
      const result = await startQuery(query, [id]);
      const res = result[0].deviceID;
      if (res.match(deviceID)) {
        return { Error: false };
      }
      return { Error: true, msg: "Device is not registered" };
    } catch (error) {
      return error.message;
    }
  };

  getTimeIn = async () => {
    try {
      const query =
        "select TimeIn from attendance where EmployeeID=? and Date=?";
      const param = [this.#uid, this.#date];
      const result = await startQuery(query, param);
      if (result[0].TimeIn == undefined) {
        return { Error: true, msg: "No time in recorded for today" };
      }
      return { Error: false, msg: result[0].TimeIn };
    } catch (error) {
      return { Error: true, msg: "No time in recorded for today" };
    }
  };

  timeout = async (wrkhrs, status) => {
    const result = await this.checkQR();
    if (result.Error) {
      return { Error: true, msg: result.msg };
    } else {
      try {
        const query =
          "update attendance set TimeOut=?, WorkHours=?, Status=? where EmployeeID=? and Date=?";
        const param = [this.#time, wrkhrs, status, this.#uid, this.#date];
        await startQuery(query, param);
        return { Error: false, msg: "Time out has been marked" };
      } catch (error) {
        return { Error: true, msg: error.message };
      }
    }
  };

  checkQR = async () => {
    try {
      const query = "select count(*) as count from account where EmployeeID=?";
      const param = [this.#uid];
      const result = await startQuery(query, param);
      if (result[0].count > 0) {
        return { Error: false, msg: "QR Code is valid" };
      } else {
        return { Error: true, msg: "QR Code is invalid" };
      }
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };
}
module.exports = Scanner;
