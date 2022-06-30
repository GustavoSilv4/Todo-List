import { ChangeEvent, FormEvent, useState } from 'react';
import { ClipboardText, PlusCircle } from 'phosphor-react';

import { v4 as uuidv4 } from 'uuid';

import styles from './TaskBar.module.css';
import { Tasks } from './Tasks';

interface TaskList {
  id: string;
  task: string;
  concluded: boolean;
}

export function TaskBar() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<TaskList[]>([
    {
      id: uuidv4(),
      task: 'Integer vel sed fames integer auctor neque turpis turpis semper. Duis vel sed fames integer. natus inventore a ',
      concluded: true,
    },
    {
      id: uuidv4(),
      task: 'Acordar e fazer o trabalho de casa.',
      concluded: true,
    },
  ]);

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTaskObj = {
      id: uuidv4(),
      task: newTask,
      concluded: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  }

  function onChangeConcluded(id: string) {
    const taskToChange = tasks.find((task) => task.id === id);
  }

  function onDeleteTask(id: string) {
    const deleteTaks = tasks.filter((task) => task.id !== id);
    setTasks(deleteTaks);
  }

  const isTaskEmpty = tasks.length === 0;

  const isConcluded = tasks.filter((task) => task.concluded === true);

  return (
    <div className={styles.TaskBarContainer}>
      <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
        <input
          className={styles.newTaskInput}
          type='text'
          placeholder='Adicione uma nova tarefa'
          value={newTask}
          onChange={handleNewTaskChange}
          required
        />

        <button className={styles.newTaskButton} type='submit'>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>

      <header className={styles.TaskBarHeader}>
        <div className={styles.TaskBarCreated}>
          Tarefas criadas <span>{tasks.length}</span>
        </div>
        <div className={styles.TaskBarCompleted}>
          Concluídas <span>{`${isConcluded.length}  de ${tasks.length}`}</span>
        </div>
      </header>

      {isTaskEmpty ? (
        <div className={styles.TaskEmpty}>
          <ClipboardText size={56} weight='thin' />
          <strong>Voce ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
        <div className={styles.Task}>
          {tasks.map((task) => (
            <Tasks
              key={task.id}
              task={task.task}
              concluded={task.concluded}
              id={task.id}
              onChangeConcluded={onChangeConcluded}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
