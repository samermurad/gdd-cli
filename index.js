const api = require('./src/api/api')
const inquiries = require('./src/utils/inquiries');
const database = require('./src/config/database');
async function main() {
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

if (process.argv[1] == __filename) {
    main()
    .then(() => console.log('done'))
    .catch(console.log)
}
