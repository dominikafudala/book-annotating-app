package com.dominikafudala.papier.model;

import com.dominikafudala.papier.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.JSONObject;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor
public class BookModel {
    private String isbn;
    private String title;
    private JSONObject series_name;
    private Integer series_number;
    private List<JSONObject> authors;
    private String description;
    private List<JSONObject> genres;
    private JSONObject publisher;
    private LocalDate publication_date;
    private JSONObject format;
    private JSONObject language;
    private Integer page_number;
    private Edition edition;
    private boolean reviewed;
    private String imgUrl;

    private boolean isSelectedEdition;
    private Integer bookId;

    public BookModel(Book bookFound) {
        this.bookId = bookFound.getId();
        this.isbn = bookFound.getIsbn();
        this.title = bookFound.getTitle();
        this.series_number = bookFound.getSeriesNumber();
        this.description = bookFound.getDescription();
        this.publication_date = bookFound.getPublishedDate();
        this.page_number = bookFound.getPageCount();
        this.edition = bookFound.getEditionID();
        this.reviewed = bookFound.isReviewed();
        this.imgUrl = bookFound.getCoverLink();
    }

    public void setAuthors(List<Author> authors) {
        List<JSONObject> jsonObjects = new ArrayList<>();
        authors.forEach(author -> {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", author.getId());
            jsonObject.put("name", author.getName());
            jsonObjects.add(jsonObject);
        });
        this.authors = jsonObjects;
    }

    public void setGenres(List<Genre> genres) {
        List<JSONObject> jsonObjects = new ArrayList<>();
        genres.forEach(genre -> {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", genre.getId());
            jsonObject.put("name", genre.getName());
            jsonObjects.add(jsonObject);
        });
        this.genres = jsonObjects;
    }

    public void setPublisher(Publisher publisherID) {
        if(publisherID == null) return;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", publisherID.getId());
        jsonObject.put("name", publisherID.getName());
        this.publisher = jsonObject;
    }

    public void setFormat(Format formatID) {
        if(formatID == null) return;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", formatID.getId());
        jsonObject.put("name", formatID.getName());
        this.format = jsonObject;
    }

    public void setLanguage(Language languageID) {
        if(languageID == null) return;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", languageID.getId());
        jsonObject.put("name", languageID.getName());
        this.language = jsonObject;
    }

    public void setSeries_name(Series seriesID) {
        if(seriesID == null) return;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", seriesID.getId());
        jsonObject.put("name", seriesID.getName());
        this.series_name = jsonObject;
    }
}
