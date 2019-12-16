package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;

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
}
