
let payrollData =[];
let editId = null;

const payrollForm = document.getElementById('payrollForm');
const payrollTbody = document.getElementById('payrollTbody');
const submitBtn = document.getElementById('submitBtn');


const sumEmployees = document.getElementById('sumEmployees');
const sumGross = document.getElementById('sumGross');
const sumDed = document.getElementById('sumDed');
const sumNet = document.getElementById('sumNet');

payrollForm.addEventListener('submit', handleFormSubmit);
document.getElementById('resetBtn').addEventListener('click', resetForm);
document.getElementById('clearAllBtn').addEventListener('click', clearAll);



function handleFormSubmit(e) {
    e.preventDefault();
}


const name = document.getElementById('empName').value;
const hours = parseFloat(document.getElementById('hours').value);
const rate = parseFloat(document.getElementById('rate').value);
const taxPercent = parseFloat(document.getElementById('tax').value);
const otherDed = parseFloat(document.getElementById('otherDed').value);


const gross = hours*rate;
const taxAmount = gross*(taxPercent/100);
const netPay = gross - taxAmount - otherDed;

const entry = {
    id: editId || Date.now(),
    name, hours, rate, gross, taxAmount, otherDed, netPay
};


if (editId){
    payrollData = payrollData.map(item => item.id === editId ? entry:item);
    editId = null
    submitBtn.textContent = "Add Payroll";

} else {
    payrollData.push(entry);
}

renderTable()
resetForm()


function