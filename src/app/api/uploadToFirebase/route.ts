import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();
    // extract out the dalle imageurl
    // save it to firebase
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));
    if (!notes[0].imageUrl) {
      return new NextResponse("no image url", { status: 400 });
    }
    // Ensure this code is only executed in the client-side context
    let firebase_url;
    if (typeof window !== 'undefined') {
      firebase_url = await uploadFileToFirebase(
        notes[0].imageUrl,
        notes[0].name
      );
    } else {
      // Handle server-side or non-browser environment logic
      firebase_url = notes[0].imageUrl; // Placeholder for non-browser logic
    }
    // update the note with the firebase url
    await db
      .update($notes)
      .set({
        imageUrl: firebase_url,
      })
      .where(eq($notes.id, parseInt(noteId)));
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}
