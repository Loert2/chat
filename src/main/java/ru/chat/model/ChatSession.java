package ru.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

@Data
@AllArgsConstructor
public class ChatSession {
    private String sender;
    private String recipient;
    private ChatType chatType;
    private WebSocketSession webSocketSession;
}
