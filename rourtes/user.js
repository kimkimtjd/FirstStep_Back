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

// post요청시 회원가입을 하는 기능을 수행한다.
router.post('/admin',cors() , urlencodedParser  , function (req, res) {
    const email = req.body.EmailPost;
    const pw = req.body.NamePost;
    const Phone = req.body.PhonePost;
    const Nickname = req.body.NicknamePost;


    db.mysql.query('SELECT * from User WHERE email = ?', [email], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({result: 'fail'})
        }
        else {
            db.mysql.query("INSERT INTO User (email,pw,Phone,Nickname) VALUES (?,?,?,?)", [email, pw, Phone, Nickname ], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({result: 'success'})
                }
            });
        } 
    });

});

// 이메일 중복확인
router.post('/emailcheck',cors() , urlencodedParser  , function (req, res) {
    const email = req.body.EmailPost;

    db.mysql.query('SELECT * from User WHERE email = ?', [email], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({result: 'fail'})
        }
        else {
            res.json({result: 'success'})            
        } 
    });

});

// 연락처 중복확인
router.post('/Phonecheck',cors() , urlencodedParser  , function (req, res) {
    const Phone = req.body.PhonePost;

    db.mysql.query('SELECT * from User WHERE Phone = ?', [Phone], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({result: 'fail'})
        }
        else {
            res.json({result: 'success'})            
        } 
    });

});

// 닉네임 중복확인
router.post('/nicknamecheck',cors() , urlencodedParser  , function (req, res) {
    const nickname = req.body.nicknamecheck;

    db.mysql.query('SELECT * from User WHERE Nickname = ?', [nickname], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({result: 'fail'})
        }
        else {
            res.json({result: 'succecc'})            
        } 
    });

});

// 이메일 찾기
router.post('/FindId',cors() , urlencodedParser  , function (req, res) {
    const Phone = req.body.Phone;

    db.mysql.query('SELECT * from User WHERE Phone = ?', [Phone], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({user: rows[0].email})
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});

// 닉네임 찾기 - 연락처로
router.post('/Findnickname',cors() , urlencodedParser  , function (req, res) {
    const Phone = req.body.Phone;

    db.mysql.query('SELECT * from User WHERE Phone = ?', [Phone], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({user: rows[0].Nickname})
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});


// 닉네임 찾기 - 이메일로
router.get('/Emailname/:id',cors() , urlencodedParser  , function (req, res) {
    const phone = req.params.id;

    db.mysql.query('SELECT * from User WHERE email = ?', [phone], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({user: rows[0].Nickname})
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});

// 이메일 찾기 - 닉네임으로
router.get('/Nickname/:id',cors() , urlencodedParser  , function (req, res) {
    const phone = req.params.id;
    const rgiojwsg = decodeURI(phone)

    db.mysql.query('SELECT * from User WHERE Nickname = ?', [rgiojwsg], (error, rows, fields) => {
        if (rows.length === 1) {
             res.json({user: rows[0].Nickname})
        }
        else {
            res.json({result: 'fail'})            
        } 
    });

});

// 비밀번호 변격ㅇ
router.post('/ChangePW',cors() , urlencodedParser  , function (req, res) {
    const Phone = req.body.Phone;
    const Pw = req.body.Pw;

    db.mysql.query('SELECT * from User WHERE Phone = ?', [Phone], (error, rows, fields) => {
        if (rows.length === 1) {
            db.mysql.query(" UPDATE User SET pw = ? WHERE Phone = ?",[Pw, Phone] , function (err, result) {

                if (err) throw err;
                res.json({result: 'success'})            
            
              });
          
        }
        else {
            res.json({result: 'success'})            
        } 
    });

});

// 닉네임 변경 및 중복확인
router.post('/ChangeNickname/:id',cors() , urlencodedParser  , function (req, res) {
     /*************** 유저 필터링 ***************/
    const id = req.params.id;
    const Phone = req.body.nickname;
    

    db.mysql.query('SELECT * from User WHERE Nickname = ?', [Phone], (error, rows, fields) => {
        if (rows.length === 1) {
                res.json({result: 'fail'})                        
        }
          
        else {
            db.mysql.query(" UPDATE User SET Nickname = ? WHERE email  = ?",[Phone , id] , function (err, result) {
                res.json({result: 'success'})            
            })
       } 
    });

});

// 문자보내기
router.post('/phone/certify',cors() , urlencodedParser  , function (req, res) {
    /*************** 유저 필터링 ***************/

   const Phone = req.body.nickname;
   const number = req.body.number;
   
        messageService.send({
            'to': Phone,
            'from': '010-6352-9496',
            'text': '첫걸음테스트.' + number + '입니다.'
          });
        // res.json({result: 'success'})            

});




/* 로그인 기능 */
router.post('/login', (req, res) => {
    const name = req.body.name;
    const pw = req.body.password;
      
    db.mysql.query("SELECT * from User WHERE email = ?", [name], function (rows,fields) {
      if(fields[0].email === name && fields[0].pw === pw){
        res.json({result: 'success'})
      }
      else{
        res.json({result: 'fail'})        
      }
    })

})

/*   */
router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        return res.redirect('/')
    })
})

module.exports = router;