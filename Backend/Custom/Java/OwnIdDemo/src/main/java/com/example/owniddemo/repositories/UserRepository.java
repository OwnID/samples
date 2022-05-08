package com.example.owniddemo.repositories;


import com.example.owniddemo.models.User;

import java.util.HashMap;
import java.util.Map;

public class UserRepository {
    Map<String, User> _userPool = new HashMap<String, User>();
    private static final UserRepository instance = new UserRepository();

    //private constructor to avoid client applications to use constructor
    private UserRepository(){}

    public static UserRepository getInstance(){
        return instance;
    }

    public User Login(String email, String password) {
        User user = Get(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public boolean Register(User userToRegister) {
        if (_userPool.containsKey(userToRegister.getLoginId())) {
            return false;
        }
        _userPool.put(userToRegister.getLoginId(), userToRegister);
        return true;
    }

    public User Get(String email) {
        if (_userPool.containsKey(email)) {
            return _userPool.get(email);
        }
        return null;
    }

    public boolean Update(User userToUpdate) {
        if (!_userPool.containsKey(userToUpdate.getLoginId())) {
            return false;
        }
        _userPool.replace(userToUpdate.getLoginId(),userToUpdate);
        return true;
    }
}