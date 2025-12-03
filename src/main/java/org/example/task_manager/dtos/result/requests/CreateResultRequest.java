package org.example.task_manager.dtos.result.requests;

public record CreateResultRequest(
        String description,
        String title,
        Long projectId
) {
}
