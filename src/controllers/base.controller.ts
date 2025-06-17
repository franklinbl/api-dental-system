import { Model } from 'sequelize-typescript';
import { ModelStatic } from 'sequelize';

export const createBaseController = <T extends Model>(model: ModelStatic<T>) => ({
  findAll: async (req: any, res: any) => {
    try {
      const items = await model.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  findOne: async (req: any, res: any) => {
    try {
      const item = await model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ message: 'No encontrado' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  create: async (req: any, res: any) => {
    try {
      const item = await model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  update: async (req: any, res: any) => {
    try {
      const [affectedCount, affectedRows] = await model.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      if (!affectedCount) return res.status(404).json({ message: 'No encontrado' });
      res.json(affectedRows[0]);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  remove: async (req: any, res: any) => {
    try {
      const deleted = await model.destroy({
        where: { id: req.params.id },
      });

      if (!deleted) return res.status(404).json({ message: 'No encontrado' });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});
