require("dotenv").config();
const nodemailer = require("nodemailer");
const { startQuery } = require("../database/config");
const crypto = require("crypto");
class Mailer {
  #email;
  #text;
  constructor(email, text) {
    this.#email = email;
    this.#text = text;
  }

  sendCode = async () => {
    const checker = await this.isValid();
    if (!checker) {
      const result = await this.sendOTP().then((res) => {
        return res;
      });
      return result;
    } else {
      return { Error: true, msg: "Email is existed" };
    }
  };

  sendOTP = () => {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: this.#email,
        subject: "CLD",
        text: this.#text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject({ Error: true, Message: error.message });
        } else {
          resolve({ Error: false });
        }
      });
    });
  };

  validation = async () => {
    if (await this.isValid()) {
      const employeeID = await this.getEmployeeID();
      const result = this.emailForgotPass(btoa(employeeID)).then((res) => {
        return res;
      });
      return result;
    } else {
      return { Error: true, msg: "Your email is not registered on the server" };
    }
  };

  getEmployeeID = async () => {
    try {
      const query = "select EmployeeID from account where email=?";
      const result = await startQuery(query, [this.#email]);
      return result[0].EmployeeID;
    } catch (error) {
      return error.message;
    }
  };

  isValid = async () => {
    try {
      const query = "select count(*) as count from account where email=?";
      const result = await startQuery(query, [this.#email]);
      if (result[0].count > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
  };

  encrypt(inputString) {
    const hash = crypto.createHash("sha256");
    hash.update(inputString);
    const encryptedString = hash.digest("hex");
    return encryptedString;
  }

  changePassword = async (eID, pass) => {
    try {
      const query = "update account set password=? where EmployeeID=?";
      await startQuery(query, [this.encrypt(pass), eID]);
      return { Error: false };
    } catch (error) {
      return { Error: true, msg: error.message };
    }
  };

  emailForgotPass = (body) => {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const url = `https://zhnnyyy.github.io/capstone_payroll/resetpassword.html?token=${body}`;
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: this.#email,
        subject: "CLD",
        html: `To reset your password <a href="${url}" target="_blank" r>Click Here</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject({ Error: true, Message: error.message });
        } else {
          resolve({ Error: false });
        }
      });
    });
  };
}

module.exports = Mailer;
