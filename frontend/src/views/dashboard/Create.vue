<template>
    <section class="create">
        <div class="container-lg">
            <h1 class="fs-4 fw-bold text-center mt-5">Create a new activity</h1>
            <form @submit.prevent="createActivity" novalidate>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <!-- Title -->
                        <div class="mb-3">
                            <div class="form-label">Title <span class="text-danger">*</span></div>
                            <input @keydown.enter.prevent v-model="title" type="text" placeholder="Activity Title"
                                :class="{ 'is-invalid': showError('title') }" class="form-control bg-light border-1"
                                required>
                            <div class="invalid-feedback">
                                Please provide a title.
                            </div>
                        </div>
                        <!-- Description -->
                        <div class="mb-3">
                            <div class="form-label">Description <span class="text-danger">*</span></div>
                            <textarea v-model="description" style="resize: none;"
                                :class="{ 'is-invalid': showError('description') }"
                                class="form-control bg-light border-1" rows="4" placeholder="Activity Description"
                                required></textarea>
                            <div class="invalid-feedback">
                                Please provide a description.
                            </div>
                        </div>
                        <!-- School -->
                        <div class="mb-3">
                            <div class="form-label">School <span class="text-danger">*</span></div>
                            <select v-model="school" :class="{ 'is-invalid': showError('school') }"
                                class="form-select border-1 bg-light" required>
                                <option value="" selected disabled>Choose School</option>
                                <option value="School of Information Technology">School of Information Technology
                                </option>
                                <option value="School of Management">School of Management</option>
                                <option value="School of Cosmetic Science">School of Cosmetic Science</option>
                                <option value="School of Laws">School of Laws</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a school.
                            </div>
                        </div>
                        <!-- Time -->
                        <div class="mb-3">
                            <div class="form-label">Time <span class="text-danger">*</span></div>
                            <input v-model="time" type="time" :class="{ 'is-invalid': showError('time') }"
                                class="form-control bg-light border-1" required>
                            <div class="invalid-feedback">
                                Please select a time.
                            </div>
                        </div>
                        <!-- Location -->
                        <div class="mb-3">
                            <div class="form-label">Location <span class="text-danger">*</span></div>
                            <input @keydown.enter.prevent v-model="location" type="text" placeholder="Indoor Stadium"
                                :class="{ 'is-invalid': showError('location') }" class="form-control bg-light border-1"
                                required>
                            <div class="invalid-feedback">
                                Please provide a location.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <!-- Start Date -->
                        <div class="mb-3">
                            <div class="form-label">Date <span class="text-danger">*</span></div>
                            <input v-model="start_date" type="date" :class="{ 'is-invalid': showError('start_date') }"
                                class="form-control bg-light border-1" required>
                            <div class="invalid-feedback">
                                Please select a date.
                            </div>
                        </div>
                        <!-- Status -->
                        <div class="mb-3">
                            <div class="form-label">Status <span class="text-danger">*</span></div>
                            <select v-model="status" :class="{ 'is-invalid': showError('status') }"
                                class="form-select border-1 bg-light" required>
                                <option value="" selected disabled>Choose Status</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a status.
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Buttons -->
                <div class="btns d-flex hstack gap-4 justify-content-center align-items-center mt-2">
                    <button class="cancel btn btn-light px-5 text-white fw-bold"
                        @click="router.push({ name: 'dashboard' })">Cancel</button>
                    <button type="submit" class="btn btn-success px-5 text-white fw-bold">Create</button>
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
        let title = ref('');
        let description = ref('');
        let school = ref('');
        let time = ref('');
        let location = ref('');
        let start_date = ref('');
        let status = ref('');

        // To track if a field has been touched
        let touchedFields = ref({});

        const showError = (field) => {
            return touchedFields.value[field] && !eval(field).value;
        };

        let createActivity = async () => {
            // Mark all fields as touched
            touchedFields.value = {
                title: true,
                description: true,
                school: true,
                time: true,
                location: true,
                start_date: true,
                status: true
            };

            // Validate the form
            if (title.value && description.value && school.value && time.value && location.value && start_date.value && status.value) {
                await fetch('http://localhost:3000/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: title.value,
                        description: description.value,
                        start_date: start_date.value,
                        duration: time.value,
                        location: location.value,
                        school: school.value,
                        status: status.value
                    }),
                });
                router.push({ name: 'dashboard' });
            }
        };

        return { title, description, school, time, location, start_date, status, createActivity, showError, router };
    },
};
</script>

<style></style>