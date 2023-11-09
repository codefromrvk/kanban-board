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

const CreateDialog = ({
  name,
  boardId,
  status,
}: {
  name: string;
  boardId: string;
  status: string;
}) => {
  const [modalState, setModalState] = useState(false);
  const form = useRef(null);
  const router = useRouter();
  const createCard = async (e: FormEvent<HTMLFormElement>) => {
    const formValues = new FormData(form.current!);
    const data = {
      boardId: boardId,
      name: formValues.get("name"),
      description: formValues.get("description"),
      status,
    };

    try {
      let result = await fetch(baseURL + "/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      result = await result.json();
    } catch (error) {
      console.log({ error });
    } finally {
      setModalState(false);
    }
    router.refresh();
    e.preventDefault();
  };
  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger asChild>
        <Button variant="secondary">{name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Card</DialogTitle>
          <DialogDescription>
            Please add the name and description for the board
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createCard} ref={form} className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" name="name" required />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" type="text" name="description" required />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <div className="flex items-center space-x-2">
              <Button type="submit">Submit</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
