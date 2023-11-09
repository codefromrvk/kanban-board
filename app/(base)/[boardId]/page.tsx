"use client";

import BoardColumn from "@/components/custom/board-column";
import CreateDialog from "@/components/custom/create-card-dialog";
import DeleteBoardDialog from "@/components/custom/delete-board-dialog";
import EditBoardDialog from "@/components/custom/edit-board-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BoardDataType } from "@/lib/types";
import { baseURL, reArrange } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

export const dynamic = "force-dynamic";

const Board = ({ params: { boardId } }: { params: { boardId: string } }) => {
  const [boardData, setBoardData] = useState<BoardDataType>({
    todo: [],
    inProgress: [],
    completed: [],
    board: [],
  });
  useEffect(() => {
    async function getBoardData() {
      const responses = await fetch(baseURL + "/card/board/" + boardId);
      const result: BoardDataType = await responses.json();
      setBoardData(result);
    }

    getBoardData();
  }, []);

  //fetch all boards

  const handleDragEnd = async ({
    source,
    destination,
  }: {
    source: { droppableId: string; index: number };
    destination: { droppableId: string; index: number };
  }) => {
    if (!destination) return;

    const data: BoardDataType = { ...boardData };

    if (source.droppableId !== destination.droppableId) {
      setBoardData(reArrange(data, source, destination));
    } else {
      const [removed] = data[source.droppableId as keyof BoardDataType].splice(
        source.index,
        1
      );
      data[destination.droppableId as keyof BoardDataType].splice(
        destination.index,
        0,
        removed
      );
      setBoardData(data);
    }
    const reqData = {
      position: destination.index - 1,
      status: destination.droppableId,
    };
    const id =
      boardData[destination.droppableId as keyof BoardDataType][
        destination.index
      ]._id;

    try {
      let result = await fetch(baseURL + "/card/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });
      result = await result.json();
    } catch (error) {
      console.log({ error });
    }
  };

  return Boolean(boardData.board) ? (
    <section className="min-h-screen bg-white p-6 ">
      {boardData?.board[0] ? (
        <div className="flex justify-between">
          <div className="w-[40%]">
            <h1 className="text-3xl">{boardData?.board[0]?.name}</h1>
            <div className="text-sm truncate  overflow-hidden  ">
              Description:{boardData?.board[0]?.description}
            </div>
          </div>
          <div className="flex gap-2">
            <EditBoardDialog
              name={boardData?.board[0]?.name}
              description={boardData?.board[0]?.description}
              boardId={boardId}
            />
            <DeleteBoardDialog
              name={boardData?.board[0]?.name}
              description={boardData?.board[0]?.description}
              boardId={boardId}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className=" w-[300px] h-[40px] rounded-sm" />
          <Skeleton className=" h-[30px] rounded-sm" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-5 my-2">
        {/* @ts-ignore */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="  p-2 ">
            <p className="flex justify-between">
              <span className="text-lg my-2">To Do</span>
              <CreateDialog name="Add card" boardId={boardId} status={"todo"} />
            </p>
            <div className="border-2 rounded-lg  overflow-auto max-h-screen p-2">
              <BoardColumn data={boardData?.todo} id={"todo"} />
            </div>
          </div>
          <div className="p-2">
            <p className="flex justify-between">
              <span className="text-lg my-2">In Progress</span>
              <CreateDialog
                name="Add card"
                boardId={boardId}
                status={"inProgress"}
              />
            </p>
            <div className="border-2 rounded-lg overflow-auto max-h-screen p-2">
              <BoardColumn data={boardData.inProgress} id={"inProgress"} />
            </div>
          </div>
          <div className="p-2 ">
            <p className="flex justify-between">
              <span className="text-lg my-2">Completed</span>
              <CreateDialog
                name="Add card"
                boardId={boardId}
                status={"completed"}
              />
            </p>
            <div className="border-2 rounded-lg overflow-auto max-h-screen p-2">
              <BoardColumn data={boardData.completed} id={"completed"} />
            </div>
          </div>
        </DragDropContext>
      </div>
    </section>
  ) : (
    <div className="flex flex-col gap-2 justify-center min-h-screen bg-white items-center ">
      <div className="text-3xl">Board not found!!</div>
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default Board;
