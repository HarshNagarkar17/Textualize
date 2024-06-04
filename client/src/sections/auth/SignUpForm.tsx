import RHFImage from '@/components/RHFImage'
import RHFInput from '@/components/RHFInput'
import { SignUpSchema } from '@/schema/auth/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query";
import axiosInstance from '@/utils/axios'
import { Link } from 'react-router-dom'

const SignUpForm = () => {

  type defaultValuesType = {
    email: string,
    password: string,
    // profileImage: File | string
}
const defaultValues: defaultValuesType = {
    email: '',
    password: '',
    // profileImage: ''
}
const methods = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(SignUpSchema())
})

const { handleSubmit } = methods;

const mutation = useMutation({
    mutationFn:async(data:any) => {
        const response = await axiosInstance.post("/auth/register", data);
        return response
    },
    mutationKey:['register']
})
const handleFormSubmit = handleSubmit(async (data: defaultValuesType) => {
    // const formData = new FormData();
    // formData.append('email', data.email);
    // formData.append('password', data.password);
    // formData.append('profileImage', data.profileImage);

    mutation.mutate(data, {
        onSuccess:(response) => {
            console.log({response})
        },
        onError:error => {
            console.log({error})
        }
    })
})
  return (
    <div className='max-w-7xl mx-auto'>
    <FormProvider {...methods}>
        <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
            {/* <div className="mb-5">
               <RHFImage name="profileImage" />
            </div> */}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Your email</label>
                {/* <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required /> */}
                <RHFInput name="email" />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">Your password</label>
                <RHFInput name="password" type="password" />
            </div>
            {/* <div className="mb-5">
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
            <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div> */}
            {/* <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div> */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>
    </FormProvider>
        <Link to="/auth/sign-in">signin</Link>
</div>
  )
}

export default SignUpForm