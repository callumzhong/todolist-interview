import { useCallback, useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'

export type TodoType = {
  id: number
  content: string
  isFinish: number
}

export default function useTodo() {
  const [isUploadLocalStorage, setIsUploadLocalStorage] = useState(false)
  const [data, setData] = useState<TodoType[]>([])
  const addTodoDataHandler = (data: TodoType) => {
    setData((val) => [
      ...val,
      {
        id: Date.now(),
        content: data.content,
        isFinish: 0
      }
    ])
    setIsUploadLocalStorage(true)
  }

  const deleteTodoDataHandler = (id: number) => {
    setData((state) =>
      structuredClone(state).filter((item: TodoType) => item.id !== id)
    )
    setIsUploadLocalStorage(true)
  }

  const finishTodoDataHandler = (id: number) => {
    setData((state) =>
      structuredClone(state).map((item: TodoType) => {
        if (item.id === id) {
          item.isFinish = Number(!item.isFinish)
        }
        return item
      })
    )
    setIsUploadLocalStorage(true)
  }

  const sortTodoDataHandler = (isChecked: boolean) => {
    setData((state) => {
      const _state: TodoType[] = structuredClone(state)
      _state.sort(
        ({ isFinish: aIsFinish, id: aId }, { isFinish: bIsFinish, id: bId }) =>
          isChecked ? aIsFinish - bIsFinish : aId - bId
      )
      return _state
    })
  }

  const uploadLocalStorage = useCallback((todo: TodoType[]) => {
    setData(todo)
  }, [])

  const { onSet } = useLocalStorage<TodoType[]>('todo', uploadLocalStorage)

  useEffect(() => {
    if (isUploadLocalStorage) {
      onSet(data)
    }
  }, [data, isUploadLocalStorage, onSet])

  return {
    todo: data,
    onAdd: addTodoDataHandler,
    onDelete: deleteTodoDataHandler,
    onFinish: finishTodoDataHandler,
    onSort: sortTodoDataHandler
  }
}
