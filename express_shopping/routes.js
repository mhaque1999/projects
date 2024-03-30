const express = require("express");
const router = new express.Router();
const items = require("./fakeDb")
const ExpressError = require("./expressError")

/** GET /users: get list of users */

router.get("", function(req, res) {
    return res.json({itemList: items});
});

router.get("/:name", function(req,res,next){
    for (let item of items){
        if(item.name == req.params.name){
            return res.json({item: item});
        }
    }
    //throw new ExpressError("Item not found", 404)
})

router.post("", function(req, res) {
    const item = {name: req.body.name, price: req.body.price}
    items.push(item)
    return res.status(201).json({item: item});
});

router.patch("/:name", function(req,res,next){
    for (let item of items){
        if(item.name == req.params.name){
            item.name = req.body.name
            item.price = req.body.price 
            return res.json({item: item});
        }
    }
    //throw new ExpressError("Item not found", 404)
})

router.delete("/:name", function (req, res) {
    for (let item of items){
        if(item.name == req.params.name){
            items.splice(item, 1)
            return res.json({message: `${item.name} was deleted from the shopping list!`});
        }
    }
    //throw new ExpressError("Item not found", 404)
})

module.exports = router;
