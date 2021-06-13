const axios = require("axios");
const chalk = require("chalk");
const Table = require("tty-table")

const config = require("../util/config")

let states = {}

states.getAllState = () => {
    axios
        .get(config.states, config.headers)
        .then((result) => {
          let TableHeader = [{
            value: "state_id",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 20
          },
          {
            value: "state_name",
            color: "green",
            width: 40 ,
          }]
          console.log(chalk.bold.red(" ------------------------------------------------"))
            console.log(chalk.bold.magenta("          Avaliable States "))
            console.log(chalk.bold.red(" ------------------------------------------------"))
          const out = Table(TableHeader,result.data.states,config.TableOptions).render()
          console.log(out);
        })
        .catch((err) => console.log(err));
};

module.exports = states;