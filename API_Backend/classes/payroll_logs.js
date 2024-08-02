const { startQuery } = require("../database/config");

class PayrollLogs {
  #cutoff;
  constructor(cutoff) {
    this.#cutoff = cutoff;
  }

  showCutoff = async () => {
    try {
      const query =
        "select DISTINCT Cutoff, Created from payroll ORDER BY Created DESC";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  showEmployeeCutoff = async () => {
    try {
      const query =
        "SELECT payroll.id, payroll.EmployeeID, CONCAT(employee.Lastname, ' ', employee.Firstname) AS Name, payroll.Cutoff, payroll.Created, payroll.WorkDays, payroll.Rate, payroll.Undertime, payroll.TotalLeave, payroll.BasicPay, payroll.RegularHoliday, payroll.SpecialHoliday, payroll.RegularHolidayPay, payroll.SpecialHolidayPay,payroll.OvertimeHrs, payroll.OvertimePay, payroll.Allowance, payroll.SalaryAdjustment, payroll.TotalEarnings, payroll.Grosspay, payroll.PAGIBIG, payroll.PHILHEALTH, payroll.SSS, payroll.TAX, payroll.Deduction, payroll.TotalDeduction, payroll.Netpay FROM payroll INNER JOIN employee ON employee.EmployeeID = payroll.EmployeeID WHERE payroll.Cutoff= ? ORDER BY employee.Lastname ASC ";
      const result = await startQuery(query, [this.#cutoff]);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  deleteCutoff = async () => {
    try {
      const query = "DELETE FROM `payroll` WHERE Cutoff=?";
      await startQuery(query, [this.#cutoff]);
      return { Error: false };
    } catch (error) {
      return { Error: false, msg: error.message };
    }
  };
}
module.exports = PayrollLogs;
