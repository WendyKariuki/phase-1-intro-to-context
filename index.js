  function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wage = employeeRecord.payPerHour * hoursWorked;
    return wage;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord), 0);
}
