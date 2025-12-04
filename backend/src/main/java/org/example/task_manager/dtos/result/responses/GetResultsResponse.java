package org.example.task_manager.dtos.result.responses;

import org.example.task_manager.dtos.result.ResultDto;

import java.util.Set;

public record GetResultsResponse(
        Set<ResultDto> results
){}
