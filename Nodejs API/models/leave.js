const db = require('../util/database');

module.exports = class Leave {
    constructor(leaveType, appliedBy, startDate, endDate, reason) {
      this.leaveType = leaveType;
      this.appliedBy = appliedBy;
      this.startDate = startDate;
      this.endDate = endDate;
      this.reason = reason;
    }

    applyLeave() {
      return db.execute(
        'INSERT INTO leaves (leave_type, applied_by, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)',
        [this.leaveType, this.appliedBy, this.startDate, this.endDate, this.reason]
      );
    }

    updateLeaveByLeaveId(leaveId) {
        return db.execute(
            `UPDATE leaves set leave_type = ?, start_date = ?, end_date = ?, reason = ?  where leaves.id = ?`, 
            [this.leaveType, this.startDate, this.endDate, this.reason, leaveId]
        )
    }

    static getLeaveByLeaveId(leaveId) {
        return db.execute(
            `SELECT * FROM leaves where leaves.is_deleted = 'N' AND leaves.id = ?`, [leaveId]
        )
    }
    
    static deleteLeaveByLeaveId(leaveId) {
        return db.execute(
            `UPDATE leaves set is_deleted = 'Y' where leaves.id = ?`, [leaveId]
        )
    }

    static getAllLeaves() {
      return db.execute(
          `SELECT * FROM leaves where leaves.is_deleted = 'N'`);
    }
  
    static getLeavesByEmployeeId(empId) {
      return db.execute(
          `SELECT l.*,lt.leave_description as leave_type_desc FROM leaves l
          INNER JOIN leave_types lt ON l.leave_type = lt.id
          WHERE l.applied_by = ? AND l.is_deleted = 'N' `, [empId]
          );
    }

    static approveRejectLeave(leaveId, approvedRejectFlag, approvedDate) {
        return db.execute(
            `UPDATE leaves set is_approved = ?, approved_date = ? where leaves.id = ? and (leaves.is_approved IS NULL OR leaves.is_approved ='')`, [approvedRejectFlag, approvedDate, leaveId]
        )
    }

    static getAllLeaveTypes() {
        return db.execute(
            `SELECT * FROM leave_types`
            );
      }

    static getLeaveTypeById(id) {
        return db.execute(
            `SELECT * FROM leave_types WHERE leave_types.id = ?`, [id]
            );
      }

    static getLeaveBalanceByEmpId(empId) {
        return db.execute(
            `SELECT casual_leaves, ebl, other FROM employee WHERE employee.employee_id = ?`, [empId]
            );
    }


    static changeLeaveBalance(leaveId, approvedRejectFlag) {
        
        let employeeId = '';
        let leaveType = '';
        let leaveTypeDescription = '';
        let leavesPerYear = '';
        let currentLeaveBalance = '';
        let totalLeaveDays = '';
        this.getLeaveByLeaveId(leaveId)
            .then(([rows, fieldData]) => {
                
                employeeId = rows[0].applied_by;
                leaveType = rows[0].leave_type;
                const startDate = new Date(rows[0].start_date).getTime();
                const endDate = new Date(rows[0].end_date).getTime();
                const diffInTime = endDate - startDate;
                const totalLeaveDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

                this.getLeaveTypeById(leaveType)
                    .then(([rows, fieldData]) => {
                        leaveTypeDescription = rows[0].leave_type;
                        leavesPerYear = rows[0].leaves_per_year;
                        

                        this.getLeaveBalanceByEmpId(employeeId)
                            .then(([rows, fieldData]) => {
                                currentLeaveBalance = rows[0][leaveTypeDescription];
                                let updatedLeaveBalance = '';

                                if (approvedRejectFlag === 'N') {
                                    if (currentLeaveBalance === leavesPerYear) {
                                        updatedLeaveBalance = currentLeaveBalance
                                    } else {
                                        updatedLeaveBalance = currentLeaveBalance + totalLeaveDays;
                                    }
                                    
                                } else if (approvedRejectFlag === 'Y') {
                                    if (currentLeaveBalance === 0) {
                                        updatedLeaveBalance = currentLeaveBalance
                                    } else {
                                        updatedLeaveBalance = currentLeaveBalance - totalLeaveDays;
                                    }
                                }
                                
                                db.execute(
                                    `UPDATE employee set `+ leaveTypeDescription +` = ? where employee.employee_id = ?`, [updatedLeaveBalance, employeeId]
                                ).then (
                                    (result) => {
                                    }
                                ).catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }


  };