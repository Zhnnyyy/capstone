const { startQuery } = require("../database/config");
class Items {
  #name;
  #value;
  constructor(name, value) {
    this.#name = name;
    this.#value = value;
  }

  position = async () => {
    try {
      const query = "select * from employeeposition";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  rate = async () => {
    try {
      const query = `SELECT * FROM rate`;
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  schedule = async () => {
    try {
      const query = `SELECT * FROM schedule`;
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  types = async () => {
    try {
      const query = "select * from employeetypes";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  leavetypes = async () => {
    try {
      const query = "select * from leavetypes";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  addType = async () => {
    try {
      const query = "insert into employeetypes(Type) values(?)";
      const param = [this.#name];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  addPosition = async () => {
    try {
      const query = "insert into employeeposition(Position) values(?)";
      const param = [this.#name];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  addSchedule = async () => {
    try {
      const query = "insert into schedule(Schedule) values(?)";
      const param = [this.#name];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  addRate = async () => {
    try {
      const query = "insert into rate(Rate,Value) values(?,?)";
      const param = [this.#name, this.#value];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  addLeaveTypes = async () => {
    try {
      const query = "insert into leavetypes(Name,Credit) values(?,?)";
      const param = [this.#name, this.#value];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  removeItem = async () => {
    try {
      const query = `delete from ${this.#name} where id= ?`;
      const param = [this.#value];
      await startQuery(query, param);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };
}
module.exports = Items;
