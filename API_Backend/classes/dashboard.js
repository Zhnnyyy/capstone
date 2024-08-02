const { startQuery } = require("../database/config");
const fs = require("fs");
class Dashboard {
  DashboardDetails = async () => {
    const employee = await this.employee();
    const attendance = await this.attendance();
    const request = await this.request();
    const leave = await this.Leave();
    const holiday = this.holidays();
    const data = {
      employee: employee,
      attendance: attendance,
      request: request,
      leave: leave,
      holiday: holiday,
    };
    return data;
  };
  employee = async () => {
    try {
      const query = "select count(*) as count from employee";
      const result = await startQuery(query);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  attendance = async () => {
    try {
      const query = "select count(*) as count from attendance where Date=?";
      const param = [this.currentDate()];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  request = async () => {
    try {
      const query =
        "select count(*) as count from request where status='pending'";
      const result = await startQuery(query);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  Leave = async () => {
    try {
      const query =
        "select count(*) as count from attendance where Date=? and Status='Leave'";
      const param = [this.currentDate()];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  holidays = () => {
    try {
      const data = fs.readFileSync("./json/holidays.json");
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  currentDate = () => {
    return new Date().toISOString().substr(0, 10);
  };
}
module.exports = Dashboard;
