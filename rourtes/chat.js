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

//  초기 신청시 멘토가 남기는 멘트
router.post('/send/Mentor', cors(), urlencodedParser, function (req, res) {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const message = req.body.message;
    const timeset = req.body.timeset;

    db.mysql.query("INSERT INTO message (content , sender , receiver , promise , Enterrime) VALUES (?,?,?,?,?)",
        [message, sender, receiver, "wait" , timeset], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json({ result: 'success' })
            }
        });

});


// 채팅내역 가져오기
router.get('/info/:receiver/:sender', cors(), urlencodedParser, function (req, res) {
    const receiver = req.params.receiver;
    const sender = req.params.sender;

    db.mysql.query('SELECT * from message WHERE (receiver = ? AND sender = ?) OR (receiver = ? AND sender = ?)', [receiver ,sender,sender,receiver ], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.json(rows)        }
        // 미등록                
        else {
            res.json({ result: 'fail' })
        }
    });

});

//  일정잡기
router.post('/schedule', cors(), urlencodedParser, function (req, res) {
    const menti = req.body.id;
    const mento = req.body.mento;
    const schedule = req.body.schedule;
    // const timeset = req.body.timeset;

    db.mysql.query("UPDATE Consulting_Process SET schedule = ?  WHERE mentIr_id = ? AND LOCATE( ? , mentor_id) > 0 AND schedule = '' " ,
    [schedule, menti , mento ]  , function (err, result) {
       
        // res.json(rows)            

        if (err) throw err;
        
        res.json({result: 'success'})            
    
      });

});

// 후기기록
router.post('/Review', cors(), urlencodedParser, function (req, res) {
    const menti = req.body.id;
    const mento = req.body.mento;
    const schedule = req.body.schedule;
    // const timeset = req.body.timeset;

    db.mysql.query("UPDATE Consulting_Process SET Review = ?  WHERE mentIr_id = ? AND LOCATE( ? , mentor_id) > 0 AND schedule = '' " ,
    [schedule, menti , mento ]  , function (err, result) {
       
        // res.json(rows)            

        if (err) throw err;
        
        res.json({result: 'success'})            
    
      });

});



module.exports = router;
