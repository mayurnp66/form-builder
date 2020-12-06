const Leave = require('../models/leave');
const CONSTANTS = require('../util/constant');

exports.applyLeave = (req, res) => {
    const leaveType = req.body.leaveType;
    const appliedBy = req.body.appliedBy;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const reason = req.body.reason;

    const leave = new Leave(leaveType, appliedBy, startDate, endDate, reason);

    leave.applyLeave()
        .then((result) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                message : CONSTANTS.LEAVE_APPLIED_SUCCESSFULLY
            });
        })
        .catch(err => {
            if(err.code === 'ER_NO_REFERENCED_ROW_2') {
                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.LEAVE_TYPE_ERROR,
                }); 
            } else {
                res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.SERVER_ERROR_MESSAGE,
                });
            }
        })
}

exports.editLeave = (req, res) => {
    const leaveId = req.params.leaveId;
    const leaveType = req.body.leaveType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const reason = req.body.reason;

    const leave = new Leave(leaveType, null, startDate, endDate, reason);

    leave.updateLeaveByLeaveId(leaveId)
        .then(([rows,fieldData]) => {
            if(rows.affectedRows != 0) {
                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error : false,
                    message : CONSTANTS.LEAVE_UPDATE_SUCCESSFULLY
                });
            } else {
                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.LEAVE_NOT_FOUND
                });
            }
             
        })
        .catch(err => {
            if(err.code === 'ER_NO_REFERENCED_ROW_2') {
                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.LEAVE_TYPE_ERROR,
                }); 
            } else {
                res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    error : true,
                    message : CONSTANTS.SERVER_ERROR_MESSAGE,
                });
            }
        })
}

exports.deleteLeave = (req, res) => {
    const leaveId = req.body.leaveId;
    Leave.deleteLeaveByLeaveId(leaveId)
        .then((result) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                message : CONSTANTS.LEAVE_DELETE_SUCCESSFULLY
            });
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE,
            });
        })
}

exports.getLeavesByEmpId = (req, res) => {
    const employeeId = req.body.employeeId;
    Leave.getLeavesByEmployeeId(employeeId)
        .then(([rows,fieldData]) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                data: rows
            });
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE
            });
        })
}

exports.getAllLeaves = (req, res) => {
    Leave.getAllLeaves()
    .then(([rows,fieldData]) => {
        res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error : false,
            data: rows
        });
    })
    .catch(err => {
        res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error : true,
            message : CONSTANTS.SERVER_ERROR_MESSAGE,
        });
    })
}

exports.approveRejectLeave = (req, res) => {
    const leaveId = req.body.leaveId;
    const approvedRejectFlag = req.body.approvedRejectFlag;
    const approvedDate = new Date();
    Leave.approveRejectLeave(leaveId, approvedRejectFlag, approvedDate)
    .then(([rows,fieldData]) => {

        if(rows.affectedRows != 0) {
            Leave.changeLeaveBalance(leaveId, approvedRejectFlag);
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                message : CONSTANTS.LEAVE_APPROVAL_STATUS_CHANGE_SUCCESSFULLY
            });
        } else {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.LEAVE_NOT_FOUND
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

exports.getDashboardDetails = (req, res) => {
    Leave.getAllLeaves()
    .then(([rows,fieldData]) => {
        res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error : false,
            data: rows
        });
    })
    .catch(err => {
        res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error : true,
            message : CONSTANTS.SERVER_ERROR_MESSAGE,
        });
    })
}

exports.getLeaveTypes = (req, res) => {
    Leave.getAllLeaveTypes()
        .then(([rows,fieldData]) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                data: rows
            });
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE
            });
        })
}

exports.getLeaveByLeaveId = (req, res) => {
    const leaveId = req.body.leaveId;
    Leave.getLeaveByLeaveId(leaveId)
        .then(([rows,fieldData]) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                data: rows
            });
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE,
            });
        })
}

exports.getLeaveBalanceByEmpId = (req, res) => {
    const employeeId = req.body.employeeId;
    Leave.getLeaveBalanceByEmpId(employeeId)
        .then(([rows,fieldData]) => {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error : false,
                data: rows
            });
        })
        .catch(err => {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error : true,
                message : CONSTANTS.SERVER_ERROR_MESSAGE
            });
        })
}