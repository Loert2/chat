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
    protected Long id;

    @Column
    private Boolean status;

    @Column
    private LocalDateTime updatedAt;

    @Column
    private String webSocketSession;

    @JoinColumn
    @ManyToOne(fetch = FetchType.EAGER)
    private User sender;

}
