const fs = require("fs");
const { startQuery } = require("../database/config");
class Timesheet {
  #UID;
  #startDate;
  #endDate;
  constructor(UID, startDate, endDate) {
    this.#UID = UID;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  details = async () => {
    try {
      const leave = await totalLeave(this.#UID, this.#startDate, this.#endDate);
      const overtime = await totalOvertime(
        this.#UID,
        this.#startDate,
        this.#endDate
      );
      const wrkdays = await totalWorkDays(
        this.#UID,
        this.#startDate,
        this.#endDate
      );
      const wrkhrs = await totalWorkHrs(
        this.#UID,
        this.#startDate,
        this.#endDate
      );
      const overtimeHrs = await totalOvertimeHrs(
        this.#UID,
        this.#startDate,
        this.#endDate
      );
      const table = await loadTable(this.#UID, this.#startDate, this.#endDate);
      const undertime = await this.totalUndertime();
      const undertimeHrs = await this.totalUndertimeHrs();
      return {
        leave: leave,
        overtime: overtime,
        wrkdays: wrkdays,
        wrkhrs: wrkhrs,
        table: table,
        overtimeHrs: overtimeHrs,
        undertime: undertime,
        undertimeHrs: undertimeHrs,
      };
    } catch (error) {
      return error.message;
    }
  };

  totalUndertime = async () => {
    try {
      const query =
        "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status ='Undertime' ";
      const param = [this.#UID, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  totalUndertimeHrs = async () => {
    try {
      const query =
        "select  sum(WorkHours-60) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status='Undertime' ";
      const param = [this.#UID, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  show = async () => {
    try {
      const query =
        "select EmployeeID, concat(firstname,' ',lastname) as name, employeetypes.Type, employeeposition.Position, rate.Rate, schedule.Schedule from employee inner JOIN employeetypes on employeetypes.id = employee.Type INNER JOIN employeeposition on employeeposition.id = employee.Position INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule where Status='Active'";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  showfiltered = async (id) => {
    try {
      const query = `select EmployeeID, concat(firstname,' ',lastname) as name, employeetypes.Type, employeeposition.Position, rate.Rate, schedule.Schedule from employee inner JOIN employeetypes on employeetypes.id = employee.Type INNER JOIN employeeposition on employeeposition.id = employee.Position INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule where Status='Active' and EmployeeID like '%${id}%'`;
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  holidays = async () => {
    try {
      const data = fs.readFileSync("./json/holidays.json");
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      return error.message;
    }
  };
}
const totalOvertimeHrs = async (uid, date1, date2) => {
  try {
    const query =
      "select (WorkHours-60) as WorkHours from attendance where EmployeeID=? and Date >=? and Date <=? order by Date asc";
    const param = [uid, date1, date2];
    const result = await startQuery(query, param);
    return result;
  } catch (error) {
    return error.message;
  }
};

const totalLeave = async (uid, date1, date2) => {
  try {
    const query =
      "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status='leave'";
    const param = [uid, date1, date2];
    const result = await startQuery(query, param);
    return result[0].count;
  } catch (error) {
    return error.message;
  }
};

const totalOvertime = async (uid, date1, date2) => {
  try {
    const query =
      "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status='overtime'";
    const param = [uid, date1, date2];
    const result = await startQuery(query, param);
    return result[0].count;
  } catch (error) {
    return error.message;
  }
};
const totalWorkDays = async (uid, date1, date2) => {
  try {
    // const query =
    //   "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status !='Leave'  AND (Daytype != 'RegularHoliday' AND != '')";
    const query =
      "SELECT COUNT(*) as count FROM attendance WHERE EmployeeID = ? AND Date >= ? AND Date <= ? AND Status != 'Leave' AND (Daytype != 'RegularHoliday' AND Daytype != '');";
    const param = [uid, date1, date2];
    const result = await startQuery(query, param);
    return result[0].count;
  } catch (error) {
    return error.message;
  }
};
const totalWorkHrs = async (uid, date1, date2) => {
  try {
    const query =
      "select  sum(CASE WHEN WorkHours  > 300 then WorkHours -60 else WorkHours  end) as count from attendance where EmployeeID=? and Date >=? and Date <=? ";
    const param = [uid, date1, date2];
    const result = await startQuery(query, param);
    return result[0].count;
  } catch (error) {
    return error.message;
  }
};

const loadTable = async (uid, date1, date2) => {
  try {
    const query =
      "select TimeIn,TimeOut,CASE WHEN WorkHours  > 300 then WorkHours -60 else WorkHours  end as WorkHours,Status,Date from attendance where EmployeeID=? and Date >=? and Date <=? order by Date ";
    const param = [uid, date1, date2];
    const result = await startQuery(query, param);
    console.log(result);
    return result;
  } catch (error) {
    return error.message;
  }
};
module.exports = Timesheet;
