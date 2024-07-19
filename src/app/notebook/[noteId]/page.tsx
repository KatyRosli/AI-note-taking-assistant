import DeleteButton from "@/components/DeleteButton";
import TipTapEditor from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Footer from '@/components/Footer';
import { ArrowLeft } from "lucide-react";

type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }
  const user = await clerk.users.getUser(userId);
  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length != 1) {
    return redirect("/dashboard");
  }
  const note = notes[0];

  return (
    <div className="bg-gradient-to-r min-h-screen from-gray-950 via-sky-950 to-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-sm bg-white/30 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="border border-gray-300 hover:border-teal-500 hover:text-teal-500" size="sm">
            <ArrowLeft className="mr-1 w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold text-gray-950">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-teal-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="bg-sky-50 rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotebookPage;
