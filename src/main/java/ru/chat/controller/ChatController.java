package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.chat.entity.Chat;
import ru.chat.service.ChatService;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;

    @RequestMapping(value = "/addChat", method = RequestMethod.POST)
    public Chat addChat(@RequestBody String chatName) {
        Chat chatNew = chatService.addChat(chatName);
        return chatNew;
    }

    @RequestMapping(value = "/deleteChat/{id}", method = RequestMethod.GET)
    public void deleteChat(@PathVariable Long id) {
        chatService.deleteChat(id);
    }
}
