exports.command = 'set <record> <hostname>';
exports.desc = 'set record rule for doamin';

exports.handler = async (argv) => {
    console.log(argv.domain);
    console.log('really?')
}