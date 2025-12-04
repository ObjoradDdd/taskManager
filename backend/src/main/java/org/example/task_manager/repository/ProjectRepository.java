package org.example.task_manager.repository;

import org.example.task_manager.entities.Project;
import org.example.task_manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Set<Project> findAllBySubject_Id(Long subjectId);
}
