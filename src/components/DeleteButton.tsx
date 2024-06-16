"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", {
        noteId,
      });
      return response.data;
    },
  });

  const handleDelete = async () => {
    // Replace window.confirm with window.alert
    window.alert("Are you sure you want to delete this note?");
    
    try {
      await deleteNote.mutateAsync();
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={deleteNote.isPending}
      onClick={handleDelete}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;