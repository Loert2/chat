package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.chat.dto.ChatDTO;
import ru.chat.entity.Chat;
import ru.chat.service.ChatService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;

    @RequestMapping(value = "/addChat", method = RequestMethod.POST)
    public List<Chat> addChat(@RequestBody String chatName) {
        List<Chat> chatList = chatService.addChat(chatName);
        return chatList;
    }

    @RequestMapping(value = "/deleteChat/{id}", method = RequestMethod.GET)
    public void deleteChat(@PathVariable Long id) {
        chatService.deleteChat(id);
    }

    @RequestMapping(value = "/getListChat", method = RequestMethod.GET)
    public List<ChatDTO> getListChat() {
        List<Chat> chatList = chatService.getChat();
        List<ChatDTO> chatListDTO = new ArrayList<>();
        for (Chat c : chatList) {
            ChatDTO chatDTO = new ChatDTO();
            chatDTO.setId(c.getId());
            chatDTO.setName(c.getName());
            chatListDTO.add(chatDTO);
        }
        return chatListDTO;
    }
}
