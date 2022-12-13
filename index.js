const { program } = require('commander');

const contacts = require('./contacts');

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case 'list':
            const contactsList = await contacts.listContacts();
            console.table(contactsList);
            break;
        case 'get':
            const oneContact = await contacts.get(id);
            console.table(oneContact);
            break;
        case 'add':
            const newContact = await contacts.add({name, email, phone});
            console.table(newContact);
            break;
        case 'remove':
            const removeContact = await contacts.remove(id);
            console.table(removeContact);
            break;
        default:
            console.log('Unknown action')
    }
};

program
    .option('-a, --action <type>')
    .option('-i, --id <type>')
    .option('-n, --name <type>')
    .option('-e, --email <type>')
    .option('-p, --phone <type>')

program.parse();

const options = program.opts();

invokeAction(options);
