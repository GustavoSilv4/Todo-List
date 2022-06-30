import styles from './Tasks.module.css';

import { Trash } from 'phosphor-react';

interface TasksProps {
  id: string;
  task: string;
  concluded: boolean;
  onChangeConcluded: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Tasks({
  id,
  task,
  concluded,
  onChangeConcluded,
  onDeleteTask,
}: TasksProps) {
  function onChecked() {
    onChangeConcluded(id);
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
        {concluded ? <s>{task}</s> : <span>{task}</span>}
      </form>
      <button onClick={onDelete}>
        <Trash size={20} />
      </button>
    </div>
  );
}
