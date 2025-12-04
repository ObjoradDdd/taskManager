package org.example.task_manager.mappers;

import org.example.task_manager.dtos.subject.SubjectDto;
import org.example.task_manager.entities.Subject;
import org.springframework.stereotype.Component;

@Component
public class SubjectMapper {
    public SubjectDto toDto(Subject subject) {
        return new SubjectDto(
                subject.getId(),
                subject.getTitle()
        );
    }
}
