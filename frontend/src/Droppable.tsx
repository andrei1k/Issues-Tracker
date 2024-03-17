import { ReactNode, useState } from 'react';
import { useDrop } from 'react-dnd';



const DroppableContainer = ({ children }: {children?: ReactNode[]}) => {

  const [list, setList] = useState(children ?? [])

  const [{ isOver }, drop] = useDrop({
    accept: 'issue',
    drop: (item: ReactNode) => {
      list.push(item)
      setList(list)
      console.log(list)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : '#eee' }}>
      {
        list.map(element => element)
      }
    </div>
  );
};

export default DroppableContainer;
