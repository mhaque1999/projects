const express = require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");


router.get("",async function(req, res, next) {
    try{
        const results = await db.query("select * from invoices");

        return res.status(201).json({invoices: results.rows});
    }
    catch(err){
        return next(err)
    }
    
});

router.get("/:id",async function(req, res, next) {
    try{
        const id = req.params.id;
        const result = await db.query(`select * from invoices inner join
        companies on invoices.comp_code=companies.code where id=$1`, [id]);
        

        return res.json({invoice:{id: result.rows[0].id, amt: result.rows[0].amt, paid: result.rows[0].paid,
            add_date: result.rows[0].add_date, paid_date: result.rows[0].paid_date,
            company: { code: result.rows[0].comp_code, name: result.rows[0].name,
                description: result.rows[0].description
                }
                }
            });
    }
    catch(err){
        return res.status(404)
    }
    
});

router.post("", async function(req,res,next){
    try{
        const {comp_code, amt} = req.body
        const result = await db.query(`insert into invoices 
        (comp_code, amt) values ($1, $2) returning 
        id, comp_code, amt, paid, add_date, paid_date`, [comp_code, amt])

        return res.status(201).json(result.rows[0]);
        //const company = {code:req.body.code, name:req.body.name, 
            //description:req.body.description}
        
    }
    catch(err){
        return next(err)
    }
})

router.put("/:id", async function(req,res,next){
    try{
        const {amt} = req.body
        const result = await db.query(`update invoices 
        set amt=$1 where id=$2 returning 
        amt`, [amt, req.params.id])

        return res.status(201).json(result.rows[0]);
        //const company = {code:req.body.code, name:req.body.name, 
            //description:req.body.description}
        
    }
    catch(err){
        return res.status(404)
    }
})

router.delete("/:id", async function(req,res,next){
    try{
        const result = await db.query(`delete from invoices 
        where id=$1`, [req.params.id])

        return res.status(204).json({status: "Deleted"});
        //const company = {code:req.body.code, name:req.body.name, 
            //description:req.body.description}
        
    }
    catch(err){
        return next(err)
    }
})

router.get("/companies/:code",async function(req, res, next) {
    try{
        const results = await db.query(
            `select * from invoices join companies on 
            companies.code=invoices.comp_code
            where code=$1`,[req.params.code]);
        const invoice = results.rows.map(({id, comp_code, amt, paid, add_date,
        paid_date})=>({id, comp_code, amt, paid, add_date, paid_date}))
        console.log(invoice)
        //console.log(results.rows)
        return res.json({company:{code: results.rows[0].code, name: results.rows[0].name, 
                description: results.rows[0].description,
                invoices: invoice}}
                );
    }
    catch(err){
        return next(err)
    }
    
});

module.exports = router;


