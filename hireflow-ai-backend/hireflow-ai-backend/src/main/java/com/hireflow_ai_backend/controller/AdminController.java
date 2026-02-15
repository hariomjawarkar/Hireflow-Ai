package com.hireflow_ai_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hireflow_ai_backend.entity.Job;
import com.hireflow_ai_backend.entity.User;
import com.hireflow_ai_backend.repository.JobRepository;
import com.hireflow_ai_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/users/{id}")
    public void deleteUser(@org.springframework.web.bind.annotation.PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/jobs/{id}")
    public void deleteJob(@org.springframework.web.bind.annotation.PathVariable Long id) {
        jobRepository.deleteById(id);
    }
}
