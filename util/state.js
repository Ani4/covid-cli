const axios = require("axios")
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
          const out = Table(TableHeader,result.data.states,config.TableOptions).render()
          console.log(out);
        })
        .catch((err) => console.log(err));
};

module.exports = states;