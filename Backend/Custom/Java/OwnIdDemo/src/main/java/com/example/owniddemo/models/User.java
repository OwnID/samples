package com.example.owniddemo.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class User {

    private String loginId;
    private String password;
    private OwnIDData ownIdData;

    public User(String email, String password, String ownIdData) {
        this.loginId = email;
        this.password = password;
        this.ownIdData = new OwnIDData(email, ownIdData);
    }
}
