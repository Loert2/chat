package ru.chat.model;

import lombok.Data;

@Data
public class Event {
    private EventType type;
    private ChatType chatType;
    private String user;
    private String recipient;
    private String text;
}
