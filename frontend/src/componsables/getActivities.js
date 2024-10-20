import { ref } from "vue"

let getActivities = () => {
    let error = ref(null)
    let activities = ref([])

    let load = async () => {
        try {
            await new Promise((resolve, _) => setTimeout(resolve, 2000))
            let res = await fetch('http://localhost:3000/activities')
            if (!res.ok) throw new Error('Not Found URL!')
            let data = await res.json()

            activities.value = data
        }
        catch (err) {
            error.value = err.message
            console.log(err.message)
        }
    }

    return { error, activities, load }
}

export default getActivities