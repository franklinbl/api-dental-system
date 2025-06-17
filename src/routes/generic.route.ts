import { Router } from 'express';
import { Request, Response } from 'express';
import { Model } from 'sequelize-typescript';

export const createGenericRoute = (model: typeof Model, path: string) => {
  const router = Router();

  const controller = require('../controllers/base.controller').createBaseController(model);

  // Rutas
  router.get('/', controller.findAll);
  router.get('/:id', controller.findOne);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return { router, path };
};