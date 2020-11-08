const api = require('../api/api');
const inquiries = require('../utils/inquiries');
exports.command = ['serve', '$0'];

exports.describe = 'Program';

exports.builder = {};

exports.handler = async (argv) => {
    console.log(await api.fetchIpV4())
    const domains = await api.getDomains()
    
    console.log(domains.map(
        ({ domain, domainId }) => {
            return {
                domain,
                domainId,
            }
        }
    ))
    const result = await inquiries.chooseDomain(domains);
    console.log('you chose', result);
    const records = await api.getDomainRecords(result, 'A', '*');
    console.log(records);
}