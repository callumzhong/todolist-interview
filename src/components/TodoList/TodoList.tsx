import clsx from 'clsx'
import Alert from 'components/Alert'
import { Card, CardBody, CardFooter, CardHeader } from 'components/Card'
import { FxemojiCancellationx } from 'components/Icons'
import ProgressBar from 'components/ProgressBar'
import Toggle from 'components/Toggle'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import { SubmitHandler } from 'react-hook-form'
import TodoListForm, { TodoType } from './TodoListForm'

function Header() {
  return (
    <CardHeader>
      <h2 className="text-xl text-[#828fa8] ">TodoList</h2>
      <p className="text-xs text-[#b3bed1]">Add things to do</p>
    </CardHeader>
  )
}

type BodyProps = {
  data: TodoType[]
  onDelete: (id: number) => void
  onFinish: (id: number) => void
}

type BodyRefProps = {
  scrollBottom: () => void
}

const Body = forwardRef<BodyRefProps, BodyProps>(
  ({ data, onDelete, onFinish }, ref) => {
    const calculatePercent = useMemo(() => {
      const total = data.length
      const completed = [...data].filter((item) => item.isFinish).length
      const percentComplete = Math.round((completed / total) * 100)

      if (isNaN(percentComplete)) return 0
      return percentComplete
    }, [data])

    const ulRef = useRef<HTMLUListElement>(null)

    useImperativeHandle(ref, () => ({
      /**
       * 平滑滾動至底部
       */
      scrollBottom() {
        ulRef.current?.scroll({
          top: ulRef.current?.scrollHeight,
          behavior: 'smooth'
        })
      }
    }))

    return (
      <CardBody className="text-[#a4b0c6]">
        <div className="mb-4 flex items-center gap-2 pl-5 pr-8">
          <p className="text-sm ">{calculatePercent}%</p>
          <ProgressBar percent={calculatePercent} />
        </div>
        <ul
          ref={ulRef}
          className="flex max-h-[12.25rem] flex-col gap-3 overflow-auto pl-5 pr-8 scrollbar scrollbar-track-transparent scrollbar-thumb-[#cdd3f5]">
          {data.map((item) => (
            <li key={item.id}>
              <Alert className="flex justify-start gap-4">
                <input
                  defaultChecked={!!item.isFinish}
                  type="checkbox"
                  className="w-5"
                  onClick={() => {
                    onFinish(item.id)
                  }}
                />
                <p className={clsx('mr-auto', item.isFinish && 'line-through')}>
                  {item.content}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(item.id)
                  }}
                  className="text-xs">
                  <FxemojiCancellationx className="text-[#d1d2ef] hover:text-red-500" />
                </button>
              </Alert>
            </li>
          ))}
        </ul>
      </CardBody>
    )
  }
)

function Footer({
  onSubmit,
  onSort
}: {
  onSort: (isChecked: boolean) => void
  onSubmit: SubmitHandler<TodoType>
}) {
  return (
    <CardFooter>
      <div className="mb-20 flex items-center justify-end gap-2">
        <p className="text-sm text-[#828fa8]">Move done things to end?</p>
        <Toggle onClick={onSort} />
      </div>
      <TodoListForm onSubmit={onSubmit} />
    </CardFooter>
  )
}

export default function TodoList() {
  const bodyRef = useRef<BodyRefProps>(null)
  const [todoData, setTodoData] = useState<TodoType[]>([])
  const [isUploadLocalStorage, setIsUploadLocalStorage] = useState(false)
  const addTodoDataHandler: SubmitHandler<TodoType> = (data) => {
    setTodoData((val) => [
      ...val,
      {
        id: Date.now(),
        content: data.content,
        isFinish: 0
      }
    ])
    setIsUploadLocalStorage(true)
    bodyRef.current?.scrollBottom()
  }

  const deleteTodoDataHandler = (id: number) => {
    setTodoData((state) =>
      structuredClone(state).filter((item: TodoType) => item.id !== id)
    )
    setIsUploadLocalStorage(true)
  }

  const finishTodoDataHandler = (id: number) => {
    setTodoData((state) =>
      structuredClone(state).map((item: TodoType) => {
        if (item.id === id) {
          item.isFinish = Number(!item.isFinish)
        }
        return item
      })
    )
    setIsUploadLocalStorage(true)
  }

  const sortHandler = (isChecked: boolean) => {
    setTodoData((state) => {
      const _state: TodoType[] = structuredClone(state)
      _state.sort(
        ({ isFinish: aIsFinish, id: aId }, { isFinish: bIsFinish, id: bId }) =>
          isChecked ? aIsFinish - bIsFinish : aId - bId
      )
      return _state
    })
  }

  useEffect(() => {
    // 控制上傳 localStorage 時機點
    if (isUploadLocalStorage) {
      localStorage.setItem('todo', JSON.stringify(todoData))
      setIsUploadLocalStorage(false)
    }
  }, [isUploadLocalStorage, todoData])

  useEffect(() => {
    // TodoList 初次渲染從 localStorage 拿資料
    const todoJSON = localStorage.getItem('todo')
    if (!todoJSON) return

    setTodoData(JSON.parse(todoJSON))
  }, [])

  return (
    <Card>
      <Header />
      <Body
        ref={bodyRef}
        data={todoData}
        onFinish={finishTodoDataHandler}
        onDelete={deleteTodoDataHandler}
      />
      <Footer onSort={sortHandler} onSubmit={addTodoDataHandler} />
    </Card>
  )
}
