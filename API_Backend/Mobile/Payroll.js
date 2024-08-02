const { startQuery } = require("../database/config");

class PayrollMobile {
  #id;
  #cutoff;
  #date;
  constructor(uid, cutoff, date) {
    this.#id = uid;
    this.#cutoff = cutoff;
    this.#date = date;
  }

  showCutoff = async () => {
    try {
      const query =
        "SELECT Cutoff, Created FROM `payroll` WHERE EmployeeID = ? order by id desc";
      const result = await startQuery(query, [this.#id]);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  cutoffDetails = async () => {
    try {
      const query =
        "SELECT * FROM `payroll` INNER JOIN employee on employee.EmployeeID = payroll.EmployeeID WHERE Cutoff=? and Created = ? and payroll.EmployeeID=?";
      const param = [this.#cutoff, this.#date, this.#id];
      const result = await startQuery(query, param);
      const data = result[0];
      const otRate = `₱ ${data.Rate.replace(/₱/g, "") / 8}`;
      const holidaypay = `₱ ${
        parseFloat(data.RegularHolidayPay.replace(/₱/g, "")) +
        parseFloat(data.SpecialHolidayPay.replace(/₱/g, ""))
      }`;
      const statutory = `₱ ${
        parseFloat(data.PAGIBIG.replace(/₱/g, "")) +
        parseFloat(data.SSS.replace(/₱/g, "")) +
        parseFloat(data.TAX.replace(/₱/g, "")) +
        parseFloat(data.PHILHEALTH.replace(/₱/g, ""))
      }`;
      const name = `${data.Firstname} ${data.Lastname}`;
      return {
        OTRate: otRate,
        holidaypay: holidaypay,
        statutory: statutory,
        name: name,
        details: data,
      };
    } catch (error) {
      return error.message;
    }
  };
}
module.exports = PayrollMobile;
