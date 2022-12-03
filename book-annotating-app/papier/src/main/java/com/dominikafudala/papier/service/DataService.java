package com.dominikafudala.papier.service;

import com.dominikafudala.papier.entity.DataInterface;
import com.dominikafudala.papier.repository.DataRepository;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataService {

    public ArrayList<JSONObject> getData(DataRepository dataRepository){
        List<?> data=dataRepository.findAllByOrderByIdAsc();
        ArrayList<JSONObject> jsonObjects = new ArrayList<>();
        for(Object d : data){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", ((DataInterface)d).getId());
            jsonObject.put("name", ((DataInterface)d).getName());
            jsonObjects.add(jsonObject);
        }

        return jsonObjects;
    }
}
