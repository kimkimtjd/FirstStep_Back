const express = require("express");
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// 유저관련
var User = require('./rourtes/user')
app.use('/api/user', User);

// 멘토 관련
var Mentor = require('./rourtes/mentor')
app.use('/api/mentor', Mentor);

// 과외 관련
var Tutoring = require('./rourtes/tutoring')
app.use('/api/tutor', Tutoring);

// 과외 관련
var Favorite = require('./rourtes/favorite')
app.use('/api/favorite', Favorite);

// 유저 회원가입이외 추가로 받는 데이터
var User_add = require('./rourtes/user_add')
app.use('/api/add/user', User_add);

// 멘토 신청시 받는 정보
var Class_add = require('./rourtes/mentor_process')
app.use('/api/add/class', Class_add);

// 채팅
var Chat = require('./rourtes/chat')
app.use('/api/Chat', Chat);

// 멘토 신청 및 입금완료후 채팅진행


app.use( express.static( path.join(__dirname, 'build') ) );

app.get('/', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Login', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Message', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Alarm', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Choice', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Find/id', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Find/id/end', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Find/pw', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Find/pw/end', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Login/Admin', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite/ChoiceHigh', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite/ChoiceUniversity', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});
    
app.get('/Favorite/ChoiceSecond', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite/Change', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite/Change/ChoiceHigh', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite/Change/ChoiceUniversity', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Favorite/Change/end', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

    


app.get('/PostProgram', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/class', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/class/Second', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/class/Third', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/class/ChoiceHigh', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/class/ChoiceUniversity', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});



app.get('/PostProgram/tutor', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/tutor/Second', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/tutor/Third', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/tutor/ChoiceHigh', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/PostProgram/tutor/ChoiceUniversity', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});



app.get('/Mypage', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Mypage/admin', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Mypage/admin/nickname', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Mypage/active', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Mypage/book', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});


app.get('/Mypage/review', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Mypage/rock', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Mypage/pay', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/query:id', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});


app.listen(8000); // 80 => 3000번 포트로!
