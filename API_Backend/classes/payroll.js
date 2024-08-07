const { match } = require("assert");
const { startQuery } = require("../database/config");
require("dotenv").config();
class Payroll {
  #id;
  #startDate;
  #endDate;
  #cutoff;
  constructor(id, startDate, endDate, cutoff) {
    this.#id = id;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#cutoff = cutoff;
  }

  payroll = async () => {
    const wrkhrs = await this.totalWorkhrs();
    const workdays = await this.totalWorkDays();
    const leave = await this.totalLeave();
    const overtime = await this.totalOvertime();
    const overtimehrs = await this.totalOvertimeHrs();
    const allowance = await this.totalAllowance();
    const adjustment = await this.SalaryAdjustment();
    const deduction = await this.totalDeduction();
    const regularWorkhrs = await this.totalRegularWorkhrs();
    const undertimehrs = await this.totalUndertimeWorkhrs();
    const undertime = await this.totalUndertime();
    const regularWorkdays = await this.totalRegularWorkDays();
    const regularHoliday = await this.regularHoliday();
    const specialHoliday = await this.specialHoliday();
    const regularHolidayPay = await this.regularHolidayPay();
    const specialHolidayPay = await this.specialHolidayPay();
    const lastgrosspay = await this.lastgrosspay();
    const data = {
      wrkhrs: wrkhrs,
      wrkdays: workdays,
      leave: leave,
      overtime: overtime,
      overtimehrs: overtimehrs,
      allowance: allowance,
      adjustment: adjustment,
      deduction: deduction,
      regularWorkhrs: regularWorkhrs,
      undertimehrs: undertimehrs,
      undertime: undertime,
      regularWorkdays: regularWorkdays,
      regularHoliday: regularHoliday,
      regularHolidayPay: regularHolidayPay,
      specialHoliday: specialHoliday,
      specialHolidayPay: specialHolidayPay,
      lastgrosspay: lastgrosspay,
    };
    return data;
  };

  showEmployee = async () => {
    try {
      const query =
        "SELECT EmployeeID, Firstname, Middlename, Lastname,Suffix, employeetypes.Type, employeeposition.Position, rate.Rate, rate.Value as rateValue, schedule.Schedule, employee.EmployeeRate as rateID, employee.EmployeeSchedule as schedID, employee.Type as TypeID, employee.Position as PositionID, Status FROM employee INNER JOIN employeetypes on employeetypes.id = employee.Type INNER JOIN employeeposition on employeeposition.id = employee.Position INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule where employee.Status ='Active' ORDER BY employee.EmployeeID ASC, rate.Rate ASC";
      return await startQuery(query);
    } catch (error) {
      return error.message;
    }
  };

  validateCutoff = async (cutoff) => {
    const res = await startQuery(
      "select count(*) as count from payroll where Cutoff=?",
      [cutoff]
    );
    return res[0].count == 0 ? true : false;
  };

  addPayroll = async (cutoff, details) => {
    try {
      if (!(await this.validateCutoff(cutoff))) {
        return { Error: true, msg: "Exisitng Cutoff" };
      }
      // await startQuery("START TRANSACTION;");
      for (const res of details) {
        const query =
          "INSERT INTO `payroll`(`EmployeeID`, `Cutoff`,`Created`, `WorkDays`, `Rate`, `Undertime`, `TotalLeave`, `BasicPay`, `RegularHoliday`, `SpecialHoliday`, `RegularHolidayPay`, `SpecialHolidayPay`, `OvertimeHrs`, `OvertimePay`, `Allowance`, `SalaryAdjustment`, `TotalEarnings`, `Grosspay`, `PAGIBIG`, `PHILHEALTH`, `SSS`, `TAX`, `Deduction`, `TotalDeduction`, `Netpay`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const params = [
          res.ID,
          cutoff,
          this.currentDate(),
          res.wrkdays,
          res.rate,
          res.undertime,
          res.leave,
          res.basicpay,
          res.regularholiday,
          res.specialHoliday,
          res.regularPay,
          res.specialPay,
          res.overtimeHrs,
          res.overtimePay,
          res.allowance,
          res.salaryAdjustment,
          res.totalearnings,
          res.grosspay,
          res.pagibig,
          res.philhealth,
          res.sss,
          res.tax,
          res.deduction,
          res.totaldeduct,
          res.netpay,
        ];
        await startQuery(query, params);
      }
      // await startQuery("COMMIT;");
      return { Error: false };
    } catch (error) {
      await startQuery("ROLLBACK");
      return { Error: true, msg: error.message };
    }
  };

  currentDate = () => {
    return new Date().toISOString().substr(0, 10);
  };

  totalWorkhrs = async () => {
    try {
      const query =
        "select sum(CASE WHEN WorkHours  > 300 then WorkHours -60 else WorkHours  end) as wrkhrs from attendance where EmployeeID=? and Date >=? and Date <=? and DayType='Regular' ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      const wkrhrs = Math.floor(result[0].wrkhrs / 60);
      return wkrhrs;
    } catch (error) {
      return error.message;
    }
  };

  totalRegularWorkDays = async () => {
    try {
      const query =
        "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status !='Undertime' and DayType='Regular' ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  totalWorkDays = async () => {
    try {
      // const query =
      //   "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status != 'Leave' and DayType='RegularHoliday' or DayType='SpecialHoliday' and Status!='Undertime' ";
      const query =
        "SELECT count(*) as count FROM attendance WHERE EmployeeID = ? AND Date >= ? AND Date <=? AND Status != 'Leave' AND (Daytype NOT IN ('RegularHoliday','SpecialHoliday') OR (Daytype IN ('RegularHoliday', 'SpecialHoliday') AND Status != 'Undertime'  AND (Daytype != 'RegularHoliday' AND WorkHours != '' )));";

      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  totalLeave = async () => {
    try {
      const query =
        "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and status=? ";
      const param = [this.#id, this.#startDate, this.#endDate, "Leave"];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  totalOvertime = async () => {
    try {
      const query =
        "select count(*) as count from attendance where EmployeeID=? and Date >=? and Date <=? and Status=? and DayType='Regular'  ";
      const param = [this.#id, this.#startDate, this.#endDate, "Overtime"];
      const result = await startQuery(query, param);
      return result[0].count;
    } catch (error) {
      return error.message;
    }
  };

  totalOvertimeHrs = async () => {
    try {
      const query =
        "select (WorkHours-60) as WorkHours from attendance where EmployeeID=? and Date >=? and Date <=? and status=? and DayType='Regular' ";
      const param = [this.#id, this.#startDate, this.#endDate, "Overtime"];
      const result = await startQuery(query, param);
      return this.calculateOvertimeHrs(result);
    } catch (error) {
      return error.message;
    }
  };

  calculateOvertimeHrs = (arr) => {
    let totalHrs = 0;
    arr.forEach((data, index) => {
      const workhrs = parseInt(data.WorkHours);
      const hrs = Math.floor(workhrs / 60);
      const overtime = hrs - 8;
      totalHrs += overtime;
    });
    return totalHrs;
  };

  totalDeduction = async () => {
    try {
      const query =
        "select sum(amount) as total from deduction where EmployeeID=? and CutOff=?";
      const param = [this.#id, this.#cutoff];
      const result = await startQuery(query, param);
      return result[0].total;
    } catch (error) {
      return error.message;
    }
  };
  totalAllowance = async () => {
    try {
      const query =
        "select sum(amount) as total from allowance where EmployeeID=? and CutOff=?";
      const param = [this.#id, this.#cutoff];
      const result = await startQuery(query, param);
      return result[0].total;
    } catch (error) {
      return error.message;
    }
  };

  SalaryAdjustment = async () => {
    try {
      const query =
        "select sum(amount) as total from adjustment where EmployeeID=? and CutOff=?";
      const param = [this.#id, this.#cutoff];
      const result = await startQuery(query, param);
      return result[0].total;
    } catch (error) {
      return error.message;
    }
  };

  totalRegularWorkhrs = async () => {
    try {
      const query =
        "select sum(WorkHours-60) as wrkhrs from attendance where EmployeeID=? and Date >=? and Date <=? and Status != 'Undertime' and DayType='Regular' ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      const workhours = Math.floor(result[0].wrkhrs / 60);
      return workhours;
    } catch (error) {
      return error.message;
    }
  };

  totalUndertimeWorkhrs = async () => {
    try {
      const query =
        "select sum(WorkHours-60) as wrkhrs from attendance where EmployeeID=? and Date >=? and Date <=? and Status ='Undertime' and DayType='Regular' ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      const workhours = Math.floor(result[0].wrkhrs / 60);
      return workhours;
    } catch (error) {
      return error.message;
    }
  };

  totalUndertime = async () => {
    try {
      const query =
        "select count(*) as total from attendance where EmployeeID=? and Date >=? and Date <=? and Status ='Undertime' and DayType='Regular' ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      return result[0].total;
    } catch (error) {
      return error.message;
    }
  };

  regularHoliday = async () => {
    try {
      let obj = [];
      const query =
        "select Date from attendance where EmployeeID=? and Date >=? and Date <=? ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      result.forEach((data, i) => {
        if (this.regularHolidayChecker(data.Date).match) {
          obj.push({
            name: this.regularHolidayChecker(data.Date).name,
            date: this.regularHolidayChecker(data.Date).date,
            day: this.getDay(this.regularHolidayChecker(data.Date).date),
          });
        }
      });

      return { count: obj.length, holiday: obj };
    } catch (error) {
      return error.message;
    }
  };
  regularHolidayPay = async () => {
    try {
      let regular = 0;
      let overtime = 0;
      let undertime = 0;
      const attendance = await this.employeeAttendance("RegularHoliday");
      const employee = await this.employeeDetails();
      attendance.forEach((res, i) => {
        const workingHrs = Math.floor(parseInt(res.Wrkhrs) / 60);
        if (
          this.getDay(res.Date) == "Sunday" ||
          this.getDay(res.Date) == "Saturday"
        ) {
          if (res.Status == "Regular") {
            const pay = employee * (employee * 2 * 0.3);
            regular += pay;
          }

          if (res.Status == "Overtime") {
            const OTHrs = workingHrs - 8;
            const OTpay = employee + (employee / 8) * 2 * 1.3 * 1.3 * OTHrs;
            overtime += OTpay;
          }

          if (res.Status == "Undertime") {
            const workingpay = (employee / 8) * 1.5 * 1.3 * workingHrs;
            const pay = workingpay - employee;
            undertime += pay;
          }
        } else {
          if (res.Status == "Regular") {
            regular += parseInt(employee);
          }

          if (res.Status == "Overtime") {
            const OTHrs = workingHrs - 8;
            const OTpay = (employee / 8) * 2 * 1.3 * OTHrs;
            const pay = parseFloat(employee) + parseFloat(OTpay);
            overtime += pay;
          }

          if (res.Status == "Undertime") {
            const workingpay = (employee / 8) * 1.3 * workingHrs;
            const pay = workingpay - employee;
            undertime += pay;
          }
        }
      });
      const total =
        parseFloat(regular) + parseFloat(overtime) + parseFloat(undertime);

      return {
        total: total.toFixed(2),
        regular: regular,
        overtime: overtime,
        undertime: undertime,
      };
    } catch (error) {
      return error.message;
    }
  };

  employeeDetails = async () => {
    try {
      const query =
        "SELECT rate.Value as rateValue FROM employee INNER JOIN employeetypes on employeetypes.id = employee.Type INNER JOIN employeeposition on employeeposition.id = employee.Position INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule where EmployeeID=?";
      const param = [this.#id];
      const result = await startQuery(query, param);
      return result[0].rateValue;
    } catch (error) {
      return error.message;
    }
  };

  employeeAttendance = async (target) => {
    try {
      const query =
        "select Date, Status, CASE WHEN WorkHours  > 300 then WorkHours -60 else WorkHours end from attendance where EmployeeID=? and Date >=? and Date <=? and DayType=? ";
      const param = [this.#id, this.#startDate, this.#endDate, target];
      const result = await startQuery(query, param);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  specialHoliday = async () => {
    try {
      let obj = [];
      const query =
        "select Date from attendance where EmployeeID=? and Date >=? and Date <=? ";
      const param = [this.#id, this.#startDate, this.#endDate];
      const result = await startQuery(query, param);
      result.forEach((data, i) => {
        if (this.specialHolidayChecker(data.Date).match) {
          obj.push({
            name: this.specialHolidayChecker(data.Date).name,
            date: this.specialHolidayChecker(data.Date).date,
            day: this.getDay(this.specialHolidayChecker(data.Date).date),
          });
        }
      });
      return { count: obj.length, holiday: obj };
    } catch (error) {
      return error.message;
    }
  };

  lastgrosspay = async () => {
    let gross;
    try {
      const query =
        "select Grosspay from payroll where EmployeeID = ? ORDER BY id DESC LIMIT 1";
      const result = await startQuery(query, [this.#id]);
      if (result.length == 0) {
        gross = "0";
      } else {
        gross = result[0].Grosspay;
      }
      return gross;
    } catch (error) {}
  };

  specialHolidayPay = async () => {
    try {
      let regular = 0;
      let overtime = 0;
      let undertime = 0;
      const attendance = await this.employeeAttendance("SpecialHoliday");
      const employee = await this.employeeDetails();
      attendance.forEach((data, i) => {
        const workingHrs = Math.floor(parseInt(data.Wrkhrs) / 60);
        if (
          this.getDay(data.Date) == "Sunday" ||
          this.getDay(data.Date) == "Saturday"
        ) {
          console.log("-----REST DAY-----");
          if (data.Status == "Regular") {
            regular += parseFloat(employee * 0.5);
            console.log(`REGULAR: ${workingHrs} == ${regular}`);
          }
          if (data.Status == "Overtime") {
            const res = (employee / 8) * 1.5 * 1.3 * (workingHrs - 8);
            overtime += res;
            console.log(`OVERTIME: ${workingHrs} == ${overtime}`);
          }
          if (data.Status == "Undertime") {
            const pay = (employee / 8) * 1.5 * workingHrs;
            undertime += pay;
            console.log(`UNDERTIME: ${workingHrs} == ${undertime}`);
          }
        } else {
          console.log("-----NOT REST DAY-----");
          if (data.Status == "Regular") {
            regular += parseFloat(employee * 0.3);
            console.log(`REGULAR: ${workingHrs} == ${regular}`);
          }

          if (data.Status == "Overtime") {
            const res = (employee / 8) * 1.3 * 1.3 * (workingHrs - 8);
            overtime += res;
            console.log(`OVERTIME: ${workingHrs} == ${overtime}`);
          }

          if (data.Status == "Undertime") {
            const pay = (employee / 8) * 1.3 * workingHrs;
            undertime += pay - employee;
            console.log(`UNDERTIME: ${workingHrs} == ${undertime}`);
            console.log(data);
          }
        }
      });
      const total =
        parseFloat(regular) + parseFloat(overtime) + parseFloat(undertime);
      return {
        total: total.toFixed(2),
        regular: regular,
        overtime: overtime,
        undertime: undertime,
      };
    } catch (error) {
      return error.message;
    }
  };

  regularHolidayChecker = (date) => {
    try {
      const data = process.env.HOLIDAYS;
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

  getDay(udate) {
    const date = new Date(udate);
    const options = { weekday: "long" };
    const dayName = date.toLocaleDateString("en-US", options);
    return dayName;
  }
}

module.exports = Payroll;
