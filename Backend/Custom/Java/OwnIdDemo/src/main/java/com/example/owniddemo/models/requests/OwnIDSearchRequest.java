package com.example.owniddemo.models.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class OwnIDSearchRequest {
    @JsonProperty("loginId")
    private String email;
}

