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

//  클래스 , 컨설팅 신청정보 저장
router.post('/save/MentorProcess', cors(), urlencodedParser, function (req, res) {
    const mentor = req.body.mentor;
    const mentir = req.body.mentir;
    const pay = req.body.pay;
    const category = req.body.category;
    // const review = req.body.review;

    db.mysql.query("INSERT INTO Consulting_Process ( mentor_id , mentIr_id , Pay , Category , Pay_yn , Review ) VALUES (?,?,?,?,?,?)",
        [mentor, mentir, pay, category, "N", ""], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json({ result: 'success' })
            }
        });

});

//  클래스 , 컨설팅 북마크 - 
router.post('/save/MentorProcess', cors(), urlencodedParser, function (req, res) {
    const mentor = req.body.mentor;
    const mentir = req.body.mentir;
    // const pay = req.body.pay;
    const category = req.body.category;
    // const review = req.body.review;
    // INSERT INTO Bookmark ( mentor_id , mentIr_id , category  ) VALUES (?,?,?)",
    db.mysql.query("SELECT * from Bookmark WHERE mentor_id = ? AND mentir_id =? AND category = ?", [mentor, mentir, category], function (err, rows, fields) {
        if (rows.length === 1) {
            db.mysql.query("DELETE FROM Bookmark WHERE mentor_id = ? AND mentir_id =? AND category = ?", [mentor, mentir, category], function (err, result) {
                res.json({ result: 'delete' })
            })
        }

        else {
            db.mysql.query("INSERT INTO Bookmark ( mentor_id , mentIr_id , category  ) VALUES (?,?,?)", [mentor, mentir, category], function (err, result) {
                res.json({ result: 'success' })
            })
        }
    });

});




// 북마크 리스트 출력
router.get('/review/class/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Bookmark WHERE mentIr_id = ?', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });
});


// 내 멘티 후기 출력 - 클래스
router.get('/review/class/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Consulting_Process WHERE mentIr_id = ? AND Category = "클래스" ', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });

});

// 내 멘티 후기 출력 - 컨설팅
router.get('/review/consulting/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Consulting_Process WHERE mentIr_id = ? AND Category = "컨설팅" ', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });

});

// 내 멘토 후기 출력 - 클래스
router.get('/review_mentor/class/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Consulting_Process WHERE mentor_id = ? AND Category = "클래스" GROUP BY mentor_id ', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });

});

// 내 멘토 후기 출력 - 컨설팅
router.get('/review_mentor/consulting/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Consulting_Process WHERE mentor_id = ? AND Category = "컨설팅" GROUP BY mentor_id ', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });

});

module.exports = router;
