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
        if (rows.length === 1) {
            if (rows[0].Approve === "N") {
                res.json({result: 'Load'})            
            }
            else{
                res.json({result: 'success'})            
            }            
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});

// 필터링정보
router.get('/filter/:first/:second',cors() , urlencodedParser  , function (req, res) {
    
    const first = req.params.first; //고등학교
    const second= req.params.second; //대학

    db.mysql.query('SELECT * from Tutoring WHERE HighSchool = ? AND University = ? AND Approve = ?', [first , second , "Y"], (error, rows, fields) => {
        if (rows.length === 1) {
            // 2가지 조건 다 충족
            res.send(rows)  
        }
        else {
            db.mysql.query('SELECT * from Tutoring WHERE University = ? AND Approve = ?', [second, "Y"], (error, rows, fields) => {
                if (rows.length === 1) {
                    // 1가지 조건 충족 - 대학교
                    res.send(rows)  
                }  
                else{
                    db.mysql.query('SELECT * from Tutoring WHERE HighSchool = ? AND Approve = ?', [first, "Y"], (error, rows, fields) => {
                        if (rows.length === 1) {
                            // 1가지 조건 충족 - 고등학교
                            res.send(rows)  
                        }   
                        else{
                            res.json({result: 'fail'})     
                        }
                    })
                }
            })
        } 

    });

});


module.exports = router;
