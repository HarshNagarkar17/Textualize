import SignUpForm from "@/sections/auth/SignUpForm"
import {Helmet} from "react-helmet"

const SignUp = () => {
    return(
        <>
        <Helmet>
            <title>register</title>
        </Helmet>
        <SignUpForm />
        </>
    )
}

export default SignUp