package org.example.task_manager.services.subject;

import org.example.task_manager.dtos.subject.requests.CreateSubjectRequest;
import org.example.task_manager.dtos.subject.responses.GetSubjectsResponse;
import org.example.task_manager.entities.Subject;
import org.example.task_manager.mappers.SubjectMapper;
import org.example.task_manager.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;

    public SubjectService(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }

    public Long addSubject(CreateSubjectRequest request) {
        var newSubject = new Subject(request.title());
        subjectRepository.save(newSubject);
        return newSubject.getId();
    }


    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    public GetSubjectsResponse getAllSubjects() {
        return new GetSubjectsResponse(subjectRepository
                .findAll()
                .stream()
                .map(subjectMapper::toDto)
                .collect(Collectors.toSet()));
    }
}
