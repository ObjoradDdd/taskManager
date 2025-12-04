package org.example.task_manager.controllers.result;

import org.example.task_manager.controllers.config.NETWORK_CONFIG;
import org.example.task_manager.dtos.result.requests.AddDependencyRequest;
import org.example.task_manager.dtos.result.requests.CreateResultRequest;
import org.example.task_manager.dtos.result.responses.GetResultsResponse;
import org.example.task_manager.services.result.ResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping(NETWORK_CONFIG.BASE_ROUTE + "/result")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Long>> addResult(@RequestBody CreateResultRequest request) {
        var resultId = resultService.addResult(request);
        if (resultId != null) {
            Map<String, Long> response = Collections.singletonMap("resultId", resultId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/dependency")
    public ResponseEntity<Object> addDependency(@RequestBody AddDependencyRequest request) {
        resultService.addDependency(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{projectId}/results")
    public ResponseEntity<GetResultsResponse> getResult(@PathVariable Long projectId) {
        var results = resultService.getProjectsResults(projectId);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
