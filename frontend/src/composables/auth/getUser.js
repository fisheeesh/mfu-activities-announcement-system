import { auth } from "@/firebase/config"
import { ref } from "vue"

let user = ref(auth.currentUser)

/**
 * ? onAuthStateChanged() will be called when the user signs in or signs out while
 * ? the system do the authentication process
 */
auth.onAuthStateChanged(_user =>{
    console.log('Current user - ', _user)
    user.value = _user
})

let getUser = () =>{
    return { user }
}

export default getUser