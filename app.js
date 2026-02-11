

let payrollData = [];
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

  
  const name = document.getElementById('empName').value;
  const hours = parseFloat(document.getElementById('hours').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const taxPercent = parseFloat(document.getElementById('tax').value);
  const otherDed = parseFloat(document.getElementById('otherDed').value);

  
  const gross = hours * rate;
  const taxAmount = gross * (taxPercent / 100);
  const netPay = gross - taxAmount - otherDed;

  const entry = {
    id: editId || Date.now(),
    name, hours, rate, gross, taxAmount, otherDed, netPay
  };

  if (editId) {
    
    payrollData = payrollData.map(item => item.id === editId ? entry : item);
    editId = null;
    submitBtn.textContent = "Add Payroll";
  } else {
    
    payrollData.push(entry);
  }

  renderTable();
  resetForm();
}


function renderTable() {
  payrollTbody.innerHTML = '';
  
  let totalGross = 0;
  let totalDed = 0;
  let totalNet = 0;

  payrollData.forEach((item, index) => {
    totalGross += item.gross;
    totalDed += (item.taxAmount + item.otherDed);
    totalNet += item.netPay;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>**${item.name}**</td>
      <td>${item.hours}</td>
      <td>${item.rate.toFixed(2)}</td>
      <td>${item.gross.toFixed(2)}</td>
      <td>${item.taxAmount.toFixed(2)}</td>
      <td>${item.otherDed.toFixed(2)}</td>
      <td>**₱${item.netPay.toLocaleString(undefined, {minimumFractionDigits: 2})}**</td>
      <td>
        <button onclick="editRow(${item.id})">Edit</button>
        <button class="secondary" onclick="deleteRow(${item.id})" style="color:var(--danger)">Del</button>
      </td>
    `;
    payrollTbody.appendChild(row);
  });

  updateSummary(payrollData.length, totalGross, totalDed, totalNet);
}


function updateSummary(count, gross, ded, net) {
  sumEmployees.textContent = count;
  sumGross.textContent = `₱${gross.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  sumDed.textContent = `₱${ded.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  sumNet.textContent = `₱${net.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}


window.deleteRow = function(id) {
  if(confirm("Are you sure you want to delete this record?")) {
    payrollData = payrollData.filter(item => item.id !== id);
    renderTable();
  }
}


window.editRow = function(id) {
  const item = payrollData.find(i => i.id === id);
  if (!item) return;

  document.getElementById('empName').value = item.name;
  document.getElementById('hours').value = item.hours;
  document.getElementById('rate').value = item.rate;
  document.getElementById('otherDed').value = item.otherDed;
  

  editId = id;
  submitBtn.textContent = "Update Payroll";
  document.getElementById('empName').focus();
}

function resetForm() {
  payrollForm.reset();
  editId = null;
  submitBtn.textContent = "Add Payroll";
}

function clearAll() {
  if(confirm("Clear all payroll data?")) {
    payrollData = [];
    renderTable();
  }
}
