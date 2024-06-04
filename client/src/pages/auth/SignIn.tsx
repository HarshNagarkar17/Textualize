import SignInForm from "@/sections/auth/SignInForm"
import {Helmet} from "react-helmet"

const SignIn = () => {
    return(
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <SignInForm />
        </>
    )
}

export default SignIn