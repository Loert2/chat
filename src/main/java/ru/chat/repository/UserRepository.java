package ru.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.chat.entity.User;

public interface UserRepository  extends JpaRepository<User, Long> {
    User findByName(String fullName);
    boolean existsByName(String fullName);
}
