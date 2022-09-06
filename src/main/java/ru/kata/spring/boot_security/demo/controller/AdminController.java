package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UDetailsService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private final UserService userService;
    private final UDetailsService uDetailsService;

    @Autowired
    public AdminController(UserService userService, UDetailsService uDetailsService) {
        this.userService = userService;
        this.uDetailsService = uDetailsService;
    }

    @GetMapping
    public String showTableOfUsers(Model model, Principal principal) {
        model.addAttribute("userInHeader", userService.findUserByUsername(principal.getName()));
        model.addAttribute("userWithRoleAdmin", userService.findUserByUsername(principal.getName()));
        model.addAttribute("users", userService.allUsers());
        model.addAttribute("roles", userService.getRoleList());
        return "adminpage";
    }

    @GetMapping("/new")
    public String AddNewUser(Model model, Principal principal) {
        model.addAttribute("userInHeader", userService.findUserByUsername(principal.getName()));
        model.addAttribute("user", new User());
        model.addAttribute("roles", userService.getRoleList());
        return "new";
    }

    @PostMapping("/new")
    public String createUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String editUser(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", userService.findUserById(id));
        model.addAttribute("roles", userService.getRoleList());
        return "edit";
    }

    @PostMapping("/{id}")
    public String updateUser(@ModelAttribute User user, @PathVariable("id") int id) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }
}
