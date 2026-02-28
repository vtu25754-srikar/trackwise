const API_URL = "http://localhost:9090/api/expenses";

const user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}
function loadCategories() {
    fetch("http://localhost:9090/api/categories")
        .then(res => res.json())
        .then(categories => {
            const dropdown = document.getElementById("categoryId");

            categories.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.id;        // backend id
                option.textContent = cat.name; // visible name
                dropdown.appendChild(option);
            });
        });
}
window.onload = function () {
    loadExpenses();
	loadCategories();
};



function loadExpenses() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    fetch(`http://localhost:9090/api/expenses/user/${user.id}`)
        .then(res => res.json())
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

    const expenseData = {
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        date: document.getElementById("date").value,
        user: { id: user.id },
        category: { 
            id: parseInt(document.getElementById("categoryId").value)
        }
    };

    console.log("Sending:", expenseData); // DEBUG

    fetch("http://localhost:9090/api/expenses", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(expenseData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to add expense");
        }
        return res.json();
    })
    .then(data => {
        alert("Expense Added Successfully!");
        loadExpenses();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error adding expense");
    });
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

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}