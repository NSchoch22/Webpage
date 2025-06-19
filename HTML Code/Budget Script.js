// Budget_script.js
document.getElementById("budgetForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const salary = parseFloat(document.getElementById("salary").value) || 0;
  const rent = parseFloat(document.getElementById("rent").value) || 0;
  const groceries = parseFloat(document.getElementById("groceries").value) || 0;
  const utilities = parseFloat(document.getElementById("utilities").value) || 0;
  const subscriptions = parseFloat(document.getElementById("subscriptions").value) || 0;
  const other = parseFloat(document.getElementById("other").value) || 0;

  const totalExpenses = rent + groceries + utilities + subscriptions + other;
  const balance = salary - totalExpenses;

  let resultText = `
    <h2>Budget Summary</h2>
    <p>Total Income: $${salary.toFixed(2)}</p>
    <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
    <p><strong>Remaining Balance: $${balance.toFixed(2)}</strong></p>
  `;

  if (balance < 0) {
    resultText += `<p style="color: red;">⚠️ You're over budget!</p>`;
  } else {
    resultText += `<p style="color: green;">✅ You're within your budget!</p>`;
  }

  document.getElementById("result").innerHTML = resultText;
});
