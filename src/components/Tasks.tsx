import styles from './Tasks.module.css';

import { Trash } from 'phosphor-react';

export function Tasks() {
  return (
    <div className={styles.TasksContainer}>
      <form>
        <input className={styles.TasksInput} type='checkbox' />
        <span>
          Integer urna interdum massa libero auctor neque turpis turpis semper.
          Duis vel sed fames integer.
        </span>
        <button>
          <Trash size={25} />
        </button>
      </form>
    </div>
  );
}
