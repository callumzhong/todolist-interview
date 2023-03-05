import { Card, CardBody, CardFooter, CardHeader } from 'components/Card'

export default function TodoList() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl text-[#828fa8] ">TodoList</h2>
        <p className="text-xs text-[#b3bed1]">Add things to do</p>
      </CardHeader>
      <CardBody>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eos
        deserunt vitae fuga vero cum fugit maxime similique voluptatem
        consequuntur aliquid ipsum doloremque tempora, modi atque eaque tempore
        sunt distinctio?
      </CardBody>
      <CardFooter>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
      </CardFooter>
    </Card>
  )
}
