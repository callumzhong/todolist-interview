import Alert from 'components/Alert'
import { Card, CardBody, CardFooter, CardHeader } from 'components/Card'
import { FxemojiCancellationx } from 'components/Icons'
import { IcRoundPlus } from 'components/Icons/IcRoundPlus'
import ProgressBar from 'components/ProgressBar'
import Toggle from 'components/Toggle'

function Header() {
  return (
    <CardHeader>
      <h2 className="text-xl text-[#828fa8] ">TodoList</h2>
      <p className="text-xs text-[#b3bed1]">Add things to do</p>
    </CardHeader>
  )
}

function Body() {
  return (
    <CardBody className="text-[#a4b0c6]">
      <div className="mb-4 flex items-center gap-2 pl-5 pr-8">
        <p className="text-sm ">40%</p>
        <ProgressBar percent={40} />
      </div>
      <ul className="flex max-h-[12.25rem] flex-col gap-3 overflow-auto pl-5 pr-8 scrollbar scrollbar-track-transparent scrollbar-thumb-[#cdd3f5]">
        <li>
          <Alert className="flex justify-start gap-4">
            <input type="checkbox" className="w-5" id="" />
            <p className="mr-auto">Lorem</p>
            <button type="button" className="text-xs">
              <FxemojiCancellationx className="text-[#d1d2ef] hover:text-red-500" />
            </button>
          </Alert>
        </li>
      </ul>
    </CardBody>
  )
}

function Footer() {
  return (
    <CardFooter>
      <div className="mb-20 flex items-center justify-end gap-2">
        <p className="text-sm text-[#828fa8]">Move done things to end?</p>
        <Toggle />
      </div>
      <form>
        <label
          htmlFor="add-todo-list"
          className="mb-1 block text-sm text-[#828fa8]">
          Add to list
        </label>
        <div className="flex gap-1">
          <input
            type="text"
            id="add-todo-list"
            className="w-full rounded-sm py-2.5 px-5 shadow-sm outline-none sm:text-sm"
          />
          <button
            type="button"
            className="rounded-md bg-[#788fd2] px-2 text-white hover:bg-[#788fff]">
            <IcRoundPlus width={30} height={30} />
          </button>
        </div>
      </form>
    </CardFooter>
  )
}

export default function TodoList() {
  return (
    <Card>
      <Header />
      <Body />
      <Footer />
    </Card>
  )
}
