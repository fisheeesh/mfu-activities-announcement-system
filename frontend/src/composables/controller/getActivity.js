import axios from "axios"
import { ref } from "vue"

let getActivity = (id) =>{
    let error = ref(null)
    let activity = ref(null)

    let load =  async () =>{
        try{
            await new Promise((resolve, _) => setTimeout(resolve, 1000))
            let res = await axios.get(`http://localhost:1337/api/activities/${id}`)
            activity.value = res.data.data
        }
        catch(err){
            error.value = err.message
            console.log(err.message)
        }
    }


    return { error, activity, load }
}

export default getActivity