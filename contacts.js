const fs = require("fs/promises");
const { v4 } = require("uuid");

const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removeContact = allContacts.find((item) => item.id === contactId);
  const newListContacts = allContacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newObject = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newObject));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
