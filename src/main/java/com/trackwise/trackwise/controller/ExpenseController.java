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

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/total/{userId}")
    public Double getTotal(@PathVariable Long userId) {
        return expenseService.getTotalExpenseByUser(userId);
    }
}