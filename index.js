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


app.use( express.static( path.join(__dirname, 'build') ) );

app.get('/', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Login', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});

app.get('/Login/Admin', function(request, response){
  response.sendFile( path.join(__dirname, 'build/index.html') )
});



app.listen(8000); // 80 => 3000번 포트로!
