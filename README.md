## Project Name

TodoList Interview 題目

## Technologies

- React
- Typescript
- Tailwind CSS
- React Hook Form

## Project Screen Shot(s)
<img width="481" alt="截圖 2023-03-06 上午5 04 58" src="https://user-images.githubusercontent.com/103582829/222985946-7bc771c5-72e3-4ba8-b168-891d5ad6fa9f.png">

## Installation and Setup Instructions

下載專案前，請先安裝 `node` 與 `npm`

node: v18.14.2
npm: v9.5.0

```
git clone https://github.com/callumzhong/todolist-interview.git
```

安裝:

`npm install`

啟動伺服器:

`npm start`

訪問應用程式:

`localhost:3000`

## Reflection

這是由 React TypeScript 撰寫的面試題目，架構上可以從元件資料夾結構觀察大致上可以區分兩個部分

功能元件

- TodoList

UI 元件

- Card
- Alert
- ProgressBar
- Toggle
- Icons

TodoList 內有私有元件 Header, Body, Footer 這些沒有獨立檔案，TodoListForm 則是專注處理 todo 表單提交，未來若有其他樣式的 TodoList 則 TodoListForm 是可以共用的。

```tsx
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
```

接下來 Hooks 嘗試使用 T 泛型組合 useTodo , useLocalStorage
，盡可能的拆分工作職責

```tsx
// 下載 LocalStorage 本地狀態同步
const uploadLocalStorage = useCallback((todo: TodoType[]) => {
  setData(todo)
}, [])

const { onSet } = useLocalStorage<TodoType[]>('todo', uploadLocalStorage)

// 上傳 LocalStorage 同步
useEffect(() => {
  if (isUploadLocalStorage) {
    onSet(data)
  }
}, [data, isUploadLocalStorage, onSet])
```
