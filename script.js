// Sample Data for Testing
const userData = {
    name: "John Doe",
    balance: 1500.75,
    badges: ["First Savings", "Budget Master"],
};

// Dashboard: Display user name and balance
document.addEventListener("DOMContentLoaded", function () {
    const userNameElement = document.getElementById('userName');
    const balanceAmountElement = document.getElementById('balanceAmount');
    const badgeListElement = document.getElementById('badgeList');
    const syncButton = document.getElementById('syncButton');

    userNameElement.textContent = userData.name;
    balanceAmountElement.textContent = userData.balance.toFixed(2);

    // Display badges
    userData.badges.forEach(badge => {
        const badgeItem = document.createElement('li');
        badgeItem.textContent = badge;
        badgeListElement.appendChild(badgeItem);
    });

    // Sync button action (for M-PESA)
    syncButton.addEventListener('click', function() {
        alert("M-PESA Sync Initiated...");
        // Actual M-PESA integration logic goes here.
    });
});

// Registration Form Submission
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Registration Successful!');
    window.location.href = 'login.html';
});

// Login function
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // For simplicity, we'll assume any non-empty email and password is valid
    if (email && password) {
        // Save user login (this is for demo, in real apps use sessionStorage or a backend)
        localStorage.setItem('userLoggedIn', true);
        window.location.href = 'board.html'; // Redirect to the board
    } else {
        alert('Please enter a valid email and password');
    }
});

// Income tracking in dashboard
if (localStorage.getItem('userLoggedIn')) {
    const addIncomeBtn = document.getElementById('addIncomeBtn');
    const incomeInput = document.getElementById('income');
    const incomeLog = document.getElementById('incomeLog');
    let balance = 0;

    addIncomeBtn.addEventListener('click', function() {
        const incomeAmount = parseFloat(incomeInput.value);
        if (!isNaN(incomeAmount) && incomeAmount > 0) {
            // Add income to the balance
            balance += incomeAmount;
            document.getElementById('balance').textContent = `Current Balance: $${balance.toFixed(2)}`;

            // Add the income entry to the income log
            const newIncome = document.createElement('li');
            newIncome.textContent = `$${incomeAmount.toFixed(2)} added`;
            incomeLog.appendChild(newIncome);

            // Clear the input field
            incomeInput.value = '';
        } else {
            alert('Please enter a valid income amount');
        }
    });
} else {
    // If not logged in, redirect to login page
    window.location.href = 'login.html';
}

let totalIncome = 0;
let totalExpenses = 0;
let gigs = JSON.parse(localStorage.getItem('gigs')) || [];
let monthlyBudget = 0;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Elements
const incomeAmount = document.getElementById('incomeAmount');
const addIncomeBtn = document.getElementById('addIncomeBtn');
const expenseAmount = document.getElementById('expenseAmount');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const monthlyBudgetAmount = document.getElementById('monthlyBudgetAmount');
const setBudgetBtn = document.getElementById('setBudgetBtn');
const transactionList = document.getElementById('transactionList');
const gigName = document.getElementById('gigName');
const gigIncome = document.getElementById('gigIncome');
const gigGoal = document.getElementById('gigGoal');
const addGigBtn = document.getElementById('addGigBtn');
const gigList = document.getElementById('gigList');
const overallIncomeDisplay = document.getElementById('overallIncome');
const overallExpensesDisplay = document.getElementById('overallExpenses');

// Add income to the total
addIncomeBtn.addEventListener('click', () => {
    const income = parseFloat(incomeAmount.value);
    if (!isNaN(income) && income > 0) {
        totalIncome += income;
        transactions.push({ type: 'Income', amount: income });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        incomeAmount.value = '';
        updateDashboard();
    }
});

// Add expense to the total
addExpenseBtn.addEventListener('click', () => {
    const expense = parseFloat(expenseAmount.value);
    if (!isNaN(expense) && expense > 0) {
        totalExpenses += expense;
        transactions.push({ type: 'Expense', amount: expense });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        expenseAmount.value = '';
        updateDashboard();
    }
});

// Set monthly budget
setBudgetBtn.addEventListener('click', () => {
    const budget = parseFloat(monthlyBudgetAmount.value);
    if (!isNaN(budget) && budget > 0) {
        monthlyBudget = budget;
        updateDashboard();
    }
});

// Add hustle (gig)
addGigBtn.addEventListener('click', () => {
    const name = gigName.value.trim();
    const income = parseFloat(gigIncome.value);
    const goal = parseFloat(gigGoal.value);

    if (name && !isNaN(income) && !isNaN(goal)) {
        const newGig = { name, income, goal };
        gigs.push(newGig);
        localStorage.setItem('gigs', JSON.stringify(gigs));
        gigName.value = '';
        gigIncome.value = '';
        gigGoal.value = '';
        updateGigList();
    }
});

// Update dashboard view
function updateDashboard() {
    // Update transaction list
    transactionList.innerHTML = '';
    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.type}: $${transaction.amount.toFixed(2)}`;
        transactionList.appendChild(li);
    });

// Update income and expense totals
    overallIncomeDisplay.textContent = `$${totalIncome.toFixed(2)}`;
    overallExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;

// Display budget and remaining balance
    if (monthlyBudget > 0) {
        const remaining = monthlyBudget - totalExpenses;
        document.querySelector('.summary-section').innerHTML += 
            `<h4>Remaining Budget: $${remaining.toFixed(2)}</h4>`;
    }
}
// Update gig list view
function updateGigList() {
    gigList.innerHTML = '';
    gigs.forEach((gig) => {
        const li = document.createElement('li');
        li.textContent = `${gig.name} | Income: $${gig.income.toFixed(2)} | Goal: $${gig.goal.toFixed(2)}`;
        gigList.appendChild(li);
    });
}

// Initial dashboard load
updateDashboard();
updateGigList();