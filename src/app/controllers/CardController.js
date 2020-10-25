import Card from '../models/Card';
import User from '../models/User';

class CardController {
  async index(req, res) {
    try {
      const {uid} = req.params;

      const cards = await Card.findAll({
        where: {user_uid: uid},
        attributes: ['uid', 'title', 'content', 'date', 'hour'],
      });
      return res.json({ cards });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const card = await Card.findByPk(uid, {
        attributes: ['uid', 'title', 'content', 'date', 'hour'],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['uid', 'name'],
          },
        ],
      });
      return res.json({ card });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const created = await Card.create(req.body);
      return res.json({ created });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Card.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('erro ao atualizar dados');
      }

      return res.json({ result: 'dados atualizados com sucesso' });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Card.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('Erro ao deletar nota');
      }

      return res.json({ success:true, message: 'Nota deletada com sucesso' });
    } catch (error) {
      return res.json({ success: false, message:error });
    }
  }
}

export default new CardController();
