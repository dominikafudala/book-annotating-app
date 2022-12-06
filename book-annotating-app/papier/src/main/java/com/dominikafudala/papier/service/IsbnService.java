package com.dominikafudala.papier.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Service
public class IsbnService {
    private final String googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
    private final String editionApi = "https://www.librarything.com/api/thingISBN/";
    private final String openLibraryApi = "https://openlibrary.org/isbn/";
    private final String authorApi = "https://openlibrary.org/authors/";

    private Document getXmlFromUrl(String urlApi) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
        DocumentBuilder b = f.newDocumentBuilder();

        URL url = new URL(urlApi);
        URLConnection request = url.openConnection();

        Document doc = b.parse(request.getInputStream());
        doc.getDocumentElement().normalize();

        return doc;
    }

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

    public JsonObject getDataFromOpenLibrary(String isbn) throws IOException {
        return this.getDataFromUrl(openLibraryApi+isbn+".json");
    }

    public String getEditionData(String isbn) throws ParserConfigurationException, IOException, SAXException {
        Document document = this.getXmlFromUrl(editionApi+isbn);
        NodeList nodeList = document.getElementsByTagName("isbn");

        if(nodeList.getLength() > 0 && nodeList.item(0).getNodeName() != "unknownID") return nodeList.item(0).getTextContent();
        return null;
    }

    public JsonObject getAuthor(String authorId) throws IOException {
        return this.getDataFromUrl(authorApi+authorId+".json");
    }
}
