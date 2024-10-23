import { auth } from "@/firebase/config"

let signOut = async() => {
    await auth.signOut()
    console.log('User Logged Out.')
}

let useSignOut = () =>{
    return { signOut }
}

export default useSignOut