// Budget_script.js
// initialize Budget Chart to be called.
let budgetChart = null;

document.getElementById("budgetForm").addEventListener("submit", function (event) {
  event.preventDefault();
 
  const salary = parseFloat(document.getElementById("salary").value) || 0;
  const rent = parseFloat(document.getElementById("rent").value) || 0;
  const groceries = parseFloat(document.getElementById("groceries").value) || 0;
  const utilities = parseFloat(document.getElementById("utilities").value) || 0;
  const subscriptions = parseFloat(document.getElementById("subscriptions").value) || 0;
  const other = parseFloat(document.getElementById("other").value) || 0;

  const totalExpenses = rent + groceries + utilities + subscriptions + other;
  const monthlySalary = salary/12;
  const balance = monthlySalary - totalExpenses;

  let resultText = `
    <h2>Budget Summary</h2>
    <p>Monthly Income: $${monthlySalary.toFixed(2)}</p>
    <p>Total Monthly Expenses: $${totalExpenses.toFixed(2)}</p>
    <p><strong>Remaining Balance: $${balance.toFixed(2)}</strong></p>
  `;

  if (balance < 0) {
    resultText += `<p style="color: red;">⚠️ You're over budget!</p>`;
  } else {
    resultText += `<p style="color: green;">✅ You're within your budget!</p>`;
  }

  document.getElementById("result").innerHTML = resultText;

  // Create chart data
  const data = {
    labels: ["Rent", "Groceries", "Utilities", "Subscriptions", "Other", "Remaining Balance"],
    datasets: [{
      data: [rent, groceries, utilities, subscriptions, other, balance > 0 ? balance : 0],
      backgroundColor: [
        "#f94144", "#f3722c", "#f8961e", "#90be6d", "#577590", "#43aa8b"
      ]
    }]
  };

  // Destroy existing chart if it exists
  if (budgetChart) {
    budgetChart.destroy();
  }

  const ctx = document.getElementById("budgetChart").getContext("2d");
  budgetChart = new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: "Spending Breakdown"
        }
      }
    }
  });

// Export Button (CSV) 
  document.getElementById("exportBtn").addEventListener("click", function () {
  const salary = parseFloat(document.getElementById("salary").value) || 0;
  const rent = parseFloat(document.getElementById("rent").value) || 0;
  const groceries = parseFloat(document.getElementById("groceries").value) || 0;
  const utilities = parseFloat(document.getElementById("utilities").value) || 0;
  const subscriptions = parseFloat(document.getElementById("subscriptions").value) || 0;
  const other = parseFloat(document.getElementById("other").value) || 0;

  const totalExpenses = rent + groceries + utilities + subscriptions + other;
  const balance = salary - totalExpenses;

  const rows = [
    ["Category", "Amount ($)"],
    ["Salary", salary],
    ["Rent", rent],
    ["Groceries", groceries],
    ["Utilities", utilities],
    ["Subscriptions", subscriptions],
    ["Other Expenses", other],
    ["Total Expenses", totalExpenses],
    ["Remaining Balance", balance]
  ];

  let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(row => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "budget_summary.csv");
  document.body.appendChild(link); // Required for Firefox

  link.click();
  document.body.removeChild(link);
});


//Download option for Chart
document.getElementById("downloadChartBtn").addEventListener("click", function () {
  const canvas = document.getElementById("budgetChart");
  const imageURL = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "budget_chart.png";
  link.click();
});

//Gather data for PDF export
document.getElementById("exportPdfBtn").addEventListener("click", async function () {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();
  
  // Capture the budget summary
  const summaryElement = document.getElementById("result");

  await html2canvas(summaryElement).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, imgHeight);
  });

  // Capture the chart
  const chartCanvas = document.getElementById("budgetChart");
  const chartImage = chartCanvas.toDataURL("image/png");
  pdf.addPage(); // Add new page for the chart
  pdf.addImage(chartImage, 'PNG', 10, 10, 180, 120); // Adjust size as needed

  // Save the PDF
  pdf.save("budget_report.pdf");
});

});
