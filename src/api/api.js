const axios = require('axios')
const path = require('path');
const settings = require('../config/settings')

const client = axios.create({
    baseURL: 'https://api.godaddy.com/v1',
    headers: {
        Authorization: `sso-key ${settings.apiToken}`
    }
})
exports.fetchIpV4 = async () => {
    const { data } = await axios('https://ipv4.wtfismyip.com/text', { responseType: 'string' })
    return data
}

exports.sendTelegramMessage = async (text) => {
    const token = settings.telegramBotToken
    const { data } = await axios(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
            chat_id: settings.telegramChatId,
            text,
        }
    })
    return data;
}

exports.getDomains = async () => {
    const { data } = await client({
        url: '/domains', 
        method: 'GET'
    });
    return data;
}

/**
 * 
 * @param {String} domain 
 * @param {String} [recordType]
 * @param {String} [hostName] 
 */
exports.getDomainRecords = async (domain, recordType, hostName) => {
    let drilldown = '/'
    if (recordType) {
        drilldown = path.join(drilldown, recordType)
        if (hostName) drilldown = path.join(drilldown, hostName)
    }
    const { data } = await client({
        url: `/domains/${domain}/records${drilldown}`,
        method: 'GET'
    });
    return data;
}
// https://api.godaddy.com/v1/domains/${mydomain}/records/A/${myhostname}

exports.getARecord = async (domain, hostname) => {
    const url = `/domains/${domain}/records/A/${hostname}`;
    const { data } = await client({
        url,
        method: 'GET'
    })
    return data
}
exports.setARecord = async (domain, hostname, ip) => {
    const url = `/domains/${domain}/records/A/${hostname}`;
    const { data } = await client({
        url,
        method: 'PUT',
        data: [{ data: ip }],
    })
    return data
}