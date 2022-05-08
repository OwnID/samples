package com.example.owniddemo.models.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoUserConnectionsResponse extends Throwable {
    private Integer errorCode;
    private String errorMessage;
}
