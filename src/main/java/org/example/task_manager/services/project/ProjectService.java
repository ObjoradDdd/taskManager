package org.example.task_manager.services.project;

import jakarta.transaction.Transactional;
import org.example.task_manager.dtos.project.ProjectDto;
import org.example.task_manager.dtos.project.requests.CreateProjectRequest;
import org.example.task_manager.dtos.project.responses.GetProjectsResponse;
import org.example.task_manager.entities.Project;
import org.example.task_manager.repository.ProjectRepository;
import org.example.task_manager.services.subject.SubjectService;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final SubjectService subjectService;

    public ProjectService(ProjectRepository projectRepository, SubjectService subjectService) {
        this.projectRepository = projectRepository;
        this.subjectService = subjectService;
    }

    @Transactional
    public Long addProject(CreateProjectRequest request) {
        if (request.subjectId() == null) {
            throw new IllegalArgumentException("No subject id in the request");
        }
        var subject = subjectService.getSubjectById(request.subjectId());
        if (subject == null) {
            throw new IllegalArgumentException("Subject not found");
        }
        var project = new Project(
                request.title(), subject
        );

        projectRepository.save(project);

        return project.getId();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public GetProjectsResponse getSubjectProjects(Long subjectId) {
        var subject = subjectService.getSubjectById(subjectId);
        if (subject == null) {
            throw new IllegalArgumentException("Subject not found");
        }
        var projects = subject.getProjects();
        return new GetProjectsResponse(projects.stream().map(p -> new ProjectDto(p.getId(), p.getTitle())).collect(Collectors.toSet()));
    }

}
