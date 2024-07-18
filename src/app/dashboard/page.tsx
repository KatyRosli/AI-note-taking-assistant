import CreateNoteDialog from "@/components/CreateNoteDiaglog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "@/components/Footer";

type Props = {};

const DashboardPage = async (props: Props) => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));

  return (
    <>
      <div className="bg-gradient-to-r min-h-screen from-gray-950 via-sky-950 to-gray-950">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="border border-gray-300 hover:border-teal-500 hover:text-teal-500" size="sm">
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-violet-600 bg-clip-text text-transparent">My Notes</h1>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          {/* list all the notes */}
          {/* if no notes, display this */}
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-300">You have no notes yet.</h2>
            </div>
          )}

          {/* display all the notes */}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateNoteDialog />
            {notes.map((note) => {
              return (
                <a href={`/notebook/${note.id}`} key={note.id}>
                  <div className="backdrop-blur-sm bg-white/30 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <Image
                      width={400}
                      height={200}
                      alt={note.name}
                      src={note.imageUrl || ""}
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-teal-500">
                        {note.name}
                      </h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-200">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;