package com.example.demo.service;


import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User user) {
    // 사용자를 ID로 조회한 후 업데이트
    User existingUser = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // 클라이언트에서 보낸 값이 null이 아닌 경우에만 업데이트
    if (user.getName() != null) {
        existingUser.setName(user.getName());
    }
    if (user.getGoal() != null) {
        existingUser.setGoal(user.getGoal());
    }
    if (user.getProgress() != null) {
        existingUser.setProgress(user.getProgress());
    }

    return userRepository.save(existingUser);  // 업데이트 후 저장
}

    public void deleteUser(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    userRepository.delete(user);
}
}

