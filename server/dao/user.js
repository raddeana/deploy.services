/**
 * 用户
 * @author Philip
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// user
const schema = new Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    }
})
 
// 校验
schema.path("username").required(true, "username cannot be blank")
schema.path("password").required(true, "password cannot be blank")

schema.statics = {
    /**
     * 登录
     * @param {string} 用户名
     * @param {string} 密码
     * @return {boolean} 登陆结果
     */
    async login (username, password) {
        let user = await this.findOne({ username }).exec()
        
        if (user && user.password === password) {
            return {
                success: true,
                user
            }
        } else {
            if (!user) {
                return {
                    success: false,
                    message: "用户名错误"
                }
            } else {
                return {
                    success: false,
                    message: "密码不正确"
                }
            }
        }
    }
}

module.exports = mongoose.model("user", schema)
