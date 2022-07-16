import styles from './Tasks.module.css'

import { Trash } from 'phosphor-react'

interface TasksProps {
  id: string
  task: string
  isComplete: boolean
  onChangeComplete: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function Tasks({
  id,
  task,
  isComplete,
  onChangeComplete,
  onDeleteTask,
}: TasksProps) {
  function onChecked() {
    onChangeComplete(id)
  }

  function onDelete() {
    onDeleteTask(id)
  }

  return (
    <div className={styles.TasksContainer}>
      <form className={styles.TasksForm}>
        <input
          type="checkbox"
          id={id}
          defaultChecked={isComplete === true}
          onClick={onChecked}
        />
        <label htmlFor={id}>
          {isComplete ? <s>{task}</s> : <span>{task}</span>}
        </label>
      </form>
      <button onClick={onDelete}>
        <Trash size={20} />
      </button>
    </div>
  )
}
