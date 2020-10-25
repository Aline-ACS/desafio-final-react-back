import User from '../models/User';
import Card from '../models/Card';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['uid', 'name', 'email', 'phone'],
      });

      return res.json({ users });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const { email } = req.body;

      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        throw Error('usuário já cadastrado');
      }

      const user = await User.create(req.body);

      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.json({ error: 'Usuário não encontrado' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Senha Inválida' });
      }

      const { password } = await user.update(req.body);
      return res.json({ user: { uid, email, password } });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findByPk(uid, {
        attributes: ['uid', 'name', 'email', 'phone'],
        include: [
          {
            model: Card,
            as: 'cards',
            attributes: ['uid', 'title', 'content', 'date', 'hour'],
          },
        ],
      });

      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserController();
