import { auth } from "@/firebase/config"

let logOut = async() => {
    await auth.signOut()
    console.log('User Logged Out.')
}

let useSignOut = () =>{
    return { logOut }
}

export default useSignOut