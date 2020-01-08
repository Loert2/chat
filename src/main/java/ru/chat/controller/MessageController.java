package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import ru.chat.service.ChatService;

@RestController
public class MessageController {

    @Autowired
    ChatService chatService;

}
