#!/usr/bin/env node
const districts = require("../util/district");
const states = require("../util/state");
const slot = require("../util/slot");
const { Command } = require("commander");
const program = new Command();


program.command("state").description("List of state in India").action(states.getAllState);

program
    .command("district <state_id>")
    .description("List all the district present in given state_id ")
    .action((state_id) => {
        districts.getByState(state_id);
    });

program
    .command("slot")
    .description("Get slot on given pincode")
    .action(() => {
        slot.start();
    });

program.parse();

// states.getAllState()
// districts.getByState(16)

// slot.getByPin(853205)
