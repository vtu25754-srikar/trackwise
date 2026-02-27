package com.trackwise.trackwise.service;

import com.trackwise.trackwise.entity.Expense;
import com.trackwise.trackwise.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Double getTotalExpenseByUser(Long userId) {
        return expenseRepository.totalExpenseByUser(userId);
    }
}