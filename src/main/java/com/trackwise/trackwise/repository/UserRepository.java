package com.trackwise.trackwise.repository;
import java.util.Optional;
import com.trackwise.trackwise.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}
