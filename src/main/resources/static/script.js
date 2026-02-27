const API_URL = "http://localhost:9090/api/expenses";

window.onload = function () {
    loadExpenses();
};

function loadExpenses() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("expenseTable");
            table.innerHTML = "";

            if (data.length === 0) {
                table.innerHTML = `
                    <tr>
                        <td colspan="4">No expenses found</td>
                    </tr>
                `;
                return;
            }

            data.forEach(expense => {
                const row = `
                    <tr>
                        <td>${expense.id}</td>
                        <td>${expense.title}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.date}</td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        })
        .catch(error => {
            alert("Error loading expenses "+error);
            console.error(error);
        });
}

function addExpense() {

    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const userIdInput = document.getElementById("userId");
    const categoryIdInput = document.getElementById("categoryId");

    const title = titleInput.value.trim();
    const amount = amountInput.value.trim();
    const date = dateInput.value;
    const userId = userIdInput.value.trim();
    const categoryId = categoryIdInput.value.trim();

    // =============================
    // 🔎 VALIDATION
    // =============================

    if (title === "") {
        alert("Title cannot be empty");
        return;
    }

    if (amount === "" || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (date === "") {
        alert("Select date");
        return;
    }

    if (userId === "" || isNaN(userId)) {
        alert("Enter valid User ID");
        return;
    }

    if (categoryId === "" || isNaN(categoryId)) {
        alert("Enter valid Category ID");
        return;
    }

    // =============================
    // 🚀 SEND DATA
    // =============================

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: parseFloat(amount),
            date: date,
			title: title,
            category: { id: parseInt(categoryId) },
			user: { id: parseInt(userId) }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add expense");
        }
        return response.json();
    })
    .then(data => {
        alert("Expense added successfully!");

        titleInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
        userIdInput.value = "";
        categoryIdInput.value = "";

        loadExpenses();
    })
    .catch(error => {
        alert("Error adding expense");
        console.error(error);
    });
}