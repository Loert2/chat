package ru.chat.service;

import org.springframework.stereotype.Service;
import ru.chat.entity.User;
import ru.chat.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(User user){
        if(!userRepository.existsByFullName(user.getFullName())) {
            User newUser = userRepository.save(user);
            return newUser;
        } else {
            User loadUser = userRepository.findByFullName(user.getFullName());
            return loadUser;
        }
    }

    public List<User> getUser(){
        return userRepository.findAll();
    }
}
