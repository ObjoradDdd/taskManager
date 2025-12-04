package org.example.task_manager.services.result;

import jakarta.transaction.Transactional;
import org.example.task_manager.dtos.result.requests.AddDependencyRequest;
import org.example.task_manager.dtos.result.requests.CreateResultRequest;
import org.example.task_manager.dtos.result.responses.GetResultsResponse;
import org.example.task_manager.entities.Result;
import org.example.task_manager.mappers.ResultMapper;
import org.example.task_manager.repository.ResultRepository;
import org.example.task_manager.services.project.ProjectService;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class ResultService {
    private final ResultRepository resultRepository;
    private final ProjectService projectService;
    private final ResultMapper resultMapper;

    public ResultService(ResultRepository resultRepository, ProjectService projectService, ResultMapper resultMapper) {
        this.resultRepository = resultRepository;
        this.projectService = projectService;
        this.resultMapper = resultMapper;
    }

    @Transactional
    public Long addResult(CreateResultRequest request) {
        if (request.projectId() == null) {
            throw new IllegalArgumentException("No project id in the request");
        }
        var project = projectService.getProjectById(request.projectId());

        if (project == null) {
            throw new IllegalArgumentException("Project not found");
        }

        var newResult = new Result(request.title(), request.description(), project);

        resultRepository.save(newResult);

        return newResult.getId();
    }

    @Transactional
    public void addDependency(AddDependencyRequest request) {
        if (request.dependedResultId() == null || request.codependentResultId() == null) {
            throw new IllegalArgumentException("No depended or codependent result id in the request");
        }

        var dependedResult = resultRepository.findById(request.dependedResultId())
                .orElseThrow(() -> new IllegalArgumentException("depended result not found"));

        var codependentResult = resultRepository.findById(request.codependentResultId())
                .orElseThrow(() -> new IllegalArgumentException("codependent result not found"));

        codependentResult.getDependentResults().add(dependedResult);
    }

    @Transactional
    public GetResultsResponse getProjectsResults(Long projectId) {
        var project = projectService.getProjectById(projectId);

        if (project == null) {
            throw new IllegalArgumentException("Project not found");
        }

        return new GetResultsResponse(
                project.getResults().stream().map(resultMapper::toDto).collect(Collectors.toSet())
        );
    }


}
