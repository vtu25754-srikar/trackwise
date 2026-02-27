package com.trackwise.trackwise.controller;

import com.trackwise.trackwise.entity.Expense;
import com.trackwise.trackwise.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // CREATE
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    // READ ALL
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                 @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return "Expense deleted successfully";
    }

    // TOTAL BY USER
    @GetMapping("/total/{userId}")
    public Double getTotal(@PathVariable Long userId) {
        return expenseService.getTotalExpenseByUser(userId);
    }
}