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
 
// db를 사용
var db = require('../config/db')

//  멘토링 정보저장
router.post('/save/Favorite', cors(), urlencodedParser, function (req, res) {
    const User = req.body.UserReq;
    const First = req.body.FirstReq;
    const Second = req.body.SecondReq;
    const Third = req.body.ThirdReq;
    const Four = req.body.FourReq;
    const Five = req.body.FiveReq;

    db.mysql.query("INSERT INTO Favorite (User , First , Second ,Third , Four , Five ) VALUES (?,?,?,?,?,?)", 
    [User , First , Second , Third , Four , Five ], function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.json({ result: 'success' })
        }
    });

});

// 내 관심사 정보 수정
router.post('/change/:id', urlencodedParser , function (req,res) {

    /*************** 유저 필터링 ***************/
    const id = req.params.id;
  
    /*************** 받는데이터 ***************/
    const first = req.body.firstpost; 
    const second = req.body.secondpost; 
    const third = req.body.thirdpost; 
    const four = req.body.fourpost; 
    const five = req.body.fivepost; 
  
    // res.send(image);
  
    db.mysql.query(" UPDATE Favorite SET First = ? , Second = ? , Third = ? , Four = ? , Five = ?   WHERE User = ?",[first, second , third , four , five , id]  , function (err, result) {
  
        if (err) throw err;
        
        res.json({result: 'success'})            
    
      });
  
  
  });

// 내 멘토링 정보
router.get('/info/:id',cors() , urlencodedParser  , function (req, res) {
    const info = req.params.id;

    db.mysql.query('SELECT * from Favorite WHERE User = ?', [info], (error, rows, fields) => {
        if (rows.length === 1) {
            res.send(rows)            
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});

// 내 관심사 등록여부
router.get('/certify/:id',cors() , urlencodedParser  , function (req, res) {
    const info = req.params.id;

    db.mysql.query('SELECT * from Favorite WHERE User = ?', [info], (error, rows, fields) => {
        if (rows.length === 1) {
            res.json({result: 'fail'})            
        }
        else{
            res.json({result: 'success'})            
        }
    });

});



module.exports = router;
