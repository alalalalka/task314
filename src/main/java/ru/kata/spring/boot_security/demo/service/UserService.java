package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {
    List<User> allUsers();

    User findUserById(int id);


    void addUser(User user);


    void updateUser(User user);


    void deleteUserById(int id);

    List<Role> getRoleList();

    User findUserByUsername(String username) throws UsernameNotFoundException;
}
