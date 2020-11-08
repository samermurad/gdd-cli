#!/usr/bin/env node 
require('yargs')(process.argv.slice(2))
.commandDir('cmds')
.help()
.describe('Godaddy domains api cli')
.argv

