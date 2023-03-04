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

// 내가 신청한 컨설팅 정보 [마이페이지 - 내 멘티정보(컨설팅)]
router.get('/certify/MentorProgram/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Consulting_Process INNER JOIN Consulting on Consulting_Process.mentor_id = Concat(Consulting.User, "," , Consulting.ProgramName) INNER JOIN User on User.email =  Consulting.User WHERE mentir_id = ? AND Consulting_Process.Category = "컨설팅" ', [phone], (error, rows, fields) => {
            res.send(rows)
        });        
});

// 내가 신청한 클래스 정보 [마이페이지 - 내 멘티정보(클래스)]
router.get('/certify/ClassProgram/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Consulting_Process INNER JOIN Tutoring on Consulting_Process.mentor_id = Concat(Tutoring.User, "," , Tutoring.ProgramName) INNER JOIN User on User.email =  Tutoring.User WHERE mentir_id = ? AND Consulting_Process.Category = "클래스" ', [phone], (error, rows, fields) => {
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
        if (rows.length >= 1) {
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

    db.mysql.query('SELECT * from Bookmark WHERE mentir_id = ?', [phone], (error, rows, fields) => {
        // if (rows.length >= 1) {
            res.send(rows)
        // }
        // else {
        //     res.json({ result: 'fail' })
        // }
    });
});

// 내가 신청한 컨설팅 정보 [마이페이지 - 북마크]
router.get('/certify/bookmark/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Bookmark LEFT JOIN Consulting on Bookmark.mentor_id = Concat(Consulting.User, "," , Consulting.ProgramName) INNER JOIN User on User.email =  Consulting.User WHERE Bookmark.mentir_id = ? ', [phone], (error, rows, fields) => {
            res.send(rows)
        });        
});


// 내가 신청한 컨설팅 정보 [마이페이지 - 내 멘토정보]
router.get('/certify/MentorProgram/Mentor/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Consulting_Process INNER JOIN Consulting on Consulting_Process.mentor_id = Concat(Consulting.User, "," , Consulting.ProgramName) INNER JOIN User on User.email =  Consulting_Process.mentir_id WHERE LOCATE( ? , mentor_id) > 0  AND Consulting_Process.Category = "컨설팅" ', [phone], (error, rows, fields) => {
            res.send(rows)
        });        
});

// 내가 신청한 클래스 정보 [마이페이지 - 내 멘토정보]
router.get('/certify/ClassProgram/Mentor/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id; //이용자 정보
  
    db.mysql.query('SELECT * FROM Consulting_Process INNER JOIN Tutoring on Consulting_Process.mentor_id = Concat(Tutoring.User, "," , Tutoring.ProgramName) INNER JOIN User on User.email =  Consulting_Process.mentir_id WHERE LOCATE( ? , mentor_id) > 0 AND Consulting_Process.Category = "클래스" ', [phone], (error, rows, fields) => {
            res.send(rows)
        });        
});



//멘티 상세페이지에서 출력할 후기 - 컨설팅
router.get('/review/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Consulting_Process WHERE mentor_id = ? AND Category = "컨설팅" ', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });

});

//멘티 상세페이지에서 출력할 후기 - 클래스
router.get('/review_class/:id', cors(), urlencodedParser, function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from Consulting_Process WHERE mentor_id = ? AND Category = "클래스" ', [phone], (error, rows, fields) => {
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

    db.mysql.query('SELECT * from Consulting_Process WHERE  LOCATE( ? , mentor_id) > 0 AND Category = "클래스" GROUP BY mentor_id ', [phone], (error, rows, fields) => {
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

    db.mysql.query('SELECT * from Consulting_Process WHERE  LOCATE( ? , mentor_id) > 0 AND Category = "컨설팅" GROUP BY mentor_id ', [phone], (error, rows, fields) => {
        if (rows.length >= 1) {
            res.send(rows)
        }
        else {
            res.json({ result: 'fail' })
        }
    });

});

// 컨설팅  후기작성
router.post('/save/review', cors(), urlencodedParser, function (req, res) {
    const mentor = req.body.mentor;// 프로그램 이름
    const mentir = req.body.mentir;// 멘티계정
    const review = req.body.review;// 리뷰
   

    db.mysql.query("UPDATE Consulting_Process SET Review = ? WHERE mentIr_id = ? AND mentor_id = ? AND Category = ? ",
        [review , mentir, mentor , "컨설팅" ], function (err, rows, fields) {
            if (err) {
                res.json({ result: 'success' })
            } else {
                console.log(err);
            }
        });

});


// 클래스 후기작성
router.post('/save/review/Class', cors(), urlencodedParser, function (req, res) {
    const mentor = req.body.mentor;// 프로그램 이름
    const mentir = req.body.mentir;// 멘티계정
    const review = req.body.review;// 리뷰
   

    db.mysql.query("UPDATE Consulting_Process SET Review = ? WHERE mentIr_id = ? AND mentor_id = ? AND Category = ? ",
        [review , mentir, mentor , "클래스" ], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json({ result: 'success' })
            }
        });

});

// 컨설팅 검색기록
router.get('/result/:searching', cors(), urlencodedParser, function (req, res) {
    const searching = req.params.searching;// 검색어
   
    // 제목 1차검증
    db.mysql.query("SELECT * From Consulting WHERE LOCATE( ? , ProgramName) > 0 ",
        [searching], function (err, rows, fields) {
            if( rows.length > 0){
                res.send(rows)  
            }
            else{
                // 제목 2차검증
                db.mysql.query("SELECT * From Consulting WHERE LOCATE( ? , University) > 0 ",
                [searching], function (err, rows, fields) {
                    if( rows.length > 0){
                        res.send(rows)  
                    }
                    else{
                        res.json({result: 'fail'})            

                    }
                });
        
            }
        });


});

// 컨설팅 검색기록
router.get('/result/Class/:searching', cors(), urlencodedParser, function (req, res) {
    const searching = req.params.searching;// 검색어
   
    // 제목 1차검증
    db.mysql.query("SELECT * From Tutoring WHERE LOCATE( ? , ProgramName) > 0 ",
        [searching], function (err, rows, fields) {
            if( rows.length > 0){
                res.send(rows)  
            }
            else{
                // 제목 2차검증
                db.mysql.query("SELECT * From Tutoring WHERE LOCATE( ? , University) > 0 ",
                [searching], function (err, rows, fields) {
                    if( rows.length > 0){
                        res.send(rows)  
                    }
                    else{
                        res.json({result: 'fail'})            

                    }
                });
        
            }
        });

        
});

module.exports = router;
