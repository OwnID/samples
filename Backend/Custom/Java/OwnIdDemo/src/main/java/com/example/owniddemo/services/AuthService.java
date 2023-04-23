package com.example.owniddemo.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.owniddemo.models.User;
import com.example.owniddemo.models.responses.LoggedInResponse;
import com.example.owniddemo.models.responses.RegistrationResponse;
import com.example.owniddemo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Calendar;
import java.util.Date;

@Service
@AllArgsConstructor
public class AuthService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public RegistrationResponse register(String email, String password, String ownIdData) {
        User user = UserRepository.getInstance().Get(email);

        if (user != null) {
            return new RegistrationResponse(false, "User already exists");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        user = new User(email, encodedPassword, ownIdData);
        UserRepository.getInstance().Register(user);
        return new RegistrationResponse(true, null);
    }

    public LoggedInResponse login(String email, String password) {
        User user = UserRepository.getInstance().Login(email, password);
        if (user == null) {
            return new LoggedInResponse(false, "User doesn't exist");
        }

        if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            return new LoggedInResponse(false, "Wrong password");
        }

        return new LoggedInResponse(true, null);
    }

    public String createSession(String email) {
        User user = UserRepository.getInstance().Get(email);
        if (user == null) {
            throw new EntityNotFoundException("User doesn't exist");
        }

        Algorithm alg = Algorithm.HMAC256("this is a very secret secret");
        Calendar tomorrow = Calendar.getInstance();
        tomorrow.add(Calendar.DATE, 1);
        Date expiryDate = Date.from(tomorrow.toInstant());

        return JWT.create().
                withIssuer("ownid").
                withClaim("email", email).
                withExpiresAt(expiryDate).
                sign(alg);
    }
}
