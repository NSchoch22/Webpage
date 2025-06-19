
def get_float_input(prompt):
    while True:
        try:
            return float(input(prompt + ": $"))
        except ValueError:
            print("Please enter a valid number.")

# Step 1: Get Salary
salary = get_float_input("Enter your annual salary")

# Step 2: Get expenses
print("\nPlease enter your monthly expenses")
rent = get_float_input("Rent")
groceries = get_float_input("Groceries")
utilities = get_float_input("Utilities")
subscriptions = get_float_input("Subscriptions")

# Step 3: Calculations
total_income = salary
total_expenses = rent + groceries + utilities+subscriptions
balance = total_income-total_expenses

# Step 4: Output Summary
print("\n--- Budget Summary ---")
print(f"Gross Yearly Salary: ${total_income:.2f}")
print(f"Total Expenses:      ${total_expenses:} ")
print(f"Remaining Balance:${balance:.2f}")

if balance < 0:
    print("⚠️ You're over budget!")
else:
    print("✅ You're within your budget!")