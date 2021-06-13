const axios = require("axios");
const chalk = require("chalk");
const Table = require("tty-table");
const moment = require("moment");
const inquirer = require("inquirer");
const config = require("../util/config");
let slot = {};

slot.start = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: chalk.redBright("select anyone :"),
                choices: [
                    { name: "find by pincode", value: 1 },
                ],
            },
            {
              type: "input",
              name: "pincode",
              message:"pincode",
          },
        ])
        .then((answers) => {
          console.log(chalk.bgYellowBright("WAITING"))
            switch (answers.choice) {
                case 1:
                   slot.getByPin(answers.pincode);
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(error);
            } else {
                console.log(error);
            }
        });
};

let sanatizedDatea = (data) => {
    let sdata = data.map((item) => {
        return {
            center_id: item.center_id,
            name: item.name,
            vaccine: item.vaccine,
            min_age_limit: item.min_age_limit,
            fee_type: item.fee_type,
            "doses_1/2": item.available_capacity_dose1 + "/" + item.available_capacity_dose2,
            available: item.available_capacity_dose1 + item.available_capacity_dose2 > 0 ? "YES" : "-",
            address: item?.block_name + " " + item?.district_name + " " + item?.state_name,
        };
    });

    return sdata;
};

slot.getByPin = (pin, date = moment().add(0, "days").format("DD-MM-YYYY")) => {
    axios
        .get(config.findByPin, { params: { pincode: pin, date: date }, headers: config.headers })
        .then((result) => {
            let state = result.data.sessions[0].state_name;
            let district = result.data.sessions[0].district_name;
            let TableHeader = [
                {
                    value: "center_id",
                    headerColor: "cyan",
                    color: "white",
                    align: "left",
                    width: 20,
                    align: "center",
                },
                {
                    value: "name",
                    color: "green",
                    width: 40,
                },
                {
                    value: "address",
                    color: "green",
                    width: 40,
                },
                {
                    value: "vaccine",
                    color: "green",
                    width: 20,
                    align: "center",
                },
                {
                    value: "doses_1/2",
                    color: "green",
                    width: 15,
                    align: "center",
                },
                {
                    value: "available",
                    color: "white",
                    width: 15,
                    align: "center",
                },
                {
                    value: "min_age_limit",
                    color: "green",
                    width: 15,
                    align: "center",
                },
                {
                    value: "fee_type",
                    color: "green",
                    width: 15,
                },
            ];

            console.log(chalk.bold.red(" ------------------------------------------------"));
            console.log(chalk.bold.magenta("          Avaliable Slot on : " + date));
            console.log(chalk.bold.green("          Pincode : " + pin));
            console.log(chalk.bold.blue("          District : " + district));
            console.log(chalk.bold.yellow("          State :  " + state));
            console.log(chalk.bold.red(" ------------------------------------------------"));
            const out = Table(TableHeader, sanatizedDatea(result.data.sessions), config.TableOptions).render();
            console.log(out);
        })
        .catch((err) => console.log(err));
};

module.exports = slot;
