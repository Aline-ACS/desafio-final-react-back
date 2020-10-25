import Sequelize from 'sequelize';
import 'dotenv/config';
import databaseConfig from '../config/database';

import Card from '../app/models/Card';
import User from '../app/models/User';

const models = [Card, User];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    console.log('iniciou banco');
    this.connection = new Sequelize(process.env.DATABASE_URL, databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new DataBase();
