package ru.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageReply {
    private TypeOfNotice type;
    private String text;
}
