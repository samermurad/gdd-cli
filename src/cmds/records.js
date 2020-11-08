const inquiries = require('../utils/inquiries');
const api = require('../api/api');
exports.command = 'records <command>'

exports.desc = 'Manga records for domains'
const domainMiddlware = async (argv) => {
    if (!argv.domain) {
        const domains = await api.getDomains()
        const domain = await inquiries.chooseDomain(domains);
        return { domain }
    }
    return {}
}
exports.builder = function (yargs) {
    return yargs
            .option('domain', { alias: 'd' })
            .middleware(domainMiddlware)
            .commandDir('recordsCmds');
}

exports.handler = function(argv) {}