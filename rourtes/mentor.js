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

//  멘토링 정보저
router.post('/save/Mentor', cors(), urlencodedParser, function (req, res) {
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
    const Recommend = req.body.Recommendreq;
    const Progress = req.body.Progressreq;
    const Avalable = req.body.Avalablereq;
    const Value = req.body.Valuereq;
    const Time = req.body.Timereq;
    const Approve = req.body.Approvereq;
    const Datetime = req.body.Datetimereq;


    db.mysql.query("INSERT INTO Consulting (User , Name , Birth , HighSchool , University , Category , Grade , Advantage , ProgramName , Subjects , Recommend , Progress ,  Avalable , Time , Value  , Approve , Entertime ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
    [User , Name , Birth , Highschool , University , Category , Grade , Advantage , ProgramName , Subjects , Recommend , Progress , Avalable , Time , Value , Approve , Datetime ], function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.json({ result: 'success' })
        }
    });

});


// 내 멘토링 정보
router.get('/info/:id',cors() , urlencodedParser  , function (req, res) {
    const info = req.params.id;

    db.mysql.query('SELECT * from Consulting WHERE User = ?', [info], (error, rows, fields) => {
        if (rows.length === 1) {
            // 승인대기
            if (rows[0].Approve === "N") {
                res.json({result: 'Load'})            
            }
            // 임시저장
            else if(rows[0].Loading === "N"){
                res.json({result: 'exist'})            
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

module.exports = router;
