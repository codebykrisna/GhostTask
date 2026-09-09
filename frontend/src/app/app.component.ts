import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';

interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  icon: string;
  bubbleClass: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  selectedTask: Task | null = null;
  isEditing = false;

  editTitle = '';
  editDescription = '';
  editPriority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';

  isLoading = false;
  errorMessage = '';

  tasks: Task[] = [];
  activeFilter: 'ALL' | 'ACTIVE' | 'COMPLETED' | 'IMPORTANT' = 'ALL';
  searchTerm = '';

  taskToDelete: Task | null = null;

get filteredTasks(): Task[] {

  const search = this.searchTerm.trim().toLowerCase();

  let result = this.tasks;

  // Filter by status / priority
  switch (this.activeFilter) {

    case 'ACTIVE':
      result = result.filter(task => !task.completed);
      break;

    case 'COMPLETED':
      result = result.filter(task => task.completed);
      break;

    case 'IMPORTANT':
      result = result.filter(task => task.priority === 'HIGH');
      break;
  }

  // Filter by search text
  if (search) {
    result = result.filter(task =>
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search)
    );
  }

  return result;
}

  startEditing(task: Task) {
    this.isEditing = true;

    this.editTitle = task.title;
    this.editDescription = task.description;
    this.editPriority = task.priority || 'MEDIUM';
  }

  cancelEditing() {
    this.isEditing = false;
  }

  saveTask() {
    if (!this.selectedTask?.id) {
      return;
    }

    if (!this.editTitle.trim()) {
      return;
    }

    const updatedTask = {
      title: this.editTitle.trim(),
      description: this.editDescription.trim(),
      completed: this.selectedTask.completed,
      priority: this.editPriority
    };

    this.taskService.updateTask(
      this.selectedTask.id,
      updatedTask
    ).subscribe({
      next: (updatedTaskFromBackend) => {

        this.selectedTask!.title =
          updatedTaskFromBackend.title;

        this.selectedTask!.description =
          updatedTaskFromBackend.description;

        this.selectedTask!.completed =
          updatedTaskFromBackend.completed;

        this.selectedTask!.priority =
          updatedTaskFromBackend.priority;

        this.isEditing = false;

        console.log(
          'Task updated:',
          updatedTaskFromBackend
        );
      },

      error: (error) => {
        console.error(
          'Failed to update task:',
          error
        );
      }
    });
  }

  setFilter(filter: 'ALL' | 'ACTIVE' | 'COMPLETED' | 'IMPORTANT') {
    this.activeFilter = filter;
  }

  addTask(title: string) {
    if (!title.trim()) {
      return;
    }

    const newTask = {
      title: title.trim(),
      description: '',
      completed: false,
      priority: 'MEDIUM' as const
    };

    this.taskService.createTask(newTask).subscribe({
      next: (createdTask) => {

        const bubbleStyles = [
          'bubble-purple',
          'bubble-cyan',
          'bubble-gold',
          'bubble-blue',
          'bubble-pink'
        ];

        const icons = ['⚡', '🚀', '🎯', '💻', '🔥'];

        const newUiTask: Task = {
          ...createdTask,
          priority: 'MEDIUM',
          icon: icons[this.tasks.length % icons.length],
          bubbleClass: bubbleStyles[this.tasks.length % bubbleStyles.length]
        };

        this.tasks.push(newUiTask);
      },

      error: (error) => {
        console.error('Failed to create task:', error);
      }
    });
  }

  loadTasks() {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTasks().subscribe({
      next: (backendTasks) => {

        this.tasks = backendTasks.map((task, index) => ({
          ...task,

          priority: task.priority || 'MEDIUM',

          icon: ['⚡', '🚀', '🎯', '💻', '🔥'][index % 5],

          bubbleClass: [
            'bubble-purple',
            'bubble-cyan',
            'bubble-gold',
            'bubble-blue',
            'bubble-pink'
          ][index % 5]
        }));

        this.isLoading = false;
      },

      error: (error) => {
        console.error('Failed to load tasks:', error);

        this.isLoading = false;

        this.errorMessage =
          'Unable to connect to the Ghost Realm. Please check your backend.';
      }
    });
  }

  openTask(task: Task) {
    this.selectedTask = task;
  }

  closeTask() {
    this.selectedTask = null;
  }

  completeTask(task: Task) {
    if (!task.id) {
      return;
    }

    const updatedTask = {
      title: task.title,
      description: task.description,
      completed: true,
      priority: task.priority
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (updatedTaskFromBackend) => {

        task.completed = updatedTaskFromBackend.completed;

        this.selectedTask = null;

        console.log('Task completed:', updatedTaskFromBackend);
      },

      error: (error) => {
        console.error('Failed to complete task:', error);
      }
    });
  }

deleteTask(task: Task) {
  this.taskToDelete = task;
}

confirmDelete() {
  if (!this.taskToDelete?.id) {
    return;
  }

  const taskId = this.taskToDelete.id;

  this.taskService.deleteTask(taskId).subscribe({
    next: () => {

      this.tasks = this.tasks.filter(
        task => task.id !== taskId
      );

      this.taskToDelete = null;
      this.selectedTask = null;
    },

    error: (error) => {
      console.error(
        'Failed to delete task:',
        error
      );

      this.errorMessage =
        'Unable to delete the task. Please try again.';

      this.taskToDelete = null;
    }
  });
}

cancelDelete() {
  this.taskToDelete = null;
}

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get activeTasks(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  get progressPercentage(): number {
    if (this.totalTasks === 0) {
      return 0;
    }

    return Math.round(
      (this.completedTasks / this.totalTasks) * 100
    );
  }

  get pendingTasks(): number {
    return this.totalTasks - this.completedTasks - this.activeTasks;
  }
  get importantTasks(): number {
    return this.tasks.filter(task => task.priority === 'HIGH').length;
  }

  changePriority(
    task: Task,
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
  ) {
    if (!task.id) {
      return;
    }

    const updatedTask = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      priority: priority
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (updatedTaskFromBackend) => {
        task.priority = updatedTaskFromBackend.priority;

        console.log(
          'Priority updated:',
          updatedTaskFromBackend
        );
      },

      error: (error) => {
        console.error('Failed to update priority:', error);
      }
    });
  }
}