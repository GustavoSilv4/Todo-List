import styles from './Tasks.module.css';

import { Trash } from 'phosphor-react';

interface TasksProps {
  id: string;
  task: string;
  isComplete: boolean;
  onChangeComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Tasks({
  id,
  task,
  isComplete,
  onChangeComplete,
  onDeleteTask,
}: TasksProps) {
  function onChecked() {
    onChangeComplete(id);
  }

  function onDelete() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.TasksContainer}>
      <form>
        <input
          className={styles.TasksInput}
          type='checkbox'
          onClick={onChecked}
        />
        {isComplete ? <s>{task}</s> : <span>{task}</span>}
      </form>
      <button onClick={onDelete}>
        <Trash size={20} />
      </button>
    </div>
  );
}
