import { IcRoundPlus } from 'components/Icons'
import { useForm, SubmitHandler } from 'react-hook-form'

export type TodoType = {
  id: number
  content: string
  isFinish: number
}

type TodoListFormProps = {
  onSubmit: SubmitHandler<TodoType>
}

export default function TodoListForm({ onSubmit }: TodoListFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TodoType>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="add-todo-list"
        className="mb-1 block text-sm text-[#949fbc]">
        Add to list
      </label>

      <div className="relative flex gap-1">
        <input
          type="text"
          id="add-todo-list"
          maxLength={12}
          className="w-full rounded-sm py-2.5 px-5 shadow-sm outline-none sm:text-sm"
          {...register('content', {
            required: true,
            validate: (value) => !!value.trim()
          })}
        />
        <button
          type="submit"
          className="rounded-md bg-[#788fd2] px-2 text-white hover:bg-[#788fff]">
          <IcRoundPlus width={30} height={30} />
        </button>
        {errors.content && (
          <p className="absolute top-full text-xs text-red-700">
            Please enter the content
          </p>
        )}
      </div>
    </form>
  )
}
