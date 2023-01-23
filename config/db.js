const mySql = require('mysql')

const info = {
    host: 'firststep.cuhtzud63hdw.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'cjtrjfdma123#!',
    port:  3306,
    database: 'FirstStep'
}

let mysql = mySql.createConnection(info)

mysql.connect((error)=> {
    if(error){
        console.log("DB 연동 실패 : ", error)
    }
    else {
        console.log("DB 연동 성공!")
    }
})

module.exports = {
    mysql, info
}