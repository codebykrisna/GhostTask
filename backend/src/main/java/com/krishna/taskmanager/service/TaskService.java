package com.krishna.taskmanager.service;

import com.krishna.taskmanager.dto.TaskRequest;
import com.krishna.taskmanager.entity.Task;
import com.krishna.taskmanager.exception.TaskNotFoundException;
import com.krishna.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

  private final TaskRepository taskRepository;

  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

//  public Task getTaskById(Long id) {
//    return taskRepository.findById(id)
//      .orElse(null);
//  }
  public Task getTaskById(Long id) {
    return taskRepository.findById(id)
      .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
  }

  public Task createTask(TaskRequest request) {

    Task task = new Task();

    task.setTitle(request.getTitle());
    task.setDescription(request.getDescription());
    task.setCompleted(request.isCompleted());
    task.setPriority(request.getPriority());

    return taskRepository.save(task);
  }

  public Task updateTask(Long id, TaskRequest request) {

    Task existingTask = taskRepository.findById(id)
      .orElseThrow(() ->
        new TaskNotFoundException(
          "Task not found with id: " + id
        ));

    existingTask.setTitle(request.getTitle());
    existingTask.setDescription(request.getDescription());
    existingTask.setCompleted(request.isCompleted());
    existingTask.setPriority(request.getPriority());

    return taskRepository.save(existingTask);
  }

  public void deleteTask(Long id) {
    if (!taskRepository.existsById(id)) {
      throw new TaskNotFoundException("Task not found with id: " + id);
    }
    taskRepository.deleteById(id);
  }
}
