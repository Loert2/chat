package ru.chat.repository;

import org.springframework.stereotype.Repository;
import ru.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Chat findChatByName(String name);
    boolean existsByName(String name);
}
