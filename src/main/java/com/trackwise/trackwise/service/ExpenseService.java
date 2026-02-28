package com.trackwise.trackwise.service;

import com.trackwise.trackwise.dto.ExpenseResponse;
import com.trackwise.trackwise.entity.Category;
import com.trackwise.trackwise.entity.Expense;
import com.trackwise.trackwise.entity.User;
import com.trackwise.trackwise.repository.CategoryRepository;
import com.trackwise.trackwise.repository.ExpenseRepository;
import com.trackwise.trackwise.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository,
                          UserRepository userRepository,
                          CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    // CREATE
    public ExpenseResponse saveExpense(Expense expense) {

        Long userId = expense.getUser().getId();
        Long categoryId = expense.getCategory().getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        expense.setUser(user);
        expense.setCategory(category);
        
     // SAVE EXPENSE
        Expense savedExpense = expenseRepository.save(expense);

        // CHECK TOTAL
        Double total = expenseRepository.totalExpenseByUser(userId);
        if (total == null) total = 0.0;

        String warning = null;

        if (user.getMonthlyLimit() != null && total > user.getMonthlyLimit()) {
            warning = "⚠ Monthly limit exceeded!";
        }

        return new ExpenseResponse(savedExpense, warning);

        
    }

    // READ ALL
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
    
    public List<Expense> getExpensesByUser(Long userId) {
        return expenseRepository.findByUserId(userId);
    }
    
    // READ BY ID
    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    // UPDATE
    public Expense updateExpense(Long id, Expense expense) {

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        User user = userRepository.findById(expense.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(expense.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existingExpense.setTitle(expense.getTitle());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setDate(expense.getDate());
        existingExpense.setUser(user);
        existingExpense.setCategory(category);

        return expenseRepository.save(existingExpense);
    }

    // DELETE
    public void deleteExpense(Long id) {

        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found with id: " + id);
        }

        expenseRepository.deleteById(id);
    }
    
    public String checkOverspending(Long userId) {

        Double total = expenseRepository.totalExpenseByUser(userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (total == null) {
            total = 0.0;
        }

        if (user.getMonthlyLimit() != null && total > user.getMonthlyLimit()) {
            return "⚠ WARNING: Overspending detected!";
        }

        return "Within budget";
    }

    // TOTAL BY USER
    public Double getTotalExpenseByUser(Long userId) {
        return expenseRepository.totalExpenseByUser(userId);
    }
}