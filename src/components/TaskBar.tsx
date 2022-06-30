import { ClipboardText, PlusCircle } from 'phosphor-react';
import styles from './TaskBar.module.css';
import { Tasks } from './Tasks';

export function TaskBar() {
  return (
    <div className={styles.TaskBarContainer}>
      <form className={styles.newTaskForm}>
        <input
          className={styles.newTaskInput}
          type='text'
          placeholder='Adicione uma nova tarefa'
        />

        <button className={styles.newTaskButton} type='submit'>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>

      <header className={styles.TaskBarHeader}>
        <div className={styles.TaskBarCreated}>
          Tarefas criadas <span>0</span>
        </div>
        <div className={styles.TaskBarCompleted}>
          Concluídas <span>0</span>
        </div>
      </header>

      <div className={styles.Task}>
        {/* <ClipboardText size={56} weight='thin' />
        <strong>Voce ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p> */}
        <Tasks />
        <Tasks />
      </div>
    </div>
  );
}
