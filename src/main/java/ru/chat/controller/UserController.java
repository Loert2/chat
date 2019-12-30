package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ru.chat.service.UserService;

@Controller
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = {"/login" }, method = RequestMethod.POST)
    public String login(@RequestParam String login, String password) {
        userService.login(login, password);
        return login;
    }

    @RequestMapping(value = {"/registration" }, method = RequestMethod.POST)
    public String registration(@RequestParam String login, String eMail, String password) {
        userService.registration(login, eMail, password);
        return login;
    }
}

