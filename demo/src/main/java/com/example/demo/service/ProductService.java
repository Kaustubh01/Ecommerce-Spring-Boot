package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable; // Correct import

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Retrieve all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Retrieve a product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> findbyCategory(String category){
        return productRepository.findByCategory(category);
    }

    public List<Product> findByName(String name){
        return productRepository.findByName(name);
    }

    public Page<Product> findAll(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    public Map<String, Long> getcategoryCount(){
        List<Object[]> results = productRepository.findCategoryCounts();
        Map<String, Long> categoryCounts = new HashMap<>();

        for (Object[] result : results) {
            String category = (String) result[0];
            Long count = (Long) result[1];
            categoryCounts.put(category, count);
        }

        return categoryCounts;

    }
}
