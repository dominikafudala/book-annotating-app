package com.dominikafudala.papier.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor
public class NoteModel {
    private Integer bookId;
    private String type;
    private Integer page;
    private String access;
    private String quote;
    private String note;
    private Integer parentNoteId;
    private Integer buddyReadId;
}
