package com.fincontrol.repository;

import com.fincontrol.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    List<Transaction> findAllByOrderByDateDesc();
    
    List<Transaction> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);
    
    List<Transaction> findByTypeOrderByDateDesc(String type);
}
