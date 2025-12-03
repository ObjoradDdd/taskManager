package org.example.task_manager.controllers.subject;

import org.example.task_manager.controllers.config.NETWORK_CONFIG;
import org.example.task_manager.dtos.subject.requests.CreateSubjectRequest;
import org.example.task_manager.dtos.subject.responses.GetSubjectsResponse;
import org.example.task_manager.services.subject.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController()
@RequestMapping(NETWORK_CONFIG.BASE_ROUTE + "/subject")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping()
    public ResponseEntity<Map<String, Long>> addSubject(@RequestBody CreateSubjectRequest request) {
        var subjectId = subjectService.addSubject(request);
        if (subjectId != null) {
            Map<String, Long> response = Collections.singletonMap("subjectId", subjectId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return ResponseEntity.status(500).build();
    }

    @GetMapping()
    public ResponseEntity<GetSubjectsResponse> getAllSubjects() {
        var subjects = subjectService.getAllSubjects();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

}
