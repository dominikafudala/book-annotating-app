package com.dominikafudala.papier.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.JSONObject;

import java.time.LocalDate;
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
}
