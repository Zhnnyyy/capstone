const { startQuery } = require("../database/config");

const loadItems = async () => {
  try {
    const query = "select * from leavetypes";
    const result = await startQuery(query);
    const data = [];
    for (let i = 0; i < result.length; i++) {
      let obj = { key: result[i].id, value: result[i].Name };
      data.push(obj);
    }
    return data;
  } catch (error) {
    return { Error: true, msg: error.message };
  }
};
module.exports = { loadItems };
