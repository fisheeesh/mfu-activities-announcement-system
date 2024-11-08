import axios from "axios";
import { ref } from "vue";

let getActivities = () => {
    let error = ref(null);
    let activities = ref([]);

    let load = async () => {
        try {
            /**
             * ? With strapi
             */
            await new Promise((resolve, _) => setTimeout(resolve, 1000));
            let res = await axios.get('http://localhost:1337/api/activities', {
                params: {
                    sort: ['createdAt:desc'] // Sort by createdAt in descending order
                }
            });
            activities.value = res.data.data;
        }
        catch (err) {
            error.value = err.message;
            console.log(err.message);
        }
    };

    return { error, activities, load };
};

export default getActivities;