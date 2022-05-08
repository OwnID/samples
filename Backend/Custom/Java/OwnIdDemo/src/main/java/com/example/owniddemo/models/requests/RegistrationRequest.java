package com.example.owniddemo.models.requests;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegistrationRequest {
    private String loginId;
    private String password;
    private String ownIdData;
}
