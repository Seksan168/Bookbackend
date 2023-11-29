const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const User = function(user){
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}
User.checkUsername = (username, result)=>{
    sql.query("SELECT * FROM users WHERE username='"+username+"'",(err,res)=>{
        if(err){
            console.log("Error: " + err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Found username: " + res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found"}, null);
    });
};

User.create = (newUser, result)=>{
    sql.query("INSERT INTO users SET ?", newUser, (err, res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
        result(null, {id: res.insertId, ...newUser, accessToken: token});
        console.log("Created user:", {id: res.insertId, ...newUser, accessToken: token});
    });
};

User.loginModel = (account, result)=>{
    sql.query("SELECT * FROM users WHERE username=?", [account.username], (err, res)=>{
        if(err){
            console.log("err:" + err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("res[0].password",res[0].password);
            console.log("acc.name",account.password);
        
            const validPassword = ()=>{
                if(account.password == res[0].password) return true;
                else return false;
            }
            console.log("valid passowrd: ",validPassword);
            if(validPassword){
                const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
                console.log("Login success. Token: " + token);
                res[0].accessToken = token;
                result(null, res[0]);
                return;
            }else{
                console.log("Password not match");
                result({kind: "invalid_pass"}, null);
                return;
            }
        }
        result({kind: "not_found"}, null);
    });
};

User.getAllRecords = (result)=>{
    sql.query("SELECT * FROM users", (err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
};
//const, var, let => function scope




module.exports = User;