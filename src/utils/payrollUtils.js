export const calculatePayableSalary = (baseSalary, daysPresent) => {
    const salary = parseFloat(baseSalary);
    if (isNaN(salary)) return 0;
    
    const perDaySalary = salary / 30;
    return Math.round(perDaySalary * daysPresent);
};

export const getDaysPresent = (employeeId, attendanceRecords) => {
    if (!attendanceRecords) return 0;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return attendanceRecords.filter(record => {
        if (!record.date || record.employeeId !== employeeId) return false;
        
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    }).length;
};
