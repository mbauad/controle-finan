package com.fincontrol.service;

import com.fincontrol.entity.Transaction;
import com.fincontrol.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repository;

    public List<Transaction> findAll() {
        return repository.findAllByOrderByDateDesc();
    }

    public Optional<Transaction> findById(String id) {
        return repository.findById(id);
    }

    public Transaction create(Transaction transaction) {
        return repository.save(transaction);
    }

    public Transaction update(String id, Transaction transactionDetails) {
        Optional<Transaction> existingTransaction = repository.findById(id);
        if (existingTransaction.isPresent()) {
            Transaction transaction = existingTransaction.get();
            transaction.setDescription(transactionDetails.getDescription());
            transaction.setValue(transactionDetails.getValue());
            transaction.setDate(transactionDetails.getDate());
            transaction.setType(transactionDetails.getType());
            transaction.setCategory(transactionDetails.getCategory());
            transaction.setNotes(transactionDetails.getNotes());
            return repository.save(transaction);
        }
        return null;
    }

    public boolean delete(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public double getTotalIncome() {
        return repository.findByTypeOrderByDateDesc("income").stream()
                .mapToDouble(Transaction::getValue)
                .sum();
    }

    public double getTotalExpense() {
        return repository.findByTypeOrderByDateDesc("expense").stream()
                .mapToDouble(Transaction::getValue)
                .sum();
    }
}
