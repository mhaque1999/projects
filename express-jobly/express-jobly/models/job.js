"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Job {
  /** Create a job (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create(jobData) {

    const result = await db.query(
          `INSERT INTO jobs (title,
                             salary,
                             equity,
                             company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle`,
        [
          jobData.title,
          jobData.salary,
          jobData.equity,
          jobData.company_handle,
          logoUrl,
        ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll() {
    let jobsRes = await db.query(`SELECT jobs.id,
                    jobs.title,
                    jobs.salary,
                    jobs.equity,
                    jobs.company_handle,
                    companies.name FROM jobs LEFT JOIN companies 
                    ON companies.handle = jobs.company_handle`);
    return jobsRes.rows;
  }

  /** Given a job, return data about the job.
   *
   * Returns {  id, title, salary, equity, companyHandle, company }
   *   where company is [{ handle, name, description, numEmployees, logoUrl }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobRes = await db.query(
        `SELECT id,
                title,
                salary,
                equity,
                company_handle AS "companyHandle"
         FROM jobs
         WHERE id = $1`, [id]);

  const job = jobRes.rows[0];

  if (!job) throw new NotFoundError(`No job: ${id}`);

  const companiesRes = await db.query(
        `SELECT handle,
                name,
                description,
                num_employees,
                logo_url
                FROM companies WHERE handle = $1`, [job.companyHandle]);

    job.company = companiesRes.rows[0];

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity,
                                company_handle`;
    const result = await db.query(querySql, [...values, id]);
    const company = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return company;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
        [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);
      }
    }
    
module.exports = Job;
