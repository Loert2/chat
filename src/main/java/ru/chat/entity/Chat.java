package ru.chat.entity;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "chats")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<User> users;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "recipientChat")
    private List<Message> messages;
}
