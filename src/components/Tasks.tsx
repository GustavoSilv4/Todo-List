import styles from './Tasks.module.css';

import { Trash } from 'phosphor-react';

interface TasksProps {
  id: string;
  task: string;
  concluded: boolean;
}

export function Tasks({ id, task, concluded }: TasksProps) {
  return (
    <div className={styles.TasksContainer}>
      <form>
        <input className={styles.TasksInput} type='checkbox' />
        <span>{task}</span>
      </form>
      <button>
        <Trash size={20} />
      </button>
    </div>
  );
}
