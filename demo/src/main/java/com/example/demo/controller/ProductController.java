package com.example.demo.controller;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Page<Product> getAllProducts(Pageable pageable) {
        return productService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productService.findbyCategory(category);
    }

    @GetMapping("/search/{name}")
    public List<Product> searchProduct(@PathVariable String name) {
        return productService.findByName(name);
    }
    
    @GetMapping("/category-counts")
    public ResponseEntity<Map<String, Long>> getCategoryCount(){
        return ResponseEntity.ok(productService.getcategoryCount());
    }

    
}
