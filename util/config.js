let config = {}

config.headers ={
  headers: {
    "User-Agent": "axios",
  },
}
config.endpoint = "https://cdn-api.co-vin.in/api";
config.states = config.endpoint + "/v2/admin/location/states"
config.districts = config.endpoint + "/v2/admin/location/districts/"
config.findByPin =  config.endpoint  + "/v2/appointment/sessions/public/findByPin"
config.findByDistrict =  config.endpoint  + "/v2/appointment/sessions/public/findByDistrict"
config.calendarByCenter =  config.endpoint  + "/v2/appointment/sessions/public/calendarByCenter"



config.TableOptions = {
  borderStyle: "solid",
  borderColor: "blue",
  headerAlign: "center",
  align: "left",
  color: "white",
  truncate: "...",
  width: "90%"
}

module.exports = config