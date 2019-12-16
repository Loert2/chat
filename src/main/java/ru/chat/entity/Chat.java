package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_chat")
    protected Long idChat;

    @Column
    private String name;

    //@OneToMany(fetch = FetchType.EAGER, mappedBy = "recipientUser")
    //private List<User> users;
}
