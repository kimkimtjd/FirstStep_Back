var express = require('express');
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const { SolapiMessageService } = require('solapi');
const messageService = new SolapiMessageService("NCSRT12VP7YRWOVF", "RN3FKGEIEFERFGPKHJUSASD7CQ2YKG87");

// db를 사용
var db = require('../config/db')

// post - 계좌추가 
router.post('/certify/pay',cors() , urlencodedParser  , function (req, res) {
    const email = req.body.EmailPost;
    const Pay = req.body.PayPost;

    db.mysql.query('SELECT * from User_add WHERE User = ?', [email], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({result: 'fail'})
        }
        else {
            db.mysql.query("INSERT INTO User_add (User,pau) VALUES (?,?)", [email, Pay], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({result: 'success'})
                }
            });
        } 
    });

});



// 결제수단 연결여부 검증
router.get('/find/pay/:id',cors() , urlencodedParser  , function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from User_add WHERE User = ?', [phone], (error, rows, fields) => {
        if (rows.length === 1) {
            res.send(rows)  
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});




module.exports = router;