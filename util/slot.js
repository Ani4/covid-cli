const axios = require("axios")
const Table = require("tty-table")
const moment = require("moment")

const config = require("../util/config")

let slot = {}

slot.getByPin = (pin,date = moment().add(1,'days').format("DD-MM-YYYY")) => {
    axios
        .get(config.findByPin, {params:{pincode:pin, date:date},headers:config.headers})
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
          // const out = Table(TableHeader,result.data.slot,config.TableOptions).render()
          console.log(result.data.sessions[1]);
        })
        .catch((err) => console.log(err));
};

module.exports = slot;