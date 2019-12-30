package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "system_user")
public class User {
    /**
     * Идентификатор пользователя
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    /**
     * Электронная почта пользователя
     */
    @Column(name = "e_mail")
    private String eMail;
    /**
     * Имя пользователя
     */
    @Column(name = "full_name")
    private String fullName;
    /**
     * Пароль пользователя
     */
    @Column(name = "password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="chat_user",
            joinColumns = @JoinColumn(name="id_user", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name="id_chat", referencedColumnName="id")
    )
    private List<Chat> chats;

    @OneToMany
    private List<Message> messages;
}
