import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
const App = () => {

  const data  = { 
    List :[
    {
      id:"1",
      name : "3"
    },
    {
      id:"2",
      name:"7"
    },
    {
      id:"3",
      name : "2"
    },
    {
      id:"4",
      name:"5"
    },{
      id:"5",
      name : "1"
    },{
      id : "6",
      name:"6"
    },{
      id : "7",
      name:"4"
    }
  ],
  getList: function () {
    return (
      (localStorage.getItem("theList") &&
        JSON.parse(localStorage.getItem("theList"))) ||
      this.List
    );
  },
  saveList : function(List){
    localStorage.setItem("theList",JSON.stringify(List));
  }
}

const list  = data.getList();

  return(
    <>
      <div className = "App">
        <DragDropContext
          onDragEnd= {
            (param) => {
                console.log(param);
                const srcI = param.source.index;
                const desI = param.destination.index;
               if(desI){
                list.splice(desI, 0, list.splice(srcI, 1)[0]);
                data.saveList(list);
               }
            }
          }
        >
        <div className="container p-2 pb-5 rounded border border-2 shadow mt-5">{/* <ListContainer> */}
          <h1 className="text-center">Drag and Drop</h1>
          <hr/> 
          <Droppable droppableId = "droppable">
            {(provided, snapshot) => (
              <div ref = {provided.innerRef} {...provided.droppableProps}>
               {list.map((item,i)=>(
                 <Draggable 
                    key = {item.id} 
                    draggableId = {item.id } 
                    index ={i}
                 >
                   {(provided,snapshot)=>(
                      <div 
                        className="p-2 mx-auto shawdow w-25 mt-5 border border-2 border-primary rounded d-flex justify-content-around"
                        {...provided.dragHandleProps}
                        ref = {provided.innerRef}
                        // {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        style= {{ ...provided.draggableProps.style, boxShadow : snapshot.isDragging?"0 0 0.5rem #666" : "none"}}
                      > {/* <ListItem> */}
                        <h4 className="fst-italic">{item.name}</h4>
                        <h4 >
                          <FontAwesomeIcon
                            icon={faArrowsAlt}
                            className="action-move-icon text-primary"
                            title="drag to move action"   
                          />
                        </h4>
                      </div> 
                   )}
                 </Draggable>
                ))}
                {provided.placeholder}
             </div>
            )}
          </Droppable>
        </div>  {/* <ListContainer> */}
        </DragDropContext>
      </div>
    </>
  )

}

export default App;