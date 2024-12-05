package com.example.demo.repository;

import com.example.demo.entity.Product;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.category LIKE %:category%")
    List<Product> findByCategory(String category);

    @Query("SELECT p FROM Product p WHERE p.product LIKE %:name%")
    List<Product> findByName(String name);

    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p.category, COUNT(p) FROM Product p GROUP BY p.category")
    List<Object[]>findCategoryCounts();

}

