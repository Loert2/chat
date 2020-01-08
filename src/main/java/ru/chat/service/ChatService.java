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

    public List<User> getUser(){
        return userRepository.findAll();
    }

    public Chat addChat(String name){
        if(!chatRepository.existsByName(name)) {
            Chat chat = new Chat();
            chat.setName(name);
            Chat chatNew = chatRepository.save(chat);
            return chatNew;
        }
        return null;
    }

    public void deleteChat(Long id){
        chatRepository.deleteById(id);
    }
}
