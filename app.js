// Sample data for testing
const gigs = [];
let totalIncome = 0;
let totalExpenses = 0;
let monthlyBudget = 0;

// Add Hustle (Gig)
document.getElementById('addHustleBtn').addEventListener('click', () => {
    const gigName = prompt("Enter the name of the gig:");
    const gigIncome = parseFloat(prompt("Enter the income for this gig:"));
    const gigGoal = parseFloat(prompt("Enter the goal for this gig:"));
    
    if (gigName && !isNaN(gigIncome) && !isNaN(gigGoal)) {
        gigs.push({ name: gigName, income: gigIncome, goal: gigGoal });
        totalIncome += gigIncome;
        updateDashboard();
        showToast(`${gigName} added!`);
    }
});

// Set Monthly Budget
document.getElementById('setBudgetBtn').addEventListener('click', () => {
    monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value);
    if (!isNaN(monthlyBudget)) {
        updateDashboard();
        showToast('Monthly Budget set!');
    }
});

// Update the Dashboard
function updateDashboard() {
    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    updateGigList();
    updateGoalProgress();
    updateCharts();
}

// Update Gig List
function updateGigList() {
    const gigList = document.getElementById('gigList');
    gigList.innerHTML = '';
    gigs.forEach((gig) => {
        const li = document.createElement('li');
        li.textContent = `${gig.name} | Income: $${gig.income.toFixed(2)} | Goal: $${gig.goal.toFixed(2)}`;
        gigList.appendChild(li);
    });
}

// Update Goal Progress
function updateGoalProgress() {
    const progressContainer = document.getElementById('gigProgressBars');
    progressContainer.innerHTML = '';
    
    gigs.forEach((gig) => {
        const div = document.createElement('div');
        div.innerHTML = `${gig.name}: `;
        const progress = document.createElement('progress');
        progress.value = gig.income / gig.goal * 100;
        progress.max = 100;
        div.appendChild(progress);
        progressContainer.appendChild(div);
    });
}

// Update Charts
function updateCharts() {
    const incomeChart = new Chart(document.getElementById('incomeChart'), {
        type: 'bar',
        data: {
            labels: gigs.map(gig => gig.name),
            datasets: [{
                label: 'Income',
                data: gigs.map(gig => gig.income),
                backgroundColor: '#2ecc71',
                borderColor: '#27ae60',
                borderWidth: 1
            }]
        }
    });

    const expenseChart = new Chart(document.getElementById('expenseChart'), {
        type: 'bar',
        data: {
            labels: gigs.map(gig => gig.name),
            datasets: [{
                label: 'Expenses',
                data: gigs.map(gig => gig.goal - gig.income), // Placeholder for expenses
                backgroundColor: '#e74c3c',
                borderColor: '#c0392b',
                borderWidth: 1
            }]
        }
    });
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

// Initial dashboard load
updateDashboard();