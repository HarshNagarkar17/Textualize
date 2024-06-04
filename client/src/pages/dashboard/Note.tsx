import { blogService } from "@/api";
import TipTapEditor from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const Note = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['getBlog', id], 
    queryFn: () => blogService.getSingleBlog(id!),
    enabled: !!id,
  }); 
  if (isLoading) return <div>Loading...</div>;
  
  // if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className='min-h-screen grainy p-8'>
        <div className='max-w-4xl mx-auto'>
            <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
            <Link to={'/'}>
                <Button className='bg-green-600' size='sm'>Back</Button>
            </Link>
            <div className="w-3"></div>
            <span className='font-semibold'>ved  </span>

            <span className='inline-block mx-1'>/</span>
            <span className='text-stone-500 font-semibold'>{data?.name}</span> 
            <div className='ml-auto'>DELETE BUTTON</div>
            </div>
            <div className="h-4"></div>

            <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
                <TipTapEditor note={data} />
            </div>
        </div>
    </div>
  );
};

export default Note;
