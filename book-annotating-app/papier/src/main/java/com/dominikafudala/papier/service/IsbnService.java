package com.dominikafudala.papier.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Service
public class IsbnService {
    private final String googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    private JsonObject getDataFromUrl(String urlApi) throws IOException {
        URL url = new URL(urlApi);
        URLConnection request = url.openConnection();
        request.connect();

        JsonParser jp = new JsonParser();
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent()));

        return root.getAsJsonObject();
    }
    public JsonObject getDataFromGoogle(String isbn) throws IOException {
        return this.getDataFromUrl(googleApiUrl+isbn);
    }
}
