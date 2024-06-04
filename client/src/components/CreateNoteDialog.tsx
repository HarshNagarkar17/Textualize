import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema } from '@/schema/note'
import RHFInput from './RHFInput'
import { useRouter } from '@/hooks/use-router';
import axiosInstance from '@/utils/axios';


const CreateNoteDialog = () => {
    const router = useRouter();

    interface DefaultValues{
        name: string
    }

    const defaultValues: DefaultValues = {
        name:""
    }

    const methods = useForm({
        defaultValues,
        mode:"onBlur",
        resolver:zodResolver(noteSchema())
    })

    const {handleSubmit} = methods;

    const createNoteBook = useMutation({
        mutationKey:["createBook"],
        mutationFn: async(data:any) => {
            const res = await axiosInstance.post("/api/createBlog", data)
            return res.data
        }
    })

    const handleFormSubmit = handleSubmit(async(data:any) => {
        createNoteBook.mutate(data,{
            onSuccess:(response) => {
                // const {message,note_id} = response;
                console.log({response})
                // router.push(`notebook/${note_id}`)
            },
            onError: error => {
                console.error({error})
            }
        })
    })
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                <Plus className='w-6 h-6 text-green-600' strokeWidth={3} />
                <h2 className='font-semibold text-green-600 sm:mt-2'>New Note book</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                New Note Book
                </DialogTitle>
                <DialogDescription>

                you can create a new not by clicking the btn below.
                </DialogDescription>
            </DialogHeader>
            <FormProvider {...methods}>

            <form onSubmit={handleFormSubmit}>
                <RHFInput name='name' placeholder='Name...' type='text' />
                {/* <Input placeholder='Name...' value={input} onChange={(e) => setInput(e.target.value)} /> */}
                <div className="h-4"></div>
                <div className="flex items-center gap-2">
                    <Button type='reset' variant={'secondary'}>Cancel</Button>
                    <Button className='bg-green-600' type='submit' disabled={createNoteBook.isPending}>
                        {createNoteBook.isPending && (
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    )} 
                        Create
                        </Button>
                </div>
            </form>
                    </FormProvider>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog