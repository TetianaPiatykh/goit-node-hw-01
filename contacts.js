
const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async() => {
    const result = await fs.readFile(contactsPath);

    return JSON.parse(result);
};

const get = async (id) => {
     const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
};

const add = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
};

const remove = async (id) => {
    const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

module.exports = {
    listContacts,
    get,
    add,
    remove
};
