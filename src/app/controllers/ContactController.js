const ContactsRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    // Listar um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found' });
    }
    response.json(contact);
  }

  async store(request, response) {
    // Criar um novo registro
    const {
      name, email, phone, category,
    } = request.body;

    if (!name) {
      return response.status(409).json({ error: 'Name is required!' });
    }

    const existContact = await ContactsRepository.findByEmail(email);

    if (existContact) {
      return response.status(409).json({ error: 'Email already exists' });
    }

    const userRegistred = await ContactsRepository.save({
      name, email, phone, category,
    });
    response.json({ data: userRegistred, message: 'User saved with success' });
  }

  async update(request, response) {
    // Atualizar um registro
    const { id } = request.params;
    const {
      name, email, phone, category,
    } = request.body;

    if (!name) {
      return response.status(409).json({ error: 'Nome is required!' });
    }
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found' });
    }
    const userEmailExists = await ContactsRepository.findByEmail(email);

    if (userEmailExists && id !== userEmailExists.id) {
      return response.status(404).json('This email alread exists in database');
    }
    const userUpdated = await ContactsRepository.update({
      id,
      name,
      email,
      phone,
      category,
    });
    response.json({ data: userUpdated, message: 'User has been updated' });
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found' });
    }

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}
module.exports = new ContactController();
