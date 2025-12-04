package org.example.task_manager.dtos.project.responses;

import org.example.task_manager.dtos.project.ProjectDto;

import java.util.Set;

public record GetProjectsResponse(
        Set<ProjectDto> projects
) { }
