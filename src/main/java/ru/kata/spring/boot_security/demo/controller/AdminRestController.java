package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> showAllUsers(){
        return ResponseEntity.ok(userService.allUsers());
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int userId = user.getId();
        return ResponseEntity.ok(userService.findUserById(userId));
    }

    @PostMapping("/admin/users/new")
    public ResponseEntity<User> addNewUser(@RequestBody User user){
        userService.addUser(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/admin/users")
    public ResponseEntity <User> updateUser(@RequestBody User user){
        userService.addUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id){
        userService.deleteUserById(id);
        return ResponseEntity.ok().build();

    }




}
