const express = require("express");

const router = express.Router();

//import orm to use db functions
const burger = require("../models/burger.js");

//routes and logic

router.get("/", function(req, res){
    burger.all(function(data){
        const burObject = {
            burgers: data
        };
        console.log(burObject);
        res.render("index", burObject);
    });
}); 

router.post("/api/burgers", function(req, res){
    burger.create([
        "name", "eaten"
    ], [
        req.body.name, req.body.eaten
    ], function(result){
        res.json({id: result.insertID});
    });
});

router.put("/api/burgers/:id", function(req, res){
    const condition = "id = " + req.params.id;
    console.log("condition", condition); 
    burger.update({
        eaten: req.body.eaten
    }, condition, function(result){
        if(result.changedRows == 0){
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res){
    const condition = "id = " + req.params.id;

    burger.delete(condition, function(result){
        if(result.affectedRows == 0){
            return res.status(404).end();
        }else{
            res.status(202).end();
        }
    });
});


// Export routes for server.js to use.
module.exports = router;