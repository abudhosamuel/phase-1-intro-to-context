// Your code here
// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Function to create a time-in event
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  
  // Function to create a time-out event
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Function to calculate total wages for all dates worked by an employee
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    
    return datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  }
  