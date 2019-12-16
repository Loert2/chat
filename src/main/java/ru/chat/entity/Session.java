package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "session")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_session")
    protected Long idSession;

    @Column
    private Boolean status;

    @Column
    private LocalDateTime updatedAt;

    //@OneToMany
    //private List<User> users;
}
