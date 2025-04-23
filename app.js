    let totalIncome = 0;
    let totalExpenses = 0;
    let totalSavings = 0;

    const incomeSpan = document.getElementById("totalIncome");
    const expenseSpan = document.getElementById("totalExpenses");
    const savingsSpan = document.getElementById("totalSavings");
    const balanceSpan = document.getElementById("availableBalance");
    const gigList = document.getElementById("gigList");
    const expenseList = document.getElementById("expenseList");
    const toast = document.getElementById("toast");

    const financeChart = new Chart(document.getElementById("financeChart"), {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenses', 'Savings'],
        datasets: [{
          label: 'Amount in $',
          backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
          data: [0, 0, 0],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    function updateChart() {
      financeChart.data.datasets[0].data = [
        totalIncome,
        totalExpenses,
        totalSavings
      ];
      financeChart.update();
    }

    function updateBalance() {
      const availableBalance = totalIncome - totalExpenses - totalSavings;

      incomeSpan.textContent = totalIncome.toFixed(2);
      expenseSpan.textContent = totalExpenses.toFixed(2);
      savingsSpan.textContent = totalSavings.toFixed(2);
      balanceSpan.textContent = availableBalance.toFixed(2);

      updateChart();
    }

    function showToast(message) {
      toast.textContent = message;
      toast.style.display = "block";
      setTimeout(() => toast.style.display = "none", 3000);
    }

    function addToList(container, text) {
      const li = document.createElement("li");
      li.textContent = text;
      container.appendChild(li);
    }

    document.getElementById("addHustleBtn").addEventListener("click", () => {
      const name = prompt("Enter Hustle/Gig Name:");
      const amount = parseFloat(prompt("Enter Income Amount:"));

      if (name && !isNaN(amount)) {
        const savings = amount * 0.10;
        totalIncome += amount;
        totalSavings += savings;

        addToList(gigList, `💼 ${name} - $${amount.toFixed(2)} (Saved $${savings.toFixed(2)})`);
        showToast(`Hustle added: ${name} | Saved 10%`);
        updateBalance();
      }
    });

    document.getElementById("addExpenseBtn").addEventListener("click", () => {
      const name = prompt("Enter Expense Name:");
      const amount = parseFloat(prompt("Enter Expense Amount:"));

      if (name && !isNaN(amount)) {
        totalExpenses += amount;

        addToList(expenseList, `📉 ${name} - $${amount.toFixed(2)}`);
        showToast(`Expense added: ${name}`);
        updateBalance();
      }
    });

    // Generate invoice functionality
        document.getElementById('generateInvoiceBtn').addEventListener('click', function() {
            const netIncome = totalIncome - totalExpenses;
            const savings = totalIncome * 0.1;  // 10% of income as savings

            // Update invoice details (without including savings in the invoice)
            document.getElementById('invoiceTotalIncome').innerText = totalIncome.toFixed(2);
            document.getElementById('invoiceTotalExpenses').innerText = totalExpenses.toFixed(2);
            document.getElementById('invoiceNetIncome').innerText = netIncome.toFixed(2);

            // Show the invoice section
            document.getElementById('invoiceDetails').style.display = 'block';
        });
