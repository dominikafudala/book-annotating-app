package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    public Book findByIsbn(String isbn);

    List<Book> findByEditionID_Id(Integer id);

    @Query(value = "select * from book b left join series s on b.seriesID = s.seriesID where upper(b.title) like upper(concat('%', ?1, '%')) or upper(s.name) like upper(concat('%', ?2, '%'))", nativeQuery = true)
    List<Book> findByTitleLikeIgnoreCaseOrSeriesID_NameLikeIgnoreCase(String title, String name);

}
