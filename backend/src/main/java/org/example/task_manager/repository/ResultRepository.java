package org.example.task_manager.repository;

import org.example.task_manager.entities.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ResultRepository extends JpaRepository<Result, Long> {
    Set<Result> findAllByProject_Id(Long projectId);
}
