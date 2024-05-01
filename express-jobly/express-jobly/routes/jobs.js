"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, adminUser } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = express.Router();


/** POST / { job } => { job }
 * Returns { id, title, salary, equity, companyHandle }
 */

router.post("/", adminUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, jobNewSchema);

    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } 
  catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
 */

router.get("/", async function (req, res, next) {
  const query = req.query;
  if (query.minSalary !== undefined) query.minSalary = +query.minSalary;
  if (query.hasEquity === "true"){
    query.hasEquity = true;
  }
  else{
    query.hasEquity = false;
  }

  try {
    const jobs = await Job.findAll();
    return res.json({ jobs });
  } 
  catch (err) {
    return next(err);
  }
});

/** GET /[jobId] => { job }
 * Returns { id, title, salary, equity, company }
 *   where company is { handle, name, description, numEmployees, logoUrl }
 */

router.get("/:id", async function (req, res, next) {
  try {
    const job = await Job.get(req.params.id);
    return res.json({ job });
  } 
  catch (err) {
    return next(err);
  }
});


/** PATCH /[jobId]
 *
 * Returns { id, title, salary, equity, companyHandle }
 */

router.patch("/:id", adminUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, jobUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const job = await Job.update(req.params.id, req.body);
    return res.json({job});
  } 
  catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 */

router.delete("/:id", adminUser, async function (req, res, next) {
  try {
    await Job.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } 
  catch (err) {
    return next(err);
  }
});


module.exports = router;
