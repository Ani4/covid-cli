const axios = require("axios");
const chalk = require("chalk");
const Table = require("tty-table")

const config = require("../util/config")

let districts = {}

districts.getByState = (state_id) => {
    axios
        .get(config.districts + state_id , config.headers)
        .then((result) => {
          let TableHeader = [{
            value: "district_id",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 20
          },{
            value: "district_name",
            headerColor: "cyan",
            color: "green",
            align: "left",
            width: 40
          },]
          console.log(chalk.bold.red(" ------------------------------------------------"))
          console.log(chalk.bold.magenta("          Avaliable Districts of : ", state_id ))
          console.log(chalk.bold.red(" ------------------------------------------------"))
          const out = Table(TableHeader,result.data.districts,config.TableOptions).render()
          console.log(out);
        })
        .catch((err) => console.log(err));
};

module.exports = districts;