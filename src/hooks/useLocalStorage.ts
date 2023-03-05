import { useCallback, useEffect } from 'react'

export default function useLocalStorage<T>(
  name: string,
  callback: (data: T) => void
) {
  const setLocalStorageHandler = useCallback(
    (data: T) => {
      localStorage.setItem(name, JSON.stringify(data))
    },
    [name]
  )

  useEffect(() => {
    const todoJSON = localStorage.getItem(name)
    // TodoList 初次渲染從 localStorage 拿資料
    if (!todoJSON) return
    callback(JSON.parse(todoJSON))
  }, [callback, name])

  return {
    onSet: setLocalStorageHandler
  }
}
