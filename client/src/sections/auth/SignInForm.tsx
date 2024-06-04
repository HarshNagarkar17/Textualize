import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schema/auth/auth";
import RHFInput from "@/components/RHFInput";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { Link } from "react-router-dom";

const SignInForm = () => {
  interface DefaultValues {
    email: string;
    password: string;
  }

  const defaultValues: DefaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(signInSchema()),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: async (data: DefaultValues) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (response) => {
      console.log({ response });
    },
    onError: (error) => {
      console.log({ error });
    },
  });
  const handleFormSubmit = handleSubmit(async (data: DefaultValues) => {
    mutation.mutate(data);
  });

  return (
    <div className="max-w-7xl mx-auto">
      <FormProvider {...methods}>
        <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <RHFInput name="email" />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <RHFInput name="password" type="password" />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
             text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </FormProvider>
      <Link to="/auth/sign-up">signup</Link>
    </div>
  );
};

export default SignInForm;
