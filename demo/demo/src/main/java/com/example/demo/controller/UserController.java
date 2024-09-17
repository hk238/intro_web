package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;



import java.util.List;

// @CrossOrigin(origins = "*", allowedMethods = {"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"})
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }



    // @PostMapping
    // public User addUser(@RequestBody User user) {
    //     return userService.addUser(user);
    // }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
    User savedUser = userService.addUser(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);  // HTTP 201 Created
}

    @PatchMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        // 기존의 사용자를 찾아서 부분적으로 업데이트
        return userService.updateUser(id, user);
    }


//     @DeleteMapping("/{id}")
// public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//     try {
//         userService.deleteUser(id);
//         return ResponseEntity.noContent().build();  // 204 No Content 반환
//     } catch (RuntimeException e) {
//         return ResponseEntity.notFound().build();  // 404 Not Found 반환
//     }
// }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    try {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();  // 204 No Content 반환
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();  // 404 Not Found 반환
    }
}

}
