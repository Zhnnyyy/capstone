const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Employee = require("./classes/employee");
const Attendance = require("./classes/attendance");
const Timesheet = require("./classes/timesheet");
const LeaveRequest = require("./classes/leaverequest");
const Items = require("./classes/dropdownitems");
const Scanner = require("./classes/scanner");
const Payrol = require("./classes/payroll");
const EmployeeAdjustment = require("./classes/payroll_salary_adjustment");
const Contributions = require("./classes/contribution");
const PayrollLogs = require("./classes/payroll_logs");
const Dashboard = require("./classes/dashboard");
const account = require("./classes/sysaccount");
const item = new Items();

//Mobile
const { loginUser } = require("./Mobile/Login");
const { attendanceLog } = require("./Mobile/Attendance");
const { loadItems } = require("./Mobile/LeaveDropdown");
const { sendReq } = require("./Mobile/sendRequest");
const PayrollMobile = require("./Mobile/Payroll");
const Mailer = require("./mail/mailer");
const { showRequest } = require("./Mobile/showRequest");
const { isHaveEmail } = require("./Mobile/verification");
const { setEmail } = require("./Mobile/addEmail");
const { setStatus } = require("./Mobile/accountStatus");
const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//DASHBOARD

app.post("/payroll/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const _account = new account(username, password);
    const result = await _account.validate();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const dashboard = new Dashboard();
    const result = await dashboard.DashboardDetails();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

// PAYROLL MANAGE EMPLOYEE

app.post("/employee/add", async (req, res) => {
  const { uid, fname, mname, lname, type, pos, suffix, rate, sched, status } =
    req.body;
  try {
    const employee = new Employee(
      uid,
      fname,
      mname,
      lname,
      type,
      pos,
      suffix,
      rate,
      sched,
      status
    );
    const validate = await employee.validate();
    if (validate) {
      // const employee = new Employee(
      //   uid,
      //   fname,
      //   mname,
      //   lname,
      //   type,
      //   pos,
      //   suffix,
      //   rate,
      //   sched,
      //   status
      // );
      const data = await employee.addEmployee();
      res.json(data);
    } else {
      res.json({ Error: true, msg: "Employee ID is existed" });
    }
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/update", async (req, res) => {
  const { uid, fname, mname, lname, type, pos, suffix, rate, sched, status } =
    req.body;
  try {
    const employee = new Employee(
      uid,
      fname,
      mname,
      lname,
      type,
      pos,
      suffix,
      rate,
      sched,
      status
    );
    const data = await employee.update();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/remove", async (req, res) => {
  try {
    const { uid } = req.body;
    const employee = new Employee(uid);
    const result = await employee.remove();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/information", async (req, res) => {
  const { uid } = req.body;
  try {
    const employee = new Employee(uid);
    const result = await employee.information();
    res.send(result);
  } catch (error) {}
});

app.get("/employee/list", async (req, res) => {
  try {
    const employee = new Employee();
    const result = await employee.show();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/list/filtered", async (req, res) => {
  try {
    const { id } = req.body;
    const employee = new Employee();
    const result = await employee.showfiltered(id);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/employee/positions", async (req, res) => {
  try {
    const result = await item.position();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.get("/employee/types", async (req, res) => {
  try {
    const result = await item.types();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.get("/employee/rates", async (req, res) => {
  try {
    const result = await item.rate();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.get("/employee/schedule", async (req, res) => {
  try {
    const result = await item.schedule();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.get("/employee/leavetypes", async (req, res) => {
  try {
    const result = await item.leavetypes();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/positions/add", async (req, res) => {
  const { name } = req.body;
  try {
    const addItem = new Items(name);
    const result = await addItem.addPosition();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/employee/types/add", async (req, res) => {
  const { name } = req.body;
  try {
    const addItem = new Items(name);
    const result = await addItem.addType();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/employee/rates/add", async (req, res) => {
  const { name, value } = req.body;
  try {
    const addItem = new Items(name, value);
    const result = await addItem.addRate();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/employee/schedule/add", async (req, res) => {
  const { name } = req.body;
  try {
    const addItem = new Items(name);
    const result = await addItem.addSchedule();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/leavetypes/add", async (req, res) => {
  const { name, value } = req.body;
  try {
    const addItem = new Items(name, value);
    const result = await addItem.addLeaveTypes();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/items/remove", async (req, res) => {
  const { name, value } = req.body;
  try {
    const addItem = new Items(name, value);
    const result = await addItem.removeItem();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//PAYROLL ATTENDANCE
app.get("/attendance", async (req, res) => {
  try {
    const attendance = new Attendance();
    const result = await attendance.show();
    res.json(result);
  } catch (error) {
    req.json(error.message);
  }
});

app.post("/attendance/filtered", async (req, res) => {
  try {
    const { date1, date2 } = req.body;
    const attendance = new Attendance(date1, date2);
    const result = await attendance.filtered();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/attendance/update", async (req, res) => {
  try {
    const { id, time1, time2, wrkhrs } = req.body;
    console.log(wrkhrs);
    const attendance = new Attendance();
    const result = await attendance.update(id, time1, time2, wrkhrs);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//PAYROLL REQUEST
app.get("/employee/request", async (req, res) => {
  try {
    const request = new LeaveRequest();
    const result = await request.show();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/employee/request/history", async (req, res) => {
  try {
    const request = new LeaveRequest();
    const result = await request.history();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/request/update", async (req, res) => {
  try {
    const { uid, status, date1, date2, employee } = req.body;
    const request = new LeaveRequest(uid, status, date1, date2, employee);
    const result = await request.update();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//PAYROLL TIMESHEET
app.get("/employee/timesheet", async (req, res) => {
  try {
    const timesheet = new Timesheet();
    const result = await timesheet.show();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/timesheet/filtered", async (req, res) => {
  try {
    const { id } = req.body;
    const timesheet = new Timesheet();
    const result = await timesheet.showfiltered(id);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/employee/timesheet/details", async (req, res) => {
  try {
    const { uid, date1, date2 } = req.body;
    const timesheet = new Timesheet(uid, date1, date2);
    const result = await timesheet.details();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/holidays", async (req, res) => {
  try {
    const timesheet = new Timesheet();
    const result = await timesheet.holidays();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//PAYROLL

app.get("/payroll/list", async (req, res) => {
  try {
    const employee = new Payrol();
    const result = await employee.showEmployee();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/employee/details", async (req, res) => {
  try {
    const { id, startdate, enddate, cutoff } = req.body;
    const payroll = new Payrol(id, startdate, enddate, cutoff);
    const result = await payroll.payroll();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/employee/adjustment", async (req, res) => {
  try {
    const { id, name, amount, cutoff, table, column } = req.body;
    const employee = new EmployeeAdjustment(
      id,
      name,
      amount,
      cutoff,
      table,
      column
    );
    const result = await employee.addItem();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/employee/show/adjustment", async (req, res) => {
  try {
    const { id, cutoff, table } = req.body;
    const employee = new EmployeeAdjustment(
      id,
      null,
      null,
      cutoff,
      table,
      null
    );
    const result = await employee.showItem();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/employee/delete/adjustment", async (req, res) => {
  try {
    const { id, table } = req.body;
    const employee = new EmployeeAdjustment(id, null, null, null, table);
    const result = await employee.deleteItem();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/make/payroll", async (req, res) => {
  try {
    const { cutoff, details } = req.body;
    const employee = new Payrol();
    const result = await employee.addPayroll(cutoff, details);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//PAYROLL LOGS
app.get("/payroll/logs", async (req, res) => {
  try {
    const payroll = new PayrollLogs();
    const result = await payroll.showCutoff();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/cutoff/logs", async (req, res) => {
  try {
    const { cutoff } = req.body;
    const payroll = new PayrollLogs(cutoff);
    const result = await payroll.showEmployeeCutoff();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/cutoff/delete", async (req, res) => {
  try {
    const { cutoff } = req.body;
    console.log(cutoff);
    const payroll = new PayrollLogs(cutoff);
    const result = await payroll.deleteCutoff();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//Contributions
app.get("/payroll/contributions", async (req, res) => {
  try {
    const contribution = new Contributions();
    const result = await contribution.show();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/contributions/update", async (req, res) => {
  try {
    const { sss, pagibig, philhealth } = req.body;
    const contribution = new Contributions(sss, philhealth, pagibig);
    const result = await contribution.update();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/payroll/contributions/show", async (req, res) => {
  try {
    const { target } = req.body;
    const contribution = new Contributions(null, null, null, target);
    const result = await contribution.getItem();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//Mobile EndPoint CLient
app.post("/mobile/validateUser", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/mobile/logout", async (req, res) => {
  const { ID } = req.body;
  try {
    const result = await setStatus(ID, "offline");
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/mobile/attendance", async (req, res) => {
  const { uid } = req.body;
  try {
    const result = await attendanceLog(uid);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/mobile/leave/types", async (req, res) => {
  try {
    const result = await loadItems();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/mobile/sendrequest", async (req, res) => {
  try {
    const { uid, startdate, enddate, type, reason } = req.body;
    const result = await sendReq(uid, startdate, enddate, type, reason);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/mobile/employee/request", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await showRequest(id);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//Mobile payroll
app.post("/mobile/payroll", async (req, res) => {
  try {
    const { id } = req.body;
    const payroll = new PayrollMobile(id);
    const result = await payroll.showCutoff();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/mobile/cutoff/details", async (req, res) => {
  try {
    const { id, cutoff, date } = req.body;
    const payroll = new PayrollMobile(id, cutoff, date);
    const result = await payroll.cutoffDetails();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

// Mobile OTP
app.post("/mobile/otp", async (req, res) => {
  try {
    const { email, body } = req.body;
    const _mail = new Mailer(email, body);
    const result = await _mail.sendCode();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/mobile/checkuser", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await isHaveEmail(id);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/mobile/setEmail", async (req, res) => {
  try {
    const { id, email, deviceid, pass } = req.body;
    const result = await setEmail(id, email, deviceid, pass);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/mobile/forgotpass", async (req, res) => {
  try {
    const { email, body } = req.body;
    const _mail = new Mailer(email, body);
    const result = await _mail.validation();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/mobile/forgotpass/new", async (req, res) => {
  try {
    const { uid, pass } = req.body;
    const _mail = new Mailer();
    const result = await _mail.changePassword(uid, pass);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
//Mobile Scanner

app.post("/scanner/timein", async (req, res) => {
  try {
    const { uid, date, time } = req.body;
    const validate = new Scanner(date, uid, time);
    const validateResult = await validate.validate("TimeIn");
    if (validateResult) {
      const timeIn = await validate.timein();
      res.json(timeIn);
    } else {
      res.json({ Error: true, msg: "You've already scanned your QRCode" });
    }
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/scanner/getTime", async (req, res) => {
  try {
    const { uid, date, time } = req.body;
    const scanner = new Scanner(date, uid, time);
    const result = await scanner.getTimeIn();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});
app.post("/scanner/timeout", async (req, res) => {
  try {
    const { uid, date, time, wrkhrs, status } = req.body;
    const validate = new Scanner(date, uid, time);
    const validateResult = await validate.validate("TimeOut");
    if (validateResult) {
      const timeOut = await validate.timeout(wrkhrs, status);
      res.json(timeOut);
    } else {
      res.json({ Error: true, msg: "You've already scanned your QRCode" });
    }
  } catch (error) {
    res.json(error.message);
  }
});

app.post("/scanner/device", async (req, res) => {
  try {
    const { deviceid, id } = req.body;
    const validate = new Scanner();
    const result = await validate.validateDevice(id, deviceid);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

// app.get("/mobile/cld", (req, res) => {
//   res.json({
//     login: "https://server-ywyf.onrender.com/mobile/validateUser",
//     attendance: "https://server-ywyf.onrender.com/mobile/attendance",
//     sendRequest: "https://server-ywyf.onrender.com/mobile/sendrequest",
//     loadItem: "https://server-ywyf.onrender.com/mobile/leave/types",
//     payrollCutoff: "https://server-ywyf.onrender.com/mobile/payroll",
//     cutoffdetails: "https://server-ywyf.onrender.com/mobile/cutoff/details",
//     showReqHistory: "https://server-ywyf.onrender.com/mobile/employee/request",

//     otp: "https://server-ywyf.onrender.com/mobile/otp",
//     checkUserEmail: "https://server-ywyf.onrender.com/mobile/checkuser",
//     addEmail: "https://server-ywyf.onrender.com/mobile/setEmail",
//     forgotpassword: "https://server-ywyf.onrender.com/mobile/forgotpass",
//     logout: "https://server-ywyf.onrender.com/mobile/logout",
//   });
// });

app.listen(port, () => {
  console.log("Running on port:", port);
});
