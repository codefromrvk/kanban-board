import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditCardDialog from "./edit-card-dialog";
import DeleteCardDialog from "./delete-card-dialog";

const BoardColumn = ({ data, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-screen">
          {data?.map((item, i) => {
            return (
              <Draggable key={item._id} draggableId={item._id} index={i}>
                {(provided, snapshot) => (
                  <Card
                    className="h-44 mb-5 p-2 mt-2  overflow-hidden text-ellipsis z-10 "
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={` flex justify-end cursor-pointer gap-2 ${
                        snapshot.isDragging ? "hidden" : ""
                      }`}
                    >
                      <EditCardDialog
                        name={item.name}
                        description={item.description}
                        id={item._id}
                      />
                      <DeleteCardDialog
                        name={item.name}
                        description={item.description}
                        id={item._id}
                      />
                    </div>
                    <div {...provided.dragHandleProps}>
                      <p className=" ml-6 mt-4 justify-between font-semibold text-gray-700">
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </p>
                      <CardContent className="my-2">
                        <p className="text-sm text-gray-500">
                          Status:{item.status}
                        </p>
                        <p className="h-28 truncate">
                          Description:{item.description}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default BoardColumn;
