package com.example.owniddemo.controllers;

import com.example.owniddemo.models.OwnIDData;
import com.example.owniddemo.models.requests.LoginRequest;
import com.example.owniddemo.models.requests.OwnIDSearchRequest;
import com.example.owniddemo.models.requests.RegistrationRequest;
import com.example.owniddemo.models.responses.*;
import com.example.owniddemo.services.AuthService;
import com.example.owniddemo.services.OwnIDService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;

@RestController
@RequestMapping(path = "/users")
@AllArgsConstructor
public class UserController {

    private final AuthService authService;

    private final OwnIDService ownIDService;

    @PostMapping("/register")
    public RegistrationResponse register(@RequestBody RegistrationRequest request) {
        return authService.register(request.getLoginId(), request.getPassword(), request.getOwnIdData());
    }

    @PostMapping("/login")
    public LoggedInResponse login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }

    @PostMapping("/setOwnIDDataByLoginId")
    public ResponseEntity<Object> setOwnIdDataByLoginId(@RequestBody OwnIDData ownIdData) {
        try {
            ownIDService.setOwnIdDataByEmail(ownIdData);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (NoUserConnectionsResponse e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/getOwnIDDataByLoginId")
    @ResponseBody
    public ResponseEntity<Object> getOwnIdDataByLoginId(@RequestBody OwnIDSearchRequest req) {
        try {
            OwnIDData data = ownIDService.getOwnIdDataByEmail(req.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(new OwnIDDataResponse(data.getData()));
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.OK).
                    body(new NoUserConnectionsResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()));
        }
        catch (NoResultException e) {
            return ResponseEntity.status(HttpStatus.OK).body(new OwnIDDataResponse(null));
        } catch (NoUserConnectionsResponse e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/getSessionByLoginId")
    public ResponseEntity<OwnIDSessionResponse> getSessionByLoginId(@RequestBody OwnIDSearchRequest req) {
        try {
            String token = authService.createSession(req.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(new OwnIDSessionResponse(token));
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.OK).body(new OwnIDSessionResponse(null));
        }
    }
}
