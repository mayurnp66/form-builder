const Form = require('../models/form-model');
const CONSTANTS = require('../util/constant');

exports.getFormById = (req, res) => {
    const formId = req.body.formId;
    console.log("formId", formId)
    Form.getFormById(formId)
        .then(([rows,fieldData]) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                data: rows[0]
            });
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE
            });
        })
}