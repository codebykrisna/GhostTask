package com.krishna.taskmanager.controller;

import com.krishna.taskmanager.dto.TaskRequest;
import com.krishna.taskmanager.entity.Task;
import com.krishna.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping
  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @GetMapping("/{id}")
  public Task getTaskById(@PathVariable Long id) {
    return taskService.getTaskById(id);
  }

  @PostMapping
  public Task createTask(@Valid @RequestBody TaskRequest request) {
    return taskService.createTask(request);
  }

  @PutMapping("/{id}")
  public Task updateTask(
    @PathVariable Long id,
    @Valid @RequestBody TaskRequest request) {

    return taskService.updateTask(id, request);
  }

  @DeleteMapping("/{id}")
  public void deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
  }

}


