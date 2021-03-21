const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    userLogin = async (req, res, next) => {
        //this.checkValidation(req);
        console.log(req.body);
        const { email, password: pass } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = pass == user.password;

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };
}


module.exports = new UserController;