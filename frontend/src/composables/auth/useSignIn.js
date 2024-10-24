import { auth } from "@/firebase/config"
import { ref } from "vue"

let error = ref(null)

let logIn = async (email, password) => {
    if(!email || !password) {
        error.value = 'Email and password are required'
        return
    }
    try {
        let response = await auth.signInWithEmailAndPassword(email, password)
        if (!response) throw new Error("Could not log in. Check your credentials and try again.")
        return response
    }
    catch(err){
        /**
         * * We need to check error code to know what is the error
         * * otherwise, the default message will not be in formatted
         */
        switch(err.code){
            case 'auth/user-not-found':
                error.value = 'User not found'
                break
            case 'auth/wrong-password':
                error.value = 'Wrong password'
                break
            default:
                error.value = 'Could not log in. Check your credentials and try again.'
        }
    }
}

let useSignIn = () => {
    return { error, logIn }
}

export default useSignIn