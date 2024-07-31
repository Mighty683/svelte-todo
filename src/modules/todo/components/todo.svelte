<script lang="ts">
	import type { Task } from "../types";
  import { removeTask } from "../store";

  export let task: Task;

  function onRemoveTaskClick() {
    removeTask(task);
  }
</script>

<li>{task.name} <button on:click={onRemoveTaskClick}>REMOVE</button></li>