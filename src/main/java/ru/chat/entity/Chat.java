package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long idChat;

    @Column
    private String name;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "chats")
    private List<User> users;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "recipientChat")
    private List<Message> messages;
}
