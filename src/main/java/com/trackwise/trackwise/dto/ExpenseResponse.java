package com.trackwise.trackwise.dto;

import com.trackwise.trackwise.entity.Expense;

public class ExpenseResponse {

    private Expense expense;
    private String warning;

    public ExpenseResponse(Expense expense, String warning) {
        this.expense = expense;
        this.warning = warning;
    }

    public Expense getExpense() {
        return expense;
    }

    public String getWarning() {
        return warning;
    }
}