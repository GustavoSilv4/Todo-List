import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ClipboardText, PlusCircle } from 'phosphor-react'

import { v4 as uuidv4 } from 'uuid'

import styles from './TaskBar.module.css'
import { Tasks } from './Tasks'

interface TaskList {
  id: string
  task: string
  isComplete: boolean
}

export function TaskBar() {
  const [newTask, setNewTask] = useState('')

  const storedStateAsJSON =
    JSON.parse(localStorage.getItem('@todolistig:tasks-1.0.0') || '{}') || []

  const [tasks, setTasks] = useState<TaskList[]>(storedStateAsJSON)

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(tasks)

    localStorage.setItem('@todolistig:tasks-1.0.0', stateJSON)
  }, [tasks])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTaskObj = {
      id: uuidv4(),
      task: newTask,
      isComplete: false,
    }

    setTasks((state) => [...state, newTaskObj])
    setNewTask('')
  }

  function onChangeComplete(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    )
  }

  function onDeleteTask(id: string) {
    const deleteTaks = Object.values(tasks).filter((task) => task.id !== id)
    setTasks(deleteTaks)
  }

  const isTaskEmpty = tasks.length === 0

  const isCompleteTask = tasks.filter((task) => task.isComplete === true)

  return (
    <div className={styles.TaskBarContainer}>
      <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
        <input
          className={styles.newTaskInput}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTask}
          onChange={handleNewTaskChange}
          required
        />

        <button className={styles.newTaskButton} type="submit">
          Criar
          <PlusCircle size={20} />
        </button>
      </form>

      <header className={styles.TaskBarHeader}>
        <div className={styles.TaskBarCreated}>
          Tarefas criadas <span>{tasks.length}</span>
        </div>
        <div className={styles.TaskBarCompleted}>
          Concluídas{' '}
          <span>{`${isCompleteTask.length}  de ${tasks.length}`}</span>
        </div>
      </header>

      {isTaskEmpty ? (
        <div className={styles.TaskEmpty}>
          <ClipboardText size={56} weight="thin" />
          <strong>Voce ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
        <div className={styles.Task}>
          {tasks.map((task) => (
            <Tasks
              key={task.id}
              task={task.task}
              isComplete={task.isComplete}
              id={task.id}
              onChangeComplete={onChangeComplete}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}
