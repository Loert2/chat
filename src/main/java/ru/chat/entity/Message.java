package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long idMessage;

    @Column
    private String text;

    @Column
    private LocalDateTime time;

    @JoinColumn
    @ManyToOne(fetch = FetchType.EAGER)
    private Chat recipientChat;
}
