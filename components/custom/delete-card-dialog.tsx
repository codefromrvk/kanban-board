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

const DeleteCardDialog = ({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: string;
}) => {
  const [modalState, setModalState] = useState(false);
  const form = useRef(null);
  const router = useRouter();
  const deleteCard = async (e: FormEvent<HTMLFormElement>) => {

    try {
      let result = await fetch(baseURL + "/card/" + id, {
        method: "DELETE",
      });
      result = await result.json();

      router.refresh();
    } catch (error) {
      console.log({ error });
    } finally {
      setModalState(false);
    }
    e.preventDefault();

  };
  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger asChild>
        <RiDeleteBin5Line size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> Card Details</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the card?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={deleteCard} ref={form} className="flex flex-col gap-3">
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

export default DeleteCardDialog;
