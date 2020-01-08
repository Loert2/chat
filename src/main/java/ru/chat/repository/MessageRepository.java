package ru.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.chat.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where " +
            "(m.sender.fullName = :sender and m.recipientUser.fullName = :recipient)" +
            "or (m.sender.fullName = :recipient and m.recipientUser.fullName = :sender) order by m.time asc")
    List<Message> findAllMessagesForSenderAndRecipient(@Param("sender") String sender, @Param("recipient") String recipient);
}
