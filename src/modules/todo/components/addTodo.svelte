<script>
	import { addTask } from '../store';

  let taskName = '';

  const addTaskClick = async () => {
    if (taskName) {
      await addTask(taskName);
      taskName = '';
    }
  };
</script>

<div>
  <input type="text" bind:value={taskName} placeholder="Enter task name" />
  <button on:click={addTaskClick}>Add Task</button>
</div>