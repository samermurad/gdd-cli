# Godaddy API CLI
WORK IN PROGRESS

Cli utility for godaddy api, focusing mainly on domain records
update
cli can be run either interactively or as a command,
lacking to specify a certain needed option will instead
prompt user to specify needed arg/option

built using yargs

## Why?

I started this becuase I have a raspberrypi at home to with open ports to the net, but my internet provider only gives dynamic ips for private customers, so instead of writing a mini script that updates a specific subdomain, I decided to create an overkill godaddy cli, didn't even try to search for existing solutions.
so yay ¯\_(ツ)_/¯ 

# Needed Env vars
project loads .env file, this is temporary, future plan is to specify cli setup using a simple

```
API_TOKEN=<GODADDY_TOKEN:SECRET>
# sends logs to telegram bot, useful for conjuction with corntab usages/ dynamic ip sync
TL_CHAT_ID=<TELEGRAM_CHAT_ID>
TL_BOT_TOKEN=<TELEGRAM_BOT_TOKEN>
```
### Cmds

records sync ip
```
# syncs A records to public ip with specified hostnames and domain
$: gdns records sync-ip -h "@" "*" -d example.com
```

### LICENSE

MIT