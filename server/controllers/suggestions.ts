import { Request, Response } from 'express';
const db = require('../db/conn');
var url = require('url');

const getSuggestions = (req: Request, res: Response) => {
  const keyword = req.query.keyword as string;
  const limit = Number(req.query.limit) ?? 10;

  db.getProductsCollection()
    .find({
      $or: [
        { title: { $regex: `\\b${keyword}`, $options: 'i' } },
        { author: { $regex: `\\b${keyword}`, $options: 'i' } },
      ],
    })
    .limit(limit)
    .toArray((err: Error, suggestions: any) => {
      const resultsMatchingKeyword = Array.from(
        new Set(
          suggestions.map((suggestion: any) => {
            const isKeywordInTitle = suggestion.title
              .toLowerCase()
              .includes(keyword.toLowerCase());

            return isKeywordInTitle ? suggestion.title : suggestion.author;
          })
        )
      );
      if (err)
        return res
          .status(404)
          .send({ status: '404', message: 'Product not found' });

      return res.json(resultsMatchingKeyword);
    });
};

module.exports = { getSuggestions };
