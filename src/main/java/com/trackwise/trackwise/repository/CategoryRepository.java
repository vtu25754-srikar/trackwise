package com.trackwise.trackwise.repository;

import com.trackwise.trackwise.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
