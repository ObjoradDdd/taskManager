package org.example.task_manager.controllers.project;

import org.example.task_manager.controllers.config.NETWORK_CONFIG;
import org.example.task_manager.dtos.project.requests.CreateProjectRequest;
import org.example.task_manager.dtos.project.responses.GetProjectsResponse;
import org.example.task_manager.services.project.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(NETWORK_CONFIG.BASE_ROUTE + "/project")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping()
    public ResponseEntity<Map<String, Long>> addResult(@RequestBody CreateProjectRequest request) {
        var projectId = projectService.addProject(request);
        if (projectId != null) {
            Map<String, Long> response = Collections.singletonMap("projectId", projectId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{subjectId}/projects")
    public ResponseEntity<GetProjectsResponse> getProjectsById(@PathVariable Long subjectId) {
        var projects = projectService.getSubjectProjects(subjectId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

}
