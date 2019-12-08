package ru.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "session")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long idSession;

    @Column
    private Boolean status;

    @Column
    private LocalDateTime updatedAt;

    @OneToMany
    private List<User> users;
}
