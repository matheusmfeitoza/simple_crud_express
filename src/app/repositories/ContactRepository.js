const { randomUUID } = require('node:crypto');

let contacts = [{
  id: randomUUID(),
  name: 'Matheus Marinho',
  email: 'matheus.marinho@defensoria.mg.def.br',
  phone: '1234556',
  category: randomUUID(),
}];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  save(body) {
    const {
      name, email, phone, category,
    } = body;
    contacts.push({
      id: randomUUID(),
      name,
      email,
      phone,
      category,
    });
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  update({
    id, name, email, phone, category,
  }) {
    const updatedUser = {
      id,
      name,
      email,
      phone,
      category,
    };
    contacts = contacts.map((contact) => (contact.id === id ? updatedUser : contact));
    return new Promise((resolve) => {
      resolve(updatedUser);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
