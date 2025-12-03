package org.example.task_manager.dtos.subject.responses;

import org.example.task_manager.dtos.subject.SubjectDto;

import java.util.Set;

public record GetSubjectsResponse(
        Set<SubjectDto> subjects
) {
}
