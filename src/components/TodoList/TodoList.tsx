import clsx from 'clsx'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import { SubmitHandler } from 'react-hook-form'
import Alert from 'components/Alert'
import { Card, CardBody, CardFooter, CardHeader } from 'components/Card'
import { FxemojiCancellationx } from 'components/Icons'
import ProgressBar from 'components/ProgressBar'
import Toggle from 'components/Toggle'
import useTodo from 'hooks/useTodo'
import TodoListForm, { TodoType } from './TodoListForm'

function Header() {
  return (
    <CardHeader>
      <h2 className="text-2xl text-[#93a0bd] ">Todo List</h2>
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
        console.log(ulRef.current?.scrollHeight)

        ulRef.current?.scrollTo({
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
              <Alert className="flex items-center justify-start gap-4">
                <input
                  id={item.id.toString()}
                  defaultChecked={!!item.isFinish}
                  type="checkbox"
                  className="h-6 w-6 cursor-pointer accent-[#748cd8]"
                  onClick={() => {
                    onFinish(item.id)
                  }}
                />
                <label
                  htmlFor={item.id.toString()}
                  className={clsx(
                    'mr-auto w-full cursor-pointer text-lg',
                    item.isFinish && 'line-through'
                  )}>
                  {item.content}
                </label>
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
  const [isEnableScroll, setIsEnableScroll] = useState(false)
  const { todo, onAdd, onDelete, onFinish, onSort } = useTodo()
  const submitHandler: SubmitHandler<TodoType> = (data) => {
    onAdd(data)
    setIsEnableScroll(true)
  }

  useEffect(() => {
    // 由 isEnableScroll State 批次更新後表示以渲染 DOM 再滾動至底部
    if (isEnableScroll) {
      bodyRef.current?.scrollBottom()
      setIsEnableScroll(false)
    }
  }, [todo, isEnableScroll])

  return (
    <Card>
      <Header />
      <Body ref={bodyRef} data={todo} onFinish={onFinish} onDelete={onDelete} />
      <Footer onSort={onSort} onSubmit={submitHandler} />
    </Card>
  )
}
