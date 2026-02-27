package com.trackwise.trackwise.repository;

import com.trackwise.trackwise.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
