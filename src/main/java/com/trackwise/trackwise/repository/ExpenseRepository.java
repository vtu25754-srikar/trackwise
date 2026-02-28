package com.trackwise.trackwise.repository;

import com.trackwise.trackwise.entity.Expense;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);
    
    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND MONTH(e.date) = :month AND YEAR(e.date) = :year")
    List<Expense> findUserMonthlyExpenses(Long userId, int month, int year);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double totalExpenseByUser(@Param("userId") Long userId);
}