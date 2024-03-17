import { useDrag } from "react-dnd";

export const DraggableComponent = ({ id , text }: {id: number, text:string}) => {
  
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'issue',
      item: <DraggableComponent id={id} text={text}/>,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
      options: {dropEffect: 'move'}
    }))
  
    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {text}
      </div>
    );
  };