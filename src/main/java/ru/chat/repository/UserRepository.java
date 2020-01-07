package ru.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.chat.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByFullName(String fullName);
    boolean existsByFullName(String login);
}
