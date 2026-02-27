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
			console.log(data)
            data.forEach(expense => {
                const row = `
                    <tr>
                        <td>${expense.id}</td>
                        <td>${expense.title}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.date}</td>
                        <td>${expense.user ? expense.user.id : ''}</td>
                        <td>${expense.category?.id || ''}</td>
                        <td class="actions">
                            <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                        </td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        });
}

function saveExpense() {

    const id = document.getElementById("expenseId").value;
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const userId = document.getElementById("userId").value;
    const categoryId = document.getElementById("categoryId").value;

    const expenseData = {
        title: title,
        amount: parseFloat(amount),
        date: date,
        user: { id: parseInt(userId) },
        category: { id: parseInt(categoryId) }
    };

    if (id) {
        // UPDATE
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expenseData)
        })
        .then(() => {
            alert("Expense Updated!");
            resetForm();
            loadExpenses();
        });
    } else {
        // CREATE
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expenseData)
        })
        .then(() => {
            alert("Expense Added!");
            resetForm();
            loadExpenses();
        });
    }
}

function editExpense(id) {

    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(expense => {

            document.getElementById("expenseId").value = expense.id;
            document.getElementById("title").value = expense.title;
            document.getElementById("amount").value = expense.amount;
            document.getElementById("date").value = expense.date;
            document.getElementById("userId").value = expense.user ? expense.user.id : "";
            document.getElementById("categoryId").value = expense.category ? expense.category.id : "";

            document.getElementById("saveBtn").innerText = "Update Expense";
            document.getElementById("cancelBtn").style.display = "inline";
        });
}

function deleteExpense(id) {

    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Expense Deleted!");
        loadExpenses();
    });
}

function cancelEdit() {
    resetForm();
}

function resetForm() {

    document.getElementById("expenseId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("userId").value = "";
    document.getElementById("categoryId").value = "";

    document.getElementById("saveBtn").innerText = "Add Expense";
    document.getElementById("cancelBtn").style.display = "none";
}