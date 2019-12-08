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
    protected Long idUser;
    /**
     * Электронная почта пользователя
     */
    @Column
    private String eMail;
    /**
     * Имя пользователя
     */
    @Column
    private String fullName;
    /**
     * Пароль пользователя
     */
    @Column
    private String password;
    /**
     * Чаты пользователя
     */
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="chat_user",
            joinColumns = @JoinColumn(name="id_user", referencedColumnName="id_user"),
            inverseJoinColumns = @JoinColumn(name="id_chat", referencedColumnName="id_chat")
    )
    private List<Chat> chats;
    /**
     * Сообщения пользователя
     */
    @OneToMany
    private List<Message> messages;
}
