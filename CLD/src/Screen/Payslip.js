import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";
import Myloader from "../Model/Myloader";
const Payslip = () => {
  const route = useRoute();
  const { cutoff, date, id } = route.params;
  const [loading, setloading] = useState(false);
  const [rate, setRate] = useState();
  const [workdays, setworkdays] = useState();
  const [leave, setLeave] = useState();
  const [undertime, setUndertime] = useState();
  const [basicpay, setbasicpay] = useState();
  const [overtimehrs, setovertimehrs] = useState();
  const [otRate, setOtrate] = useState();
  const [overtimepay, setovertimepay] = useState();
  const [regularholiday, setregularholiday] = useState();
  const [regularholidaypay, setregularholidaypay] = useState();
  const [specialholiday, setspecialholiday] = useState();
  const [specialholidaypay, setspecialholidaypay] = useState();
  const [holidayPay, setholidayPay] = useState();
  const [allowance, setallowance] = useState();
  const [salaryAdjustment, setsalaryAdjustment] = useState();
  const [totalearnings, settotalearnings] = useState();
  const [grosspay, setgrosspay] = useState();
  const [philhealth, setphilhealth] = useState();
  const [sss, setsss] = useState();
  const [pagibig, setpagibig] = useState();
  const [tax, settax] = useState();
  const [totalstatutory, setTotalstatutory] = useState();
  const [deduction, setdeduction] = useState();
  const [totaldeduction, settotaldeduction] = useState();
  const [netpay, setNetpay] = useState();
  const [name, setName] = useState();

  const data = {
    id: id,
    cutoff: cutoff,
    date: date,
  };

  Fetch(
    config.cutoffdetails,
    "POST",
    (result) => {
      if (result.loading) {
        if (loading == false) {
          // setloading(true);
        }
      }
      if (!result.loading) {
        // setloading(false);
        try {
          const raw = JSON.parse(result.data);
          const res = JSON.parse(result.data);
          const data = raw.details;
          setRate(data.Rate);
          setworkdays(data.WorkDays);
          setLeave(data.TotalLeave);
          setUndertime(data.Undertime);
          setbasicpay(data.BasicPay);
          setovertimehrs(data.OvertimeHrs);
          setovertimepay(data.OvertimePay);
          setOtrate(res.OTRate);
          setregularholiday(data.RegularHoliday);
          setregularholidaypay(data.RegularHolidayPay);
          setspecialholiday(data.SpecialHoliday);
          setspecialholidaypay(data.SpecialHolidayPay);
          setholidayPay(res.holidaypay);
          setallowance(data.Allowance);
          setsalaryAdjustment(data.SalaryAdjustment);
          settotalearnings(data.TotalEarnings);
          setgrosspay(data.Grosspay);
          setpagibig(data.PAGIBIG);
          setphilhealth(data.PHILHEALTH);
          setsss(data.SSS);
          settax(data.TAX);
          setTotalstatutory(res.statutory);
          setdeduction(data.Deduction);
          settotaldeduction(data.TotalDeduction);
          setNetpay(data.Netpay);
          setName(res.name);
          // setloading(false);
        } catch (error) {
          // setloading(false);
          console.error(error);
        }
      }
    },
    data
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Myloader visible={loading} />
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Payment Date</Text>
              <Text style={styles.text}>{date}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Employee ID</Text>
              <Text style={styles.text}>{id}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Employee Name</Text>
              <Text style={styles.text}>{name}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <Text style={styles.txtheader}>Payroll Period</Text>
            <Text style={styles.text}>{cutoff}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Rate</Text>
              <Text style={styles.text}>{rate}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>WorkDays</Text>
              <Text style={styles.text}>{workdays}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Leave</Text>
              <Text style={styles.text}>{leave}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Undertime</Text>
              <Text style={styles.text}>{undertime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Basic Pay</Text>
            <Text style={styles.smalltxtHeader}>{basicpay}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Overtime Hours</Text>
              <Text style={styles.text}>{overtimehrs}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Rate per hour</Text>
              <Text style={styles.text}>{otRate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Overtime</Text>
            <Text style={styles.smalltxtHeader}>{overtimepay}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Regular Holiday</Text>
              <Text style={styles.text}>{regularholiday}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Special Holiday</Text>
              <Text style={styles.text}>{specialholiday}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Regular Holiday Pay</Text>
              <Text style={styles.text}>{regularholidaypay}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Special Holiday Pay</Text>
              <Text style={styles.text}>{specialholidaypay}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Holiday </Text>
            <Text style={styles.smalltxtHeader}>{holidayPay}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Allowance</Text>
              <Text style={styles.text}>{allowance}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Salary Adjustment</Text>
              <Text style={styles.text}>{salaryAdjustment}</Text>
            </View>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Total Earnings</Text>
            <Text style={styles.smalltxtHeader}>{totalearnings}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Gross Pay</Text>
            <Text style={styles.smalltxtHeader}>{grosspay}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>PhilHealth</Text>
              <Text style={styles.text}>{philhealth}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>SSS</Text>
              <Text style={styles.text}>{sss}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>HDMF</Text>
              <Text style={styles.text}>{pagibig}</Text>
            </View>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>TAX</Text>
              <Text style={styles.text}>{tax}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Total</Text>
            <Text style={styles.smalltxtHeader}>{totalstatutory}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.infobox}>
          <View style={styles.box1}>
            <View style={styles.txtbox}>
              <Text style={styles.txtheader}>Deduction</Text>
              <Text style={styles.text}>{deduction}</Text>
            </View>
          </View>
          <View style={styles.box2}></View>
        </View>

        <View style={styles.myline}></View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Total Deduction</Text>
            <Text style={styles.smalltxtHeader}>{totaldeduction}</Text>
          </View>
        </View>
        <View style={styles.myline}></View>
        <View style={styles.bigHeader}>
          <View style={styles.subtxtbox}>
            <Text style={styles.bigtxtHeader}>Net Pay</Text>
            <Text style={styles.smalltxtHeader}>{netpay}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Payslip;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  bigHeader: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: 17,
  },
  bigtxtHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  smalltxtHeader: {
    fontSize: 14,
    fontWeight: "600",
  },
  txtheader: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 13,
    color: "#5a5451",
    fontWeight: "400",
  },
  infobox: {
    flexDirection: "row",
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 1,
  },
  txtbox: {
    marginBottom: 10,
  },
  subtxtbox: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  myline: {
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});
