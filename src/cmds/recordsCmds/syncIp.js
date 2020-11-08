const api = require('../../api/api');
const { DateTime } = require('luxon');

exports.command = 'sync-ip'

exports.desc = 'syncs current public IP wth specified domain';

exports.builder =  {
    hostnames: {
        required: true,
        type: 'array',
        alias: 'h'
    }
}

const cachedLog = {
    messages: [],
    log: function() {
        console.log.apply(console, arguments);
        this.messages.push(
            ([...arguments]).map((itm) => itm.toString()).join(' ')
        )
    }
}
const notifyUser = async (msg) => {
    await api.sendTelegramMessage(msg)
}
exports.handler = async function(argv) {
    if (!argv.domain) throw new Error('Domain must be set');
//     await api.sendTelegramMessage(`
//     Starting ip sync (${DateTime.local().toFormat('HH:mm dd-MM-y')})
//         domain: ${argv.domain}
//         hostnames:
// ${argv.hostnames.map((name) => `\t\t\t\t\t\t\t\t - "${name}"`).join('\n')}
//     `);
    cachedLog.log(`#ipSync-${argv.domain}\n\n`)
    cachedLog.log(`Dynamic IPv4 sync ${DateTime.local().toFormat('HH:mm dd-MM-y')}`)
    cachedLog.log('Domain:', argv.domain);
    cachedLog.log('hostnames to upate: ', argv.hostnames);
    const ip = (await api.fetchIpV4()).trim();
    const recordsToSync = [];
    cachedLog.log('current dynamic ip (cdi)', ip, '\n\n');
    for (const hostName of argv.hostnames) {
        const records = await api.getARecord(argv.domain, hostName);
        if (records.length > 0) {
            const record = records[0]
            if (record.data != ip) {
                cachedLog.log(`- Outdated entry: "${record.name}"`, record.data);
                recordsToSync.push([argv.domain, hostName, ip])
            } else {
                cachedLog.log(`- Entry "${record.name}" is up to date`);
            }
        } else {
            cachedLog.log(`- No records found for "${hostName}" a new one will be created and set to cdi`);
            recordsToSync.push([argv.domain, hostName, ip])
        }
    }
    if (recordsToSync.length > 0) {
        for (const enrty of recordsToSync) {
            const [d, h, i] = enrty;
            cachedLog.log(`setting ${h}.${d} to point to ${ip}`);
            try {
            await api.setARecord(d, h, i);
            } catch(error) {
                console.log(error.response.data);
            }
        }
    } else {
        console.log('Everything is up to date, no action needed');
    }
    await notifyUser(cachedLog.messages.join('\n'))
    // const atR = await api.getARecord(argv.domain, '@');
    // console.log(atR[0].data)
    // const atA = await api.getARecord(argv.domain, '*');
    // console.log(atA[0].data)
}