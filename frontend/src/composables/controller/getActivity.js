import { ref } from "vue"
import { db } from "@/firebase/config"

let getActivity = (id) =>{
    let error = ref(null)
    let activity = ref(null)

    let load =  async () =>{
        try{
            /**
             * ?With Local Database (json-server, Mock REST API)
             */
            // let res = await fetch(`http://localhost:3000/activities/${id}`)
            // if(!res.ok) throw new Error('Not Found URL!')
            // let data = await res.json()
            // activity.value = data
            
            /**
             * ? With Firebase Database
             */
            let doc = await db.collection('posts').doc(id).get()
            activity.value = {...doc.data(), id : doc.id}
        }
        catch(err){
            error.value = err.message
            console.log(err.message)
        }
    }


    return { error, activity, load }
}

export default getActivity