package org.example.task_manager.dtos.project.requests;

public record CreateProjectRequest(
        String title,
        Long subjectId
) {}
