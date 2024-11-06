import { ref } from "vue"

let getActivity = (id) =>{
    let error = ref(null)
    let activity = ref(null)

    let load =  async () =>{
        try{
            /**
             * ?With Local Database (json-server, Mock REST API)
             */
            let res = await fetch(`http://localhost:3000/activities/${id}`)
            if(!res.ok) throw new Error('Not Found URL!')
            let data = await res.json()
            activity.value = data
        }
        catch(err){
            error.value = err.message
            console.log(err.message)
        }
    }


    return { error, activity, load }
}

export default getActivity