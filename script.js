//ELEMENTS
const totalBalance = document.querySelector('.total-num') //total balance
const totalIncome = document.querySelector('.income') //income balance
const totalExpense = document.querySelector('.expense-num') //expense balance
const transactionsSection = document.querySelector('.individuals')
const defaultTxt = document.createElement('p')
const expenseBtn = document.querySelector('.expense-btn')
const incomeBtn = document.querySelector('.income-btn')
const transactionName = document.querySelector('#name')
const transactionAmount = document.querySelector('#amount')
const transactionAmountHtml = document.createElement('h3')
const transactionDate = document.querySelector('#date')
const submitBtn = document.querySelector('.submit-btn')
const transactions = []
const transactions2 = []
let currentValue = undefined
let negativeValue = undefined
let positiveValue = undefined
let operation = 'negative'

//TOGGLE BUTTONS
expenseBtn.addEventListener('click', function(){
    expenseBtn.style.backgroundColor = 'white'
    incomeBtn.style.backgroundColor = 'rgba(128, 128, 128, 0.24)'
    operation = 'negative'
})

incomeBtn.addEventListener('click', function(){
    incomeBtn.style.backgroundColor = 'white'
    expenseBtn.style.backgroundColor = 'rgba(128, 128, 128, 0.24)'
    operation = 'positive'
})

const posOrNeg = function(){
    currentValue = parseFloat(transactionAmount.value);

    if (currentValue && operation === 'negative') {
        negativeValue = -Math.abs(currentValue);
        transactions.push(negativeValue);
        return `-$${Math.abs(negativeValue)}`;
    } else if (currentValue && operation === 'positive') {
        positiveValue = Math.abs(currentValue);
        transactions.push(positiveValue);
        return `+$${Math.abs(positiveValue)}`;
    }
}

let values = transactions
for(const value of values){
    console.log(values)
}

//DISPLAY TRANSACTIONS
if(transactions.length === 0){
    defaultTxt.style.margin = '10px'
    defaultTxt.innerHTML = 'No Transactions'
    transactionsSection.appendChild(defaultTxt)
}

const displayTransactions = (function(){
    let hasExecuted = false;

    return function(){
        if(!hasExecuted){
            transactionsSection.removeChild(defaultTxt);
            hasExecuted = true;
        }

        const lastTransaction = transactions[transactions.length -1]

        transactionAmountHtml.innerHTML = `${lastTransaction < 0 ? `-${Math.abs(lastTransaction)}` : `+${lastTransaction}`}`

        const html = `<div class="individual-expense">
                        <div class="details">
                            <h3>${transactionName.value}</h3>
                            <h4 style="color:grey;">${transactionDate.value}</h4>
                        </div>

                        <div class="remove">
                            <button style="cursor:pointer;" class="delete-button">Remove</button
                        </div>
                            
                        <div class="amount">
                            ${transactionAmountHtml.innerHTML}
                        </div>
                    </div>`

        transactionsSection.innerHTML += html;

        const amountDiv = transactionsSection.lastElementChild.querySelector('.amount')
        const amountValue = parseFloat(transactionAmountHtml.innerHTML.replace(/[^0-9.-]+/g, ''));

        if(amountValue > 0){
            amountDiv.style.color = 'green'
        }
        else{
            amountDiv.style.color = 'red'
        }
            
        transactionName.value = ''
        transactionDate.value = ''
        transactionAmount.value = ''
    };
})();

//REMOVE TRANSACTIONS
const removeTransaction = function(index){
    transactions.splice(index, 1)
}

transactionsSection.addEventListener('click', function(event) {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
        const transactionDiv = deleteButton.closest('.individual-expense');
        const indexToRemove = Array.from(transactionsSection.children).indexOf(transactionDiv);
        removeTransaction(indexToRemove);
        transactionDiv.remove();

        calcTotals();
    }
});

//CALCULATE TOTALS
const calcTotals = function(){
    const total = transactions.reduce(function(acc, cur){
        return acc + cur
    },0)
    totalBalance.innerHTML = `${total < 0 ? `-$${Math.abs(total)}` : `$${total}`}`

    const incomeTotal = transactions.filter(function(num){
        return num > 0
    }).reduce(function(acc, cur){
        return acc + cur
    },0)
    totalIncome.innerHTML = `+$${Math.abs(incomeTotal)}`

    const expenseTotal = transactions.filter(function(num){
        return num < 0
    }).reduce(function(acc, cur){
        return acc + cur
    },0)
    totalExpense.innerHTML = `-$${Math.abs(expenseTotal)}`
}


submitBtn.addEventListener('click', function(){
    posOrNeg()
    displayTransactions()
    calcTotals()
})




