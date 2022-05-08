package com.example.owniddemo.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OwnIDData {
    @JsonProperty("loginId")
    public String userEmail;
    @JsonProperty("ownIdData")
    public String data;
}
