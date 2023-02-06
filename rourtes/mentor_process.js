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
    const mentor = req.body.mentor;// 멘토계정
    const mentir = req.body.mentir;// 멘티계정
    const pay = req.body.pay;// 금액 및 계좌번호
    const Entertime = req.body.time;// 시간
    const category = req.body.category; // 컨설팅 클래스 종류
    // const review = req.body.review;

    db.mysql.query("INSERT INTO Consulting_Process ( mentor_id , mentIr_id , Pay , Category , Pay_yn , Review , Entertime ) VALUES (?,?,?,?,?,?,?)",
        //  
        [mentor, mentir, pay, category, "N", "" , Entertime], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json({ result: 'success' })
            }
        });

});

// 내가 신청한 컨설팅 정보 [마이페이지 - 내 멘티정보]
router.get('/certify/MentorProgram/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Consulting_Process INNER JOIN Consulting on Consulting_Process.mentor_id = Concat(Consulting.User, "," , Consulting.ProgramName) INNER JOIN User on User.email =  Consulting.User WHERE mentir_id = ? ', [phone], (error, rows, fields) => {
            res.send(rows)
        });        
});

// 내가 신청한 컨설팅 정보 [하단 - 알람 , 메세지]
router.get('/certify/alarm/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Consulting INNER JOIN Consulting_Process on Consulting_Process.mentor_id = Concat(Consulting.User, "," , Consulting.ProgramName) INNER JOIN User on User.email =  Consulting.User WHERE mentir_id = ? ', [phone], (error, rows, fields) => {
            res.send(rows)
        });        
});


//  클래스 , 컨설팅 북마크 -  
router.post('/bookmark/MentorProcess', cors(), urlencodedParser, function (req, res) {
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

// 북마크 리스트 출력 [리스트만 출력]
router.get('/bookmark/lsit/:id', cors(), urlencodedParser, function (req, res) {
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

// 내가 신청한 컨설팅 정보 [마이페이지 - 북마크]
router.get('/certify/bookmark/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Bookmark LEFT JOIN Consulting on Bookmark.mentor_id = Concat(Consulting.User, "," , Consulting.ProgramName) INNER JOIN User on User.email =  Consulting.User WHERE Bookmark.mentir_id = ? ', [phone], (error, rows, fields) => {
            res.send(rows)
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
