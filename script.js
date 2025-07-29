let expense = [];
let income = [];

const bgt = document.getElementById('balance');
const inc = document.getElementById('income');
const exp = document.getElementById('expense');
const amt = document.getElementById('amount');
const detail = document.getElementById('detail');
const btn = document.getElementById('btn');
const transactionList = document.getElementById('transaction-list');


let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateSums() {
    expense = []; 
    income = [];  
    transactions.forEach(tx => {
        if (tx.amount > 0) {
            income.push(tx.amount);
        } else {
            expense.push(Math.abs(tx.amount)); 
        }
    });

    const expensesum = expense.reduce((acc, curr) => acc + curr, 0);
    const incomesum = income.reduce((acc, curr) => acc + curr, 0);
    const budgetsum = incomesum - expensesum;

    inc.innerText = `${incomesum.toFixed(2)}`; 
    exp.innerText = `${expensesum.toFixed(2)}`; 
    bgt.innerText = `${budgetsum.toFixed(2)}`; 
}

function renderTransactions() {
    transactionList.innerHTML = ''; 

    transactions.forEach((tx, index) => {
        const box = document.createElement('div');
        box.className = " rounded-md px-1 py-1 text-md flex  items-center shadow-md space-x-3 justify-center bg-gray-100 mt-2 hover:scale-105 hover:ease-in-out hover:transition duration-300";

        const label = document.createElement('span');
        label.innerText = tx.description;

        const value = document.createElement('span');
        
        value.className = `${tx.amount < 0 ? 'text-red-500' : 'text-green-500'} font-semibold`;
        value.innerText = `₹${tx.amount.toFixed(2)}`; // 
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '❌'; 
        removeBtn.className = ' px-1 py-1 bg-white  text-xs rounded-full hover:bg-gray-100  ml-3 ';
        removeBtn.onclick = () => {
          
            transactions.splice(index, 1);
           
            localStorage.setItem('transactions', JSON.stringify(transactions));
         
            renderTransactions();
            updateSums();
        };

        box.appendChild(label);
        box.appendChild(value);
        box.appendChild(removeBtn);
        transactionList.appendChild(box); 
    });
}


btn.addEventListener('click', (e) => {
    e.preventDefault(); 

    const description = detail.value.trim(); 
    const amountValue = parseFloat(amt.value); 

    
    if (!description || isNaN(amountValue)) {
        alert("Please enter a valid description and amount");
        return; 
    }

    
    transactions.push({ description, amount: amountValue });
  
    localStorage.setItem('transactions', JSON.stringify(transactions));

    
    renderTransactions();
    updateSums();


    amt.value = '';
    detail.value = '';
});


renderTransactions();
updateSums();