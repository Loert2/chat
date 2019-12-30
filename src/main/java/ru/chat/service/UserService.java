package ru.chat.service;

import org.springframework.stereotype.Service;
import ru.chat.entity.User;
import ru.chat.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void login(String login, String password){
        if(!userRepository.existsByFullName(login)) {
            User user = new User();
            user.setFullName(login);
            user.setPassword(password);
            userRepository.save(user);
        }
    }

    /*public void registration(String login, String eMail, String password){
        if(!userRepository.existsByFullName(login)) {
            User user = new User();
            user.setFullName(login);
            user.setEMail(eMail);
            user.setPassword(password);
            userRepository.save(user);
        }
    }*/
}
