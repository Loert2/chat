package ru.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.chat.dto.ChatDTO;
import ru.chat.dto.UserDTO;
import ru.chat.entity.Chat;
import ru.chat.entity.User;
import ru.chat.service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = {"/login" }, method = RequestMethod.POST)
    public UserDTO login(@RequestBody User user) {
        User addOrLoadUser = userService.login(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(addOrLoadUser.getId());
        userDTO.setFullName(addOrLoadUser.getFullName());
        return userDTO;
    }

    @RequestMapping(value = "/getListUser", method = RequestMethod.GET)
    public List<UserDTO> getListUser() {
        List<User> userList = userService.getUser();
        List<UserDTO> userListDTO = new ArrayList<>();
        for (User c : userList) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(c.getId());
            userDTO.setFullName(c.getFullName());
            userListDTO.add(userDTO);
        }
        return userListDTO;
    }
}

