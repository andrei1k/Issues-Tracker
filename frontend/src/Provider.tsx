import { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableContainer from "./Droppable";
import { DraggableComponent } from "./Draggable";




export function Provider({children}: {children: ReactNode}) {



    return (
        <div style={{height: '500px', width: '500px', display: "flex", gap: '20px'}}>
            <DndProvider backend={HTML5Backend}>
                <DroppableContainer children={[<DraggableComponent id={1} text="yo"/>]}/>
                <DroppableContainer children={[<DraggableComponent id={2} text="ok"/>]}/>
            </DndProvider>
        </div>
    )
  }