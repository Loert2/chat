package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.chat.service.ChatService;

//TODO придется переделать
@RestController
public class MessageController {

    @Autowired
    ChatService chatService;

    @RequestMapping(value = {"/massagesChat" }, method = RequestMethod.GET)
    public Model getMessage(Model model, @RequestBody String login) {
        model.addAttribute("currentUser", login);
        model.addAttribute("chats", chatService.getChat());
        model.addAttribute("users", chatService.getUser());
        return model;
    }
}
