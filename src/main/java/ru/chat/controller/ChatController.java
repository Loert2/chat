package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.chat.entity.Chat;
import ru.chat.service.ChatService;

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
    public List<Chat> getListChat() {
        return chatService.getChat();
    }
}
