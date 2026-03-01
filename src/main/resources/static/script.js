const API_URL = "http://localhost:9090/api/expenses";

// Get logged user
const user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

/* ===============================
   LOAD CATEGORIES
================================= */
function loadCategories() {
    fetch("http://localhost:9090/api/categories")
        .then(res => res.json())
        .then(categories => {
            const dropdown = document.getElementById("categoryId");


            categories.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.id;
                option.textContent = cat.name;
                dropdown.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading categories:", err));
}

/* ===============================
   LOAD EXPENSES
================================= */
function loadExpenses() {

    fetch(`${API_URL}/user/${user.id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load expenses");
            }
            return res.json();
        })
        .then(expenses => {

            let total = 0;
            expenses.forEach(exp => total += exp.amount);

            if (total > user.monthlyLimit) {
                showLimitWarning(total);
            }

            const table = document.getElementById("expenseTable");
            table.innerHTML = "";

            expenses.forEach(expense => {

                const row = `
                    <tr>
                        <td>${expense.title}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.date}</td>
                        <td>${expense.category ? expense.category.name : ''}</td>
                        <td class="actions">
                            <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                        </td>
                    </tr>
                `;

                table.innerHTML += row;
            });
        })
        .catch(err => {
            console.error("Error loading expenses:", err);
        });
}

/* ===============================
   SAVE (ADD / UPDATE)
================================= */
function saveExpense() {

    const expenseId = document.getElementById("expenseId").value;

    const expenseData = {
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        date: document.getElementById("date").value,
        user: { id: user.id },
        category: {
            id: parseInt(document.getElementById("categoryId").value)
        }
    };

    let url = API_URL;
    let method = "POST";

    if (expenseId) {
        url = `${API_URL}/${expenseId}`;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to save expense");
        }
        return res.json();  // backend returns updated Expense
    })
    .then(() => {
        alert(expenseId ? "Expense Updated Successfully!" : "Expense Added Successfully!");
        resetForm();
        loadExpenses();
    })
    .catch(error => {
        console.error("Error saving expense:", error);
        alert("Error saving expense");
    });
}

/* ===============================
   EDIT EXPENSE
================================= */
function editExpense(id) {

    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(expense => {

            document.getElementById("expenseId").value = expense.id;
            document.getElementById("title").value = expense.title;
            document.getElementById("amount").value = expense.amount;
            document.getElementById("date").value = expense.date;
            document.getElementById("categoryId").value =
                expense.category ? expense.category.id : "";

            document.getElementById("saveBtn").innerText = "Update Expense";
            document.getElementById("cancelBtn").style.display = "inline";
        })
        .catch(err => console.error("Error loading expense:", err));
}

/* ===============================
   DELETE EXPENSE
================================= */
function deleteExpense(id) {

    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Delete failed");
        }
        alert("Expense Deleted!");
        loadExpenses();
    })
    .catch(err => {
        console.error("Delete error:", err);
        alert("Error deleting expense");
    });
}

/* ===============================
   RESET FORM
================================= */
function resetForm() {

    document.getElementById("expenseId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("categoryId").value = "";

    document.getElementById("saveBtn").innerText = "Add Expense";
    document.getElementById("cancelBtn").style.display = "none";
}

function cancelEdit() {
    resetForm();
}

/* ===============================
   LOGOUT
================================= */
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

/* ===============================
   LIMIT WARNING
================================= */
function showLimitWarning(total) {
    document.getElementById("warningText").innerText =
        `You have spent ₹${total}, which exceeds your monthly limit of ₹${user.monthlyLimit}`;

    document.getElementById("warningModal").style.display = "block";
}

function closeModal() {
    document.getElementById("warningModal").style.display = "none";
}

/* ===============================
   ON PAGE LOAD
================================= */
window.onload = function () {
    loadCategories();
    loadExpenses();
};