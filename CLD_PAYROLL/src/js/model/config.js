const config = {
  showEmployee: "https://capstone-server-teal.vercel.app//employee/list",
  showEmployeefiltered:
    "https://capstone-server-teal.vercel.app//employee/list/filtered",
  showTypes: "https://capstone-server-teal.vercel.app//employee/types",
  showPos: "https://capstone-server-teal.vercel.app//employee/positions",
  showRates: "https://capstone-server-teal.vercel.app//employee/rates",
  showSched: "https://capstone-server-teal.vercel.app//employee/schedule",
  addTypes: "https://capstone-server-teal.vercel.app//employee/types/add",
  addPosition:
    "https://capstone-server-teal.vercel.app//employee/positions/add",
  addRate: "https://capstone-server-teal.vercel.app//employee/rates/add",
  addSchedule: "https://capstone-server-teal.vercel.app//employee/schedule/add",
  addEmployee: "https://capstone-server-teal.vercel.app//employee/add",
  removeDropdown:
    "https://capstone-server-teal.vercel.app//employee/items/remove",
  editEmployee: "https://capstone-server-teal.vercel.app//employee/update",
  removeEmployee: "https://capstone-server-teal.vercel.app//employee/remove",
  showAttendance: "https://capstone-server-teal.vercel.app//attendance",
  filteredAttendance:
    "https://capstone-server-teal.vercel.app//attendance/filtered",
  employeeRequest: "https://capstone-server-teal.vercel.app//employee/request",
  updateRequest:
    "https://capstone-server-teal.vercel.app//employee/request/update",
  timesheetEmployee:
    "https://capstone-server-teal.vercel.app//employee/timesheet",
  timesheetEmployeeFiltered:
    "https://capstone-server-teal.vercel.app//employee/timesheet/filtered",
  timesheetDetails:
    "https://capstone-server-teal.vercel.app//employee/timesheet/details",
  holidays: "https://capstone-server-teal.vercel.app//holidays",
  payroll: "https://capstone-server-teal.vercel.app//payroll/employee/details",
  payrollAdjustment:
    "https://capstone-server-teal.vercel.app//payroll/employee/adjustment",
  showPayrollAdjustment:
    "https://capstone-server-teal.vercel.app//payroll/employee/show/adjustment",
  payrollDeleteAdjustment:
    "https://capstone-server-teal.vercel.app//payroll/employee/delete/adjustment",
  showContributions:
    "https://capstone-server-teal.vercel.app//payroll/contributions",
  updateContributions:
    "https://capstone-server-teal.vercel.app//payroll/contributions/update",
  getContribution:
    "https://capstone-server-teal.vercel.app//payroll/contributions/show",
  addPayroll: "https://capstone-server-teal.vercel.app//make/payroll",
  payrollLogs: "https://capstone-server-teal.vercel.app//payroll/logs",
  payrollEmployee: "https://capstone-server-teal.vercel.app//payroll/list",
  payrollCutoffLogs:
    "https://capstone-server-teal.vercel.app//payroll/cutoff/logs",
  deleteCutoff:
    "https://capstone-server-teal.vercel.app//payroll/cutoff/delete",
  requesthistory:
    "https://capstone-server-teal.vercel.app//employee/request/history",
  dashboardDetails: "https://capstone-server-teal.vercel.app//dashboard",
  updateAttendance:
    "https://capstone-server-teal.vercel.app//attendance/update",
  showLeavetypes:
    "https://capstone-server-teal.vercel.app//employee/leavetypes",
  addLeaveTypes:
    "https://capstone-server-teal.vercel.app//employee/leavetypes/add",
  changeEmployeePass:
    "https://capstone-server-teal.vercel.app//mobile/forgotpass/new",
  employeeInfo: "https://capstone-server-teal.vercel.app//employee/information",
  login: "https://capstone-server-teal.vercel.app//payroll/login",
};

// const config = {
//   showEmployee: "http://localhost:3000/employee/list",
//   showEmployeefiltered: "http://localhost:3000/employee/list/filtered",
//   showTypes: "http://localhost:3000/employee/types",
//   showPos: "http://localhost:3000/employee/positions",
//   showRates: "http://localhost:3000/employee/rates",
//   showSched: "http://localhost:3000/employee/schedule",
//   addTypes: "http://localhost:3000/employee/types/add",
//   addPosition: "http://localhost:3000/employee/positions/add",
//   addRate: "http://localhost:3000/employee/rates/add",
//   addSchedule: "http://localhost:3000/employee/schedule/add",
//   addEmployee: "http://localhost:3000/employee/add",
//   removeDropdown: "http://localhost:3000/employee/items/remove",
//   editEmployee: "http://localhost:3000/employee/update",
//   removeEmployee: "http://localhost:3000/employee/remove",
//   showAttendance: "http://localhost:3000/attendance",
//   filteredAttendance: "http://localhost:3000/attendance/filtered",
//   employeeRequest: "http://localhost:3000/employee/request",
//   updateRequest: "http://localhost:3000/employee/request/update",
//   timesheetEmployee: "http://localhost:3000/employee/timesheet",
//   timesheetEmployeeFiltered:
//     "http://localhost:3000/employee/timesheet/filtered",
//   timesheetDetails: "http://localhost:3000/employee/timesheet/details",
//   holidays: "http://localhost:3000/holidays",
//   payroll: "http://localhost:3000/payroll/employee/details",
//   payrollAdjustment: "http://localhost:3000/payroll/employee/adjustment",
//   showPayrollAdjustment:
//     "http://localhost:3000/payroll/employee/show/adjustment",
//   payrollDeleteAdjustment:
//     "http://localhost:3000/payroll/employee/delete/adjustment",
//   showContributions: "http://localhost:3000/payroll/contributions",
//   updateContributions: "http://localhost:3000/payroll/contributions/update",
//   getContribution: "http://localhost:3000/payroll/contributions/show",
//   addPayroll: "http://localhost:3000/make/payroll",
//   payrollLogs: "http://localhost:3000/payroll/logs",
//   payrollEmployee: "http://localhost:3000/payroll/list",
//   payrollCutoffLogs: "http://localhost:3000/payroll/cutoff/logs",
//   deleteCutoff: "http://localhost:3000/payroll/cutoff/delete",
//   requesthistory: "http://localhost:3000/employee/request/history",
//   dashboardDetails: "http://localhost:3000/dashboard",
//   updateAttendance: "http://localhost:3000/attendance/update",
//   showLeavetypes: "http://localhost:3000/employee/leavetypes",
//   addLeaveTypes: "http://localhost:3000/employee/leavetypes/add",
//   changeEmployeePass: "http://localhost:3000/mobile/forgotpass/new",
//   employeeInfo: "http://localhost:3000/employee/information",
//   login: "http://localhost:3000/payroll/login",
// };

export default config;
