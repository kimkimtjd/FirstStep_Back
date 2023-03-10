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

//  과외 정보저장.
router.post('/save/Tutor', cors(), urlencodedParser, function (req, res) {
    const User = req.body.Userreq;
    const Name = req.body.Namereq;
    const Birth = req.body.Birthreq;
    const Highschool = req.body.Highschoolreq;
    const University = req.body.Universityreq;
    const Category = req.body.Categoryreq;
    const Grade = req.body.Gradereq;
    const Advantage = req.body.Advantagereq;
    const ProgramName = req.body.ProgramNamereq;
    const Subjects = req.body.Subjectsreq;
    const CategorySecond = req.body.CategorySecond2req;
    const Recommend = req.body.Recommendreq;
    const Progress = req.body.Progressreq;
    const Value = req.body.Valuereq;
    const Avalable = req.body.Avalablereq;
    const Time = req.body.Timereq;
    const Approve = req.body.Approvereq;
    const Datetime = req.body.Datetimereq;


    db.mysql.query("INSERT INTO Tutoring (User , Name , Birth , HighSchool , University , Category , Grade , Advantage , ProgramName , Subjects , Category2 , Recommend , Progress , Avalable , Time  , Value ,  Approve , Entertime ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
    [User , Name , Birth , Highschool , University , Category , Grade , Advantage , ProgramName , Subjects , CategorySecond , Recommend , Progress , Avalable , Time, Value , Approve, Datetime ], function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.json({ result: 'success' })
        }
    });

});

// 내 과외 정보
router.get('/info/:id',cors() , urlencodedParser  , function (req, res) {
    const info = req.params.id;

    db.mysql.query('SELECT * from Tutoring WHERE User = ?', [info], (error, rows, fields) => {
        if (rows.length >= 1) {
            // 승인대기
            if (rows[0].Approve === "N") {
                res.json({result: 'Load'})            
            }
            // 승인이후
            else if(rows[0].Approve === "Y"){
                res.json(rows)            
            }        
        }
        // 미등록        
        else {
            res.json({result: 'fail'})            
        } 
    });

});

// 클래스 전체보기
router.get('/total', cors(), urlencodedParser, function (req, res) {
 
    db.mysql.query('SELECT * from Tutoring',  [], (error, rows, fields) => {
        res.send(rows)
    });

});

// 클래스 상세보기
router.get('/detail/:id', cors(), urlencodedParser, function (req, res) {
    const info = req.params.id;

    db.mysql.query('SELECT * from Tutoring WHERE id = ?', [info], (error, rows, fields) => {
        res.json(rows)
    });
});

// 클래스 메인 3개
router.get('/list/:id',cors() , urlencodedParser  , function (req, res) {

    const id = req.params.id; //유저정보

    db.mysql.query('SELECT * from Tutoring WHERE NOT User = ? ORDER BY rand() LIMIT 4 ', [id], (error, rows, fields) => {
        res.send(rows)
    });

});


// 필터링정보
router.get('/filter/:first/:second/:third/:four/:five', cors(), urlencodedParser, function (req, res) {

    const first = req.params.first; //고등학교 지역
    const second = req.params.second; //대학교 이름
    const third = req.params.third; //고등학교 유형
    const four = req.params.four; //대학교 유형
    const five = req.params.five; //본인여부

    db.mysql.query('SELECT * from Tutoring WHERE (LOCATE(?, HighSchool) > 0 OR LOCATE(?, HighSchool) > 0 OR LOCATE(?, University) > 0 OR LOCATE(?, University) > 0 OR Approve = ?) AND NOT User = ? ORDER BY Entertime DESC, rand() LIMIT 4 ', [first, third, second, four, "Y", five], (error, rows, fields) => {
        // console.log(rows)
        if (rows.length >= 1) {
            // 2가지 조건 다 충족
            res.send(rows)
        }
        else {

            res.json({ result: 'fail' })

        }
    })
});

// 클래스 상세보기
router.get('/detail/:id', cors(), urlencodedParser, function (req, res) {
    const info = req.params.id;

    db.mysql.query('SELECT * from Tutoring WHERE id = ?', [info], (error, rows, fields) => {
        res.json(rows)
    });
});

module.exports = router;
