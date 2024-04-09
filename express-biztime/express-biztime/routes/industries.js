const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res, next) => {
    try {
      const {code, industry} = req.body;
      const result = await db.query('INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry', [code, industry]);
      return res.status(201).json({ industry: result.rows[0] });

    } 
    catch (err) {
      return next(err);
    }
  });

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(" SELECT industries.code AS industry_code, industries.industry, ARRAY_AGG(company_industry.company_code) as companies FROM industries LEFT JOIN company_industry ON industries.code = company_industry.industry_code GROUP BY industries.code, industries.industry");
    console.log(result)
    return res.json({ industries: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.post('/:code', async (req, res, next) => { //post a industry code not the name
    try {
      const code = req.params.code;
      const industry = req.body.industry;
      const result = await db.query('INSERT INTO company_industry (company_code, industry_code) VALUES ($1, $2) RETURNING company_code, industry_code', [code, industry]);
      return res.status(201).json({ companyIndustry: result.rows[0] });
    } 
    catch (err) {
      return next(err);
    }
  });
 
  module.exports = router;