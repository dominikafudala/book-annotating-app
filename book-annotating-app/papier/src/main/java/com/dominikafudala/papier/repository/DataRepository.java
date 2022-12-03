package com.dominikafudala.papier.repository;

import com.dominikafudala.papier.entity.DataInterface;

import java.util.List;

public interface DataRepository{
    List<?> findAllByOrderByIdAsc();
}
