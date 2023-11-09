"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { baseURL } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";

const DeleteBoardDialog = ({
  name,
  description,
  boardId,
}: {
  name: string;
  description: string;
  boardId: string;
}) => {
  const [modalState, setModalState] = useState(false);
  const form = useRef(null);
  const router = useRouter();
  const deleteBoard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let result = await fetch(baseURL + "/board/" + boardId, {
        method: "DELETE",
      });
      result = await result.json();
      console.log({ result });
    } catch (error) {
      console.log({ error });
    } finally {
      setModalState(false);
    }
    router.push("/");
  };
  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> Board Details</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the board?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={deleteBoard} ref={form} className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                disabled={true}
                id="name"
                defaultValue={name}
                type="text"
                name="name"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                disabled={true}
                id="description"
                defaultValue={description}
                name="description"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <div className="flex items-center space-x-2">
              <Button type="submit">Delete</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoardDialog;
