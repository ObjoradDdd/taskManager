package org.example.task_manager.mappers;

import org.example.task_manager.dtos.result.ResultDto;
import org.example.task_manager.entities.Result;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ResultMapper {
    public ResultDto toDto(Result result) {
        return new ResultDto(
                result.getId(),
                result.getDescription(),
                result.getTitle(),
                result.getDependentResults().stream().map(Result::getId).collect(Collectors.toSet()),
                result.getCodependentResults().stream().map(Result::getId).collect(Collectors.toSet())
        );
    }
}
