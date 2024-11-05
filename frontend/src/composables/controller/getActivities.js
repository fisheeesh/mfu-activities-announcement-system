import { ref } from "vue"
import { db } from "@/firebase/config"

let getActivities = () => {
    let error = ref(null)
    let activities = ref([])

    let load = async () => {
        try {
            /**
             * ? With Local Database (json-server, Mock REST API)
             */
            // await new Promise((resolve, _) => setTimeout(resolve, 1000))
            // let res = await fetch('http://localhost:3000/activities')
            // if (!res.ok) throw new Error('Not Found URL!')
            // let data = await res.json()

            // activities.value = data

            /**
             * ? With Firebase Database
             */
            let response = await db.collection('activities').get()
            activities.value = response.docs.map(doc => ({...doc.data(), id : doc.id}))
        }
        catch (err) {
            error.value = err.message
            console.log(err.message)
        }
    }

    return { error, activities, load }
}

export default getActivities