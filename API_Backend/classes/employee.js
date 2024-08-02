const { startQuery } = require("../database/config");
const mysql = require("mysql2");
const crypto = require("crypto");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.user,
  port: process.env.port,
  password: process.env.pass,
  database: process.env.db,
});
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "clddigitals",
// });

const getConnectionFromPool = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

const startTransaction = async (connection) => {
  return await startQuery("START TRANSACTION;", [], connection);
};

const commitTransaction = async (connection) => {
  return await startQuery("COMMIT;", [], connection);
};

const rollbackTransaction = async (connection) => {
  return await startQuery("ROLLBACK;", [], connection);
};

function encrypt(inputString) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  const encryptedString = hash.digest("hex");
  return encryptedString;
}
class Employee {
  #UID;
  #fname;
  #mname;
  #lname;
  #suffix;
  #type;
  #pos;
  #rate;
  #sched;
  #status;
  constructor(
    UID,
    fname,
    mname,
    lname,
    type,
    pos,
    suffix,
    rate,
    sched,
    status
  ) {
    this.#UID = UID;
    this.#fname = fname;
    this.#mname = mname;
    this.#lname = lname;
    this.#suffix = suffix;
    this.#type = type;
    this.#pos = pos;
    this.#rate = rate;
    this.#sched = sched;
    this.#status = status;
  }
  validate = async () => {
    try {
      const query = "select count(*) as count from employee where EmployeeID=?";
      const result = await startQuery(query, [this.#UID]);
      const count = result[0].count;
      if (count == 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  currentDate = () => {
    return new Date().toISOString().substr(0, 10);
  };

  addEmployee = async () => {
    let connection;
    try {
      connection = await getConnectionFromPool();

      await startTransaction(connection);
      const query =
        "insert into employee(EmployeeID, Firstname, Middlename, Lastname, Type, Position,Suffix,EmployeeRate,EmployeeSchedule, DateHired,Status) values(?,?,?,?,?,?,?,?,?,?,?);";
      const params = [
        this.#UID,
        this.#fname,
        this.#mname,
        this.#lname,
        this.#type,
        this.#pos,
        this.#suffix,
        this.#rate,
        this.#sched,
        this.currentDate(),
        this.#status,
      ];
      await startQuery(query, params, connection);
      const query1 = "insert into account(EmployeeID,Password)values(?,?);";
      const params1 = [this.#UID, encrypt("clddigitals")];
      await startQuery(query1, params1, connection);
      await commitTransaction(connection);
      return { Error: false };
    } catch (error) {
      console.log(error.message);
      await rollbackTransaction(connection);
      return { Error: true, msg: `${error.message} HAHAHA` };
    }
  };

  update = async () => {
    try {
      const query =
        "UPDATE `employee` SET `Firstname`=?,`Middlename`=?,`Lastname`=?,`Suffix`=?,`Type`=?,`Position`=?,`EmployeeRate`=?,`EmployeeSchedule`=?, Status=? WHERE EmployeeID=?";
      const params = [
        this.#fname,
        this.#mname,
        this.#lname,
        this.#suffix,
        this.#type,
        this.#pos,
        this.#rate,
        this.#sched,
        this.#status,
        this.#UID,
      ];
      await startQuery(query, params);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  information = async () => {
    try {
      const query =
        "select * from employee inner join employeeposition on employeeposition.id = employee.Position inner join employeetypes on employeetypes.id = employee.Type INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule where EmployeeID=?";
      const result = await startQuery(query, [this.#UID]);
      return result;
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  show = async () => {
    try {
      const query =
        "SELECT EmployeeID, Firstname, Middlename, Lastname,Suffix, employeetypes.Type, employeeposition.Position, rate.Rate, rate.Value as rateValue, schedule.Schedule, employee.EmployeeRate as rateID, employee.EmployeeSchedule as schedID, employee.Type as TypeID, employee.Position as PositionID, Status FROM employee INNER JOIN employeetypes on employeetypes.id = employee.Type INNER JOIN employeeposition on employeeposition.id = employee.Position INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule ORDER BY employee.EmployeeID ASC, rate.Rate ASC";
      return await startQuery(query);
    } catch (error) {
      return error.message;
    }
  };

  showfiltered = async (id) => {
    try {
      const query = `SELECT EmployeeID, Firstname, Middlename, Lastname,Suffix, employeetypes.Type, employeeposition.Position, rate.Rate, rate.Value as rateValue, schedule.Schedule, employee.EmployeeRate as rateID, employee.EmployeeSchedule as schedID, employee.Type as TypeID, employee.Position as PositionID, Status FROM employee INNER JOIN employeetypes on employeetypes.id = employee.Type INNER JOIN employeeposition on employeeposition.id = employee.Position INNER JOIN rate on rate.id = employee.EmployeeRate INNER JOIN schedule on schedule.id = employee.EmployeeSchedule where EmployeeID like '%${id}%' ORDER BY employee.EmployeeID ASC, rate.Rate ASC`;
      return await startQuery(query);
    } catch (error) {
      return error.message;
    }
  };

  remove = async () => {
    try {
      const query = "delete from employee where EmployeeID=?";
      await startQuery(query, [this.#UID]);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };
}
module.exports = Employee;
