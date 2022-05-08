package com.example.owniddemo.services;

import com.example.owniddemo.models.OwnIDData;
import com.example.owniddemo.models.User;
import com.example.owniddemo.models.responses.NoUserConnectionsResponse;
import com.example.owniddemo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class OwnIDService {
    public void setOwnIdDataByEmail(OwnIDData data) throws NoUserConnectionsResponse {
        User user  = UserRepository.getInstance().Get(data.getUserEmail());
        if(user == null) {
            throw new NoUserConnectionsResponse(404,"User not found");
        }
        user.setOwnIdData(data);
        UserRepository.getInstance().Update(user);
    }

    public OwnIDData getOwnIdDataByEmail(String email) throws NoUserConnectionsResponse {
        User user  = UserRepository.getInstance().Get(email);
        if(user == null) {
            throw new EntityNotFoundException("User not found");
        }
        return user.getOwnIdData();
    }
}
