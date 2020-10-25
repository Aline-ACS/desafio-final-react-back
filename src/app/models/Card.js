import Sequelize, { Model } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        date: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        hour: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        user_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_uid',
    });
  }
}

export default Card;
