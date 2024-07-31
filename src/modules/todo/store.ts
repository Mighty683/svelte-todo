import type { Task, TaskList } from './types';
import { addTaskService, getTasksService, removeTasksService } from './service';
import { writable } from 'svelte/store';

export const tasksStore = writable<TaskList>([{ name: 'Task 1', done: false }]);

export async function getTasks() {
	tasksStore.set(await getTasksService());
}

export async function setTasks(tasks: TaskList) {
	tasksStore.set(tasks);
}

export async function addTask(name: string) {
	setTasks(await addTaskService(name));
}

export async function removeTask(task: Task) {
	tasksStore.set(await removeTasksService(task));
}
