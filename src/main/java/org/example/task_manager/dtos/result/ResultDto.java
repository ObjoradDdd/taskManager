package org.example.task_manager.dtos.result;

import java.util.Set;

public record ResultDto(
        Long id,
        String description,
        String title,
        Set<Long> dependentIds,
        Set<Long> codependentIds
) {
}
