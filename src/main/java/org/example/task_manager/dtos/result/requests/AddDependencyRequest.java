package org.example.task_manager.dtos.result.requests;

public record AddDependencyRequest(Long dependedResultId, Long codependentResultId){}
