<template>
    <section class="create">
        <div class="container-lg">
            <h1 class="fs-4 fw-bold text-center mt-5">Create a new activity</h1>
            <form @submit.prevent="createActivity">
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
                            </select>
                        </div>
                        <!-- Time -->
                        <div class="mb-3">
                            <div class="form-label">Time <span class="text-danger">*</span></div>
                            <input v-model="time" type="time" placeholder="00 : 00"
                                class="form-control bg-light border-0">
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
                            <input v-model="start_date" type="date" class="form-control bg-light border-0">
                        </div>
                        <!-- Status -->
                        <div class="mb-3">
                            <div class="form-label">Status <span class="text-danger">*</span></div>
                            <select v-model="status" class="form-select border-0 bg-light">
                                <option value="" selected disabled>Choose Status</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Buttons -->
                <div class="btns d-flex hstack gap-4 justify-content-center align-items-center mt-2">
                    <button class="cancel btn btn-light px-5 text-white fw-bold"
                        @click="router.push({ name: 'dashboard' })">Cancel</button>
                    <button class="btn btn-success px-5 text-white fw-bold">Create</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        let title = ref('')
        let description = ref('')
        let school = ref('')
        let time = ref('')
        let location = ref('')
        let start_date = ref('')
        let status = ref('')

        let createActivity = async () => {
            // console.log(title.value, description.value, school.value, time.value, location.value, start_date.value)
            await fetch('http://localhost:3000/activities', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.value,
                    description: description.value,
                    start_date: start_date.value,
                    duration: time.value,
                    location: location.value,
                    school: school.value,
                    status: status.value
                })
            })
            router.push({ name: 'dashboard' });
        }

        return { title, description, school, time, location, start_date, status, createActivity, router }
    }
}
</script>

<style>
.form-title {
    margin-top: 100px;
}
</style>