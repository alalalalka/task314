package ru.kata.spring.boot_security.demo.service;

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
}
