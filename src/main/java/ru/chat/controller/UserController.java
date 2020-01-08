package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.chat.entity.User;
import ru.chat.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = {"/login" }, method = RequestMethod.POST)
    public User login(@RequestBody User user) {
        User addOrLoadUser = userService.login(user);
        return addOrLoadUser;
    }

    @RequestMapping(value = "/getListUser", method = RequestMethod.GET)
    public List<User> getListUser() {
        return userService.getUser();
    }
}

