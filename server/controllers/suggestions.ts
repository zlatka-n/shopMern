import { Request, Response } from 'express';
const db = require('../db/conn');
var url = require('url');

const getSuggestions = (req: Request, res: Response) => {
  const keyword = req.query.keyword;
  const limit = Number(req.query.limit) ?? 10;

  db.getProductsCollection()
    .find({ title: { $regex: `\\b${keyword}`, $options: 'i' } })
    .limit(limit)
    .toArray((err: Error, suggestions: any) => {
      if (err)
        return res
          .status(404)
          .send({ status: '404', message: 'Product not found' });

      return res.json(suggestions);
    });
};

module.exports = { getSuggestions };
