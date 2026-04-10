package com.fincontrol.controller;

import com.fincontrol.entity.Transaction;
import com.fincontrol.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class ApiRestController {
    @Autowired
    private TransactionService service;

    @GetMapping
    public ResponseEntity<List<Transaction>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getById(@PathVariable String id) {
        Optional<Transaction> transaction = service.findById(id);
        return transaction.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Transaction> create(@RequestBody Transaction transaction) {
        Transaction created = service.create(transaction);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable String id, @RequestBody Transaction transaction) {
        Transaction updated = service.update(id, transaction);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean deleted = service.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats/summary")
    public ResponseEntity<?> getSummary() {
        return ResponseEntity.ok(new Object() {
            public double income = service.getTotalIncome();
            public double expense = service.getTotalExpense();
            public double balance = income - expense;
        });
    }
}
