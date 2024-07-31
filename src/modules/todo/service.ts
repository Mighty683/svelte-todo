// Mock service for todo module

import type { Task, TaskList } from './types';

export async function getTasksService(): Promise<TaskList> {
	return JSON.parse(localStorage.getItem('tasks') || '[]');
}

export async function saveTasksService(tasks: TaskList) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
	return tasks;
}

export async function removeTasksService(task: Task) {
	const tasks = await getTasksService();
	const newTasks = tasks.filter((t) => t.name !== task.name);
	localStorage.setItem('tasks', JSON.stringify(newTasks));
	return newTasks;
}
export async function addTaskService(name: string) {
	const tasks = await getTasksService();
	const newTask = { name: name, done: false };
	tasks.push(newTask);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	return tasks;
}
