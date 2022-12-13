package com.dominikafudala.papier.model;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor
public class SummaryBookModel {
    @JsonIncludeProperties({"bookId", "imgUrl", "title", "genres", "authors", "series_name", "series_number"})
    private BookModel bookModel;
    private Long replies;
}
