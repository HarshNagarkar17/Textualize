import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { blogService } from "@/api";

interface Note {
  name: string;
  _id: string;
  imageUrl: string;
  createdAt: string;
}

const DashboardPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const { data, isLoading,} = useQuery({
    queryKey: ["getBlogs"],
    queryFn: blogService.getBlogs,
  });

  useEffect(() => {
    if (data) {
      setNotes(data?.blogs);
    }
  }, [data]);

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10 pt-4">
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          {
            isLoading ? (
              <div>
                loading
              </div>
            ) : (
          <div>
            {notes.length === 0 ? (
              <div className="text-center">
                <h2 className="text-xl text-gray-500">
                  You have no notes yet.
                </h2>
              </div>
            ) : (
              <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
                <CreateNoteDialog />
                {notes?.map((note) => (
                  <Link to={`/notes/${note._id}`} key={note._id}>
                    <div className="border border-stone-200 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {note.name}
                        </h3>
                        <div className="h-1"></div>
                        <p className="text-sm text-gray-500">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
