<template>
    <section class="create">
        <div class="container-lg">
            <h1 class="fs-4 fw-bold text-center mt-5">Edit activity</h1>
            <form @submit.prevent="editActivity">
                <div class="row mt-4">
                    <div class="col-md-6">
                        <!-- Title -->
                        <div class="mb-3">
                            <div class="form-label">Title <span class="text-danger">*</span></div>
                            <input v-model="title" type="text" placeholder="Activity Title"
                                class="form-control bg-light border-0">
                        </div>
                        <!-- Description -->
                        <div class="mb-3">
                            <div class="form-label">Description <span class="text-danger">*</span></div>
                            <textarea v-model="description" style="resize: none;" name="" id=""
                                class="form-control bg-light border-0" rows="4"
                                placeholder="Activity Description"></textarea>
                        </div>
                        <!-- School -->
                        <div class="mb-3">
                            <div class="form-label">School <span class="text-danger">*</span></div>
                            <select v-model="school" class="form-select border-0 bg-light">
                                <option value="" selected disabled>Choose School</option>
                                <option value="School of Information Technology">School of Information Technology
                                </option>
                                <option value="School of Management">School of Management</option>
                                <option value="School of Cosemtice Science">School of Cosemtice Science</option>
                                <option value="School of Laws">School of Laws</option>
                                <option value="School of Sinology">School of Sinology</option>
                                <option value="Mae-Fah-Luang University">Mae-Fah-Luang University</option>
                            </select>
                        </div>
                        <!-- Time -->
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-6">
                                    <label for="start_time">Start Time</label>
                                    <input v-model="start_time" type="time" class="form-control bg-light border-1"
                                        required>
                                </div>
                                <div class="col-6">
                                    <label for="end_time">End Time</label>
                                    <input v-model="end_time" type="time" class="form-control bg-light border-1"
                                        required>
                                </div>
                            </div>
                            <div class="invalid-feedback">
                                Please select a time.
                            </div>
                        </div>
                        <!-- Location -->
                        <div class="mb-3">
                            <div class="form-label">Location <span class="text-danger">*</span></div>
                            <input v-model="location" type="text" placeholder="Indoor Stadium"
                                class="form-control bg-light border-0">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <!-- Start Date -->
                        <div class="mb-3">
                            <div class="form-label">Date <span class="text-danger">*</span></div>
                            <v-date-picker v-model="date" color="primary" elevation="1"></v-date-picker>
                        </div>
                    </div>
                </div>
                <!-- Buttons -->
                <div class="btns d-flex hstack gap-4 justify-content-center align-items-center mt-2">
                    <button class="cancel btn btn-light px-5 text-white fw-bold"
                        @click.prevent="router.push({ name: 'dashboard' })">Cancel</button>
                    <button class="btn btn-success px-5 text-white fw-bold">Edit</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { format } from 'date-fns';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: [
        'id'
    ],
    setup(props) {
        const router = useRouter();
        let title = ref()
        let description = ref()
        let school = ref()
        let start_time = ref()
        let end_time = ref()
        let location = ref()
        let date = ref()

        onMounted(async () => {
            let res = await fetch(`http://localhost:3000/activities/${props.id}`)
            let data = await res.json()
            title.value = data.title
            description.value = data.description
            school.value = data.school
            start_time.value = data.start_time
            end_time.value = data.end_time
            location.value = data.location
            date.value = new Date(data.date);
        })

        let editActivity = async () => {
            const formattedDate = format(new Date(date.value), 'MMM d, yyyy');

            await fetch(`http://localhost:3000/activities/${props.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.value,
                    description: description.value,
                    start_time: start_time.value,
                    end_time: end_time.value,
                    date: formattedDate,
                    location: location.value,
                    school: school.value,
                })
            })
            router.push({ name: 'dashboard' });
        }

        return { router, editActivity, title, description, school, start_time, end_time, location, date }
    }
}
</script>

<style></style>