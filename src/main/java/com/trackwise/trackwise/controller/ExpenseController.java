package com.trackwise.trackwise.controller;

import com.trackwise.trackwise.dto.ExpenseResponse;
import com.trackwise.trackwise.entity.Expense;
import com.trackwise.trackwise.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // CREATE
    @PostMapping
    public ExpenseResponse addExpense(@RequestBody Expense expense) {
    	System.out.println("Expense received: " + expense);
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
    
 // GET EXPENSES BY USER
    @GetMapping("/user/{userId}")
    public List<Expense> getUserExpenses(@PathVariable Long userId) {
        return expenseService.getExpensesByUser(userId);
    }
    
    @GetMapping("/user/{userId}/status")
    public String checkUserSpending(@PathVariable Long userId) {
        return expenseService.checkOverspending(userId);
    }

    // TOTAL BY USER
    @GetMapping("/total/{userId}")
    public Double getTotal(@PathVariable Long userId) {
        return expenseService.getTotalExpenseByUser(userId);
    }
}