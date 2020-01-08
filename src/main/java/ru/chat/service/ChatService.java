package ru.chat.service;

import org.springframework.stereotype.Service;
import ru.chat.entity.Chat;
import ru.chat.entity.User;
import ru.chat.repository.ChatRepository;
import ru.chat.repository.UserRepository;

import java.util.List;

@Service
public class ChatService {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public List<Chat> getChat(){
        return chatRepository.findAll();
    }

    public List<Chat> addChat(String chatName){
        if(!chatRepository.existsByName(chatName)) {
            Chat chat = new Chat();
            chat.setName(chatName);
            chatRepository.save(chat);
            List<Chat> chatList = chatRepository.findAll();
            return chatList;
        }
        return null;
    }

    public void deleteChat(Long id){
        chatRepository.deleteById(id);
    }
}
