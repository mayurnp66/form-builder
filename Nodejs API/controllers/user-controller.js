const User = require('../models/user-model');
const CONSTANTS = require('../util/constant');

exports.register = (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User(firstName, lastName, email, password);

    user.register()
        .then((result) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                message : CONSTANTS.USER_REGISTRATION_OK
            });
        })
        .catch(err => {
            if(err.code === 'ER_DUP_ENTRY') {
                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.USER_ALREADY_REGISTERED
                });
            } else {
                res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.SERVER_ERROR_MESSAGE,
                });
            }
        })

    
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const reqPassword = req.body.password;
    User.findUserByEmailId(email)
        .then(([rows, fieldData]) => {

            if (rows.length > 0) {
                if(reqPassword === rows[0].password) {
                    res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        error : false,
                        message : CONSTANTS.USER_LOGIN_OK,
                        data: {
                            firstName: rows[0].first_name,
                            lastName: rows[0].last_name,
                            email: rows[0].email
                        }
                    });
                } else {
                    res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        error : true,
                        message : CONSTANTS.USER_LOGIN_PASSORD_FAILED,
                    });
                }
            } else {
                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.USER_NOT_EXIST,
                });
            }
            
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE,
            });
        })
  }