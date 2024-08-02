const { startQuery } = require("../database/config");

class Contributions {
  #SSS;
  #PHILHEALTH;
  #PAGIBIG;
  #target;
  constructor(sss, philhealth, pagibig, target) {
    this.#SSS = sss;
    this.#PHILHEALTH = philhealth;
    this.#PAGIBIG = pagibig;
    this.#target = target;
  }

  show = async () => {
    try {
      const query = "select * from contributions";
      const result = await startQuery(query);
      return result;
    } catch (error) {
      return error.message;
    }
  };
  getItem = async () => {
    try {
      const trigger = this.#target;
      const query = `SELECT Value FROM contributions WHERE Name='${trigger}'`;
      const result = await startQuery(query);
      return result[0].Value;
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  update = async () => {
    try {
      await startQuery("START TRANSACTION");
      const q1 = "update contributions set Value=? where Name='SSS'";
      await startQuery(q1, this.#SSS);
      const q2 = "update contributions set Value=? where Name='PAGIBIG'";
      await startQuery(q2, this.#PAGIBIG);
      const q3 = "update contributions set Value=? where Name='PHILHEALTH'";
      await startQuery(q3, this.#PHILHEALTH);
      await startQuery("COMMIT");
      return { Error: false };
    } catch (error) {
      await startQuery("ROLLBACK");
      return { Error: true, msg: error.message };
    }
  };
}
module.exports = Contributions;
