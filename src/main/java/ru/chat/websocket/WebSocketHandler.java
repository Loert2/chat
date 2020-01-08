package ru.chat.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.chat.entity.Chat;
import ru.chat.entity.Message;
import ru.chat.entity.User;
import ru.chat.model.*;
import ru.chat.repository.ChatRepository;
import ru.chat.repository.MessageRepository;
import ru.chat.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;

import static ru.chat.model.EventType.JOIN;
import static ru.chat.model.EventType.MESSAGE;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private Set<ChatSession> sessions = new CopyOnWriteArraySet<>();
    private Set<String> activeUser = new HashSet<>();

    @Autowired
    public WebSocketHandler(ObjectMapper objectMapper, MessageRepository messageRepository, UserRepository userRepository, ChatRepository chatRepository) {
        this.objectMapper = objectMapper;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }

    private TextMessage getMessage(TypeOfNotice type, String text){
        MessageReply message = new MessageReply(type, text);
        try {
            return new TextMessage(objectMapper.writeValueAsString(message));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws IOException {
        Event event = objectMapper.readValue(message.getPayload(), Event.class);
        switch (event.getType()) {
            case JOIN:
                sessions.add(new ChatSession(
                        event.getUser(),
                        event.getRecipient(),
                        event.getChatType(),
                        session
                ));
                activeUser.forEach(name -> {
                    try {
                        session.sendMessage(getMessage(TypeOfNotice.NEW_USER, name));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
                activeUser.add(event.getUser());
                for (ChatSession s : sessions) {
                    s.getWebSocketSession().sendMessage(getMessage(TypeOfNotice.NEW_USER, event.getUser()));
                }
                if (event.getChatType() == ChatType.PRIVATE) {
                    for (Message chatMessage : messageRepository.findAllMessagesForSenderAndRecipient(event.getUser(), event.getRecipient())) {
                        if (chatMessage.getSender().getFullName().equals(event.getUser())) {
                            session.sendMessage(getMessage(TypeOfNotice.MESSAGE, chatMessage.getText()));
                        } else {
                            session.sendMessage(getMessage(TypeOfNotice.MESSAGE, chatMessage.getSender().getFullName() + " : " + chatMessage.getText()));
                        }
                    }
                } else {
                    Chat chat = chatRepository.findChatByName(event.getRecipient());
                    User user = userRepository.findByFullName(event.getUser());
                    int number = user.getChats().indexOf(chat);
                    //TODO условия contains и indexOf не работают из-за persistenceBug массивов chats и message в user
                    if (!findChatName(chat.getName(), user.getChats())) {
                        user.getChats().add(chat);
                        userRepository.save(user);
                    }
                    for (ChatSession chatSession:sessions) {
                        if (chatSession.getSender().equals(event.getUser())
                                && chatSession.getRecipient().equals(event.getRecipient())
                                && !chatSession.getWebSocketSession().equals(session)){
                            activeUser.remove(chatSession.getSender());
                            sessions.remove(chatSession);
                            for (ChatSession s : sessions) {
                                s.getWebSocketSession().sendMessage(getMessage(TypeOfNotice.DELETE_USER, chatSession.getSender()));
                            }
                        }
                    }
                    for (Message chatMessage : chat.getMessages()) {
                        session.sendMessage(getMessage(TypeOfNotice.MESSAGE, chatMessage.getSender().getFullName() + " : " + chatMessage.getText()));
                    }
                }
                break;
            case MESSAGE:
                for (ChatSession chatSession : sessions) {
                    if(chatSession.getWebSocketSession().getId().equals(session.getId())) {

                        if (chatSession.getChatType() == ChatType.PRIVATE) {
                            Message messageToSave = new Message();
                            messageToSave.setTime(LocalDateTime.now());
                            messageToSave.setSender(userRepository.findByFullName(chatSession.getSender()));
                            messageToSave.setRecipientUser(userRepository.findByFullName(chatSession.getRecipient()));
                            messageToSave.setText(event.getText());
                            messageRepository.save(messageToSave);

                            session.sendMessage(getMessage(TypeOfNotice.MESSAGE, event.getText()));
                            ChatSession recipientChatSession = null;
                            ChatSession recipientChatSessionPush = null;
                            for (ChatSession s : sessions) {
                                if (s.getSender().equals(chatSession.getRecipient())) {
                                    recipientChatSessionPush = s;
                                    if (s.getRecipient().equals(chatSession.getSender())){
                                        recipientChatSession = s;
                                    }
                                }
                            }
                            if (recipientChatSession != null) {
                                recipientChatSession.getWebSocketSession().sendMessage(
                                        getMessage(TypeOfNotice.MESSAGE, chatSession.getSender() + " : " + event.getText())
                                );
                            }
                            if (recipientChatSessionPush != null) {
                                recipientChatSessionPush.getWebSocketSession().sendMessage(
                                        getMessage(TypeOfNotice.PUSH_MESSAGE, chatSession.getSender() + " : " + event.getText())
                                );
                            }
                        } else {
                            Message messageToSave = new Message();
                            messageToSave.setTime(LocalDateTime.now());
                            messageToSave.setSender(userRepository.findByFullName(chatSession.getSender()));
                            messageToSave.setRecipientChat(chatRepository.findChatByName(chatSession.getRecipient()));
                            messageToSave.setText(event.getText());
                            messageRepository.save(messageToSave);

                            List<ChatSession> recipientChatSessions = new ArrayList<>();
                            for (ChatSession s : sessions) {
                                if (
                                        s.getRecipient().equals(chatSession.getRecipient())
                                ) {
                                    recipientChatSessions.add(s);
                                }
                            }
                            if (!CollectionUtils.isEmpty(recipientChatSessions)) {
                                for (ChatSession recipientChatSession : recipientChatSessions) {
                                    recipientChatSession.getWebSocketSession().sendMessage(
                                            getMessage(TypeOfNotice.MESSAGE, chatSession.getSender() + " : " + event.getText())
                                    );
                                }
                            }
                            messageToSave.getRecipientChat().getUsers().stream()
                                    .map(u -> {
                                        for (ChatSession chatSessionPush : sessions) {
                                            if (u.getFullName().equals(chatSessionPush.getSender())) {
                                                return chatSessionPush;
                                            }
                                        }
                                        return null;
                                    })
                                    .filter(Objects::nonNull)
                                    .forEach(c -> {
                                        try {
                                            c.getWebSocketSession().sendMessage(
                                                    getMessage(TypeOfNotice.PUSH_MESSAGE, chatSession.getSender() + " : " + event.getText())
                                            );
                                        } catch (IOException e) {
                                            e.printStackTrace();
                                        }
                                    });
                        }
                    }
                }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        for (ChatSession chatSession :sessions) {
            if (chatSession.getWebSocketSession().getId().equals(session.getId())){
                activeUser.remove(chatSession.getSender());
                sessions.remove(chatSession);
                for (ChatSession s : sessions) {
                    s.getWebSocketSession().sendMessage(getMessage(TypeOfNotice.DELETE_USER, chatSession.getSender()));
                }
            }
        }
    }

    public boolean findChatName(
            String name, List<Chat> chats) {

        for (Chat chat : chats) {
            if (chat.getName().equals(name)) {
                return true;
            }
        }
        return false;
    }

}
