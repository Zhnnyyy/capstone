const { retail } = require("googleapis/build/src/apis/retail");
const { startQuery } = require("../database/config");

class EmployeeAdjustment {
  #id;
  #name;
  #amount;
  #cut_off;
  #table;
  #column;
  constructor(id, name, amount, cutoff, table, column) {
    this.#id = id;
    this.#name = name;
    this.#amount = amount;
    this.#cut_off = cutoff;
    this.#table = table;
    this.#column = column;
  }

  addItem = async () => {
    try {
      const query = `insert into ${this.#table}(EmployeeID,${
        this.#column
      }, Amount, CutOff)values(?,?,?,?)`;
      const param = [this.#id, this.#name, this.#amount, this.#cut_off];
      await startQuery(query, param);
      return { Error: false, msg: `${this.#column} has been added` };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  showItem = async () => {
    try {
      const query = `select * from ${
        this.#table
      } where EmployeeID=? and CutOff=?`;
      const param = [this.#id, this.#cut_off];
      const result = await startQuery(query, param);
      return { Error: false, data: result };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  deleteItem = async () => {
    try {
      const query = `delete from ${this.#table} where id=?`;
      const param = [this.#id];
      await startQuery(query, param);
      return { Error: false, msg: `${this.#table} has been deleted` };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };
}
module.exports = EmployeeAdjustment;
