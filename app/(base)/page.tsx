import DialogButton from "@/components/custom/dialog-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { baseURL } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const response = await fetch(baseURL + "/board", { cache: "no-store" });
  const boardList: Array<{ _id: string; name: string; description: string }> =
    await response.json();

  return (
    <main className="bg-white flex flex-col gap-3 p-5">
      <section className="flex  justify-between">
        <h1 className="text-3xl">Boards</h1>
        <DialogButton name="Create New" />
      </section>

      <section>
        <ul className="flex flex-col gap-3">
          {boardList.map((board) => {
            return (
              <Card
                key={board._id}
                className="p-3 flex justify-between items-center "
              >
                <span>{board.name}</span>
                <Link href={`${board._id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
              </Card>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Home;
