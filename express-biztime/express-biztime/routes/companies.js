const express = require("express");
const router = new express.Router();
const db = require("../db");
const slugify = require("slugify");
const ExpressError = require("../expressError");


router.get("",async function(req, res, next) {
    try{
        const results = await db.query("select * from companies");

        return res.status(201).json({companies: results.rows});
    }
    catch(err){
        return next(err)
    }
    
});

router.get("/:code",async function(req, res, next) {
    try{
        const code = req.params.code;
        const result = await db.query(`select * from companies where
        code=$1`, [code]);
        const industries = await db.query(`
        SELECT industries.code, industries.industry 
        FROM industries 
        JOIN company_industry ON industries.code = company_industry.industry_code 
        WHERE company_industry.company_code = $1
    `, [code])
        const company = result.rows[0]
        company.industries = industries.rows
        return res.json({company: company});
        //return res.json({company: result.rows[0]});
    }
    catch(err){
        return res.status(404)
    }
    
});

router.post("", async function(req,res,next){
    try{
        console.log(req.body)
        const {name, description} = req.body
        const code = slugify(name, {lower: true});
        const result = await db.query(`insert into companies 
        (code, name, description) values ($1, $2, $3) returning 
        code, name, description`, [code, name, description])

        return res.status(201).json({company: result.rows[0]});
        //const company = {code:req.body.code, name:req.body.name, 
            //description:req.body.description}
        
    }
    catch(err){
        return next(err)
    }
})

router.put("/:code", async function(req,res,next){
    try{
        const {name, description} = req.body
        const result = await db.query(`update companies 
        set name=$1, description=$2 where code=$3 returning 
        code, name, description`, [name, description, req.params.code])

        return res.status(200).json({company: result.rows[0]});
        //const company = {code:req.body.code, name:req.body.name, 
            //description:req.body.description}
        
    }
    catch(err){
        return res.status(404)
    }
})

router.delete("/:code", async function(req,res,next){
    try{
        const result = await db.query(`delete from companies 
        where code=$1`, [req.params.code])

        return res.json({status: "Deleted"}); //adding a res.status causing the returning json to be empty?
        //const company = {code:req.body.code, name:req.body.name, 
            //description:req.body.description}
        
    }
    catch(err){
        return next(err)
    }
})

module.exports = router;


