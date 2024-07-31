<script lang="ts">
  import { onMount } from 'svelte';
  import AddTodoComponent from './addTodo.svelte';
	import { getTasks, tasksStore } from '../store';
	import type { TaskList } from '../types';
  import TodoComponent from './todo.svelte';

  let tasks: TaskList = [];
  tasksStore.subscribe((value) => {
    tasks = value;
  });

  onMount(getTasks);

</script>

<h1>Todo List</h1>
<ul>
  {#each tasks as task}
    <TodoComponent task={task} />
  {/each}
  <AddTodoComponent />
</ul>