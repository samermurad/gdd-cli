const inquirer = require('inquirer')

const chooseDomain = async (domains) => {
    const names = domains.map(({ domain }) => domain);
    const { domain } = await inquirer.prompt({
        type: 'list',
        choices: names,
        name: 'domain',
    })
    return domain
}


module.exports = {
    chooseDomain,
}