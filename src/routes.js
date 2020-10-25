import { Router } from 'express';
import cors from 'cors';

import CardController from './app/controllers/CardController';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => {
  res.json({ result: 'teste API' });
});

// ROUTE AUTH
routes.post('/login', AuthController.store);

// ROUTES USERS
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

// routes.use(authMiddleware);

// ROUTES USERS (AUTH)
routes.get('/users/:uid', UserController.show);
routes.put('/users/:uid', UserController.update);

// ROUTES CARDS (AUTH)
routes.post('/cards', CardController.store);
routes.get('/cards/user/:uid', CardController.index);
routes.get('/cards/:uid', CardController.show);
routes.delete('/cards/:uid', CardController.delete);
routes.put('/cards/:uid', CardController.update);

export default routes;
