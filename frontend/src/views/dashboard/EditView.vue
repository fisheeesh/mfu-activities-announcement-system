<template>
    <div v-if="delay" class="m-auto text-center mt-8 py-7">
        <ScaleLoader :color="'#BA1E23'" />
    </div>
    <section v-else class="create">
        <div class="container-lg">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <h1 class="fs-4 fw-bold text-center mt-5">Edit activity</h1>
                    <form @submit.prevent="editActivity" novalidate>
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <!-- Title -->
                                <div class="mb-3">
                                    <div class="form-label">Title <span class="text-danger">*</span></div>
                                    <input @keydown.enter.prevent required v-model="title"
                                        :class="{ 'is-invalid': showError('title') }" type="text"
                                        placeholder="Activity Title" class="form-control bg-light border-1">
                                    <div class="invalid-feedback">
                                        Please provide a title.
                                    </div>
                                </div>
                                <!-- Description -->
                                <div class="mb-3">
                                    <div class="form-label">Description <span class="text-danger">*</span></div>
                                    <textarea required v-model="description"
                                        :class="{ 'is-invalid': showError('description') }" style="resize: none;"
                                        name="" id="" class="form-control bg-light border-1" rows="4"
                                        placeholder="Activity Description"></textarea>
                                    <div class="invalid-feedback">
                                        Please provide a description.
                                    </div>
                                </div>
                                <!-- School -->
                                <div class="mb-3">
                                    <div class="form-label">School <span class="text-danger">*</span></div>
                                    <select required v-model="school" :class="{ 'is-invalid': showError('school') }"
                                        class="form-select border-1 bg-light">
                                        <option value="" selected disabled>Choose School</option>
                                        <option value="School of Agro Industry">School of Agro Industry</option>
                                        <option value="School of Anti-aging Regenerative Medicine">School of Anti-aging
                                            Regenerative Medicine</option>
                                        <option value="School of Cosmetic Science">School of Cosmetic Science</option>
                                        <option value="School of Dentistry">School of Dentistry</option>
                                        <option value="School of Health Science">School of Health Science</option>
                                        <option value="School of Applied Digital Technology">School of Applied Digital
                                            Technology
                                        </option>
                                        <option value="School of Integrated Medicine">School of Integrated Medicine
                                        </option>
                                        <option value="School of Laws">School of Laws</option>
                                        <option value="School of Liberal Arts">School of Liberal Arts</option>
                                        <option value="School of Management">School of Management</option>
                                        <option value="School of Medicine">School of Medicine</option>
                                        <option value="School of Nursing">School of Nursing</option>
                                        <option value="School of Science">School of Science</option>
                                        <option value="School of Sinology">School of Sinology</option>
                                        <option value="School of Social Innovation">School of Social Innovation</option>
                                        <option value="Mae-Fah-Luang University">Mae-Fah-Luang University</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a school.
                                    </div>
                                </div>
                                <!-- Time -->
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="start_time">Start Time <span
                                                    class="text-danger">*</span></label>
                                            <input v-model="start_time" type="time"
                                                :class="{ 'is-invalid': showError('start_time') }"
                                                class="form-control bg-light border-1" required>
                                        </div>
                                        <div class="col-6">
                                            <label for="end_time">End Time <span class="text-danger">*</span></label>
                                            <input v-model="end_time" type="time"
                                                :class="{ 'is-invalid': showError('end_time') || !isEndTimeValid }"
                                                class="form-control bg-light border-1" required>
                                            <div v-if="!isEndTimeValid" class="invalid-feedback">
                                                End time must be later than start time.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Location -->
                                <div class="mb-3">
                                    <div class="form-label">Location <span class="text-danger">*</span></div>
                                    <input @keydown.enter.prevent required v-model="location"
                                        :class="{ 'is-invalid': showError('location') }" type="text"
                                        placeholder="Indoor Stadium" class="form-control bg-light border-1">
                                    <div class="invalid-feedback">
                                        Please provide a location.
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- Start Date -->
                                <div class="mb-3">
                                    <div class="form-label">Date <span class="text-danger">*</span></div>
                                    <v-date-picker v-model="date" style="padding-bottom: 13.5px;"
                                        :class="{ 'is-invalid': showError('date') }" color="primary"
                                        elevation="1"></v-date-picker>
                                </div>
                                <div class="invalid-feedback">
                                    Please select a date.
                                </div>
                            </div>
                        </div>
                        <!-- Buttons -->
                        <div class="btns d-flex hstack gap-4 justify-content-center align-items-center mt-2">
                            <button class="cancel btn btn-light px-5 text-white fw-bold"
                                @click.prevent="router.push({ name: 'dashboard' })">Cancel</button>
                            <button class="btn btn-success px-5 text-white fw-bold">
                                <span v-if="isLoading" class="spinner-border text-white spinner-border-sm me-3"
                                    role="status" aria-hidden="true"></span>Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import { useToast } from 'vue-toastification';
import { format, isSameDay, isBefore, isAfter, parse } from 'date-fns';

const props = defineProps(['id'])

const toast = useToast();
const router = useRouter();
let title = ref(null)
let description = ref(null)
let school = ref(null)
let start_time = ref(null)
let end_time = ref(null)
let location = ref(null)
let date = ref(null)
let type = ref(null)

const delay = ref(true)
const isLoading = ref(false)

const touchedFields = ref({})

const showError = field => touchedFields.value[field] && !eval(field).value

// To ensure end time is later than start time
const isEndTimeValid = computed(() => {
    // Check both fields are filled or not
    if (!start_time.value || !end_time.value) return true;
    return end_time.value > start_time.value;
});

onMounted(async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        let res = await axios.get(`http://localhost:1337/api/activities/${props.id}`)
        console.log(res.data.data)

        title.value = res.data.data.title
        description.value = res.data.data.description
        school.value = res.data.data.school
        start_time.value = res.data.data.start_time.substring(0, 5)
        end_time.value = res.data.data.end_time.substring(0, 5)
        location.value = res.data.data.location
        date.value = new Date(res.data.data.date);
        type.value = res.data.data.type
    }
    catch (err) {
        console.error('Error Fetcing Specific Activity', err)
    }
    finally {
        delay.value = false
    }
})

let editActivity = async () => {
    touchedFields.value = {
        title: true,
        description: true,
        school: true,
        location: true,
        date: true,
        start_time: true,
        end_time: true
    };

    if (title.value && description.value && school.value && start_time.value && end_time.value && location.value && date.value && isEndTimeValid.value) {
        try {
            isLoading.value = true;
            // Format the date and times correctly
            const formattedDate = new Date(date.value).toLocaleDateString('en-CA');
            // Format as HH:mm:ss.SSS
            let formattedStartTime = `${start_time.value}:00.000`;
            // Format as HH:mm:ss.SSS
            let formattedEndTime = `${end_time.value}:00.000`;

            const current = new Date();
            const activityDate = new Date(date.value);
            const startTime = parse(formattedStartTime.substring(0, 5), 'HH:mm', activityDate);
            const endTime = parse(formattedEndTime.substring(0, 5), 'HH:mm', activityDate);
            const calculateType = ref(null)

            if (isSameDay(current, activityDate)) {
                if (isBefore(current, startTime)) {
                    console.log('Same day - upcoming')
                    calculateType.value = 'upcoming'

                } else if (isAfter(current, startTime) && isBefore(current, endTime)) {
                    console.log('Same day - ongoing')
                    calculateType.value = 'ongoing'
                } else if (isAfter(current, endTime)) {
                    console.log('Same day - completed')
                    calculateType.value = 'completed'
                }
            }
            else if (isBefore(current, activityDate)) {
                console.log('Not the same day - upcoming')
                calculateType.value = 'upcoming'
            }
            else {
                calculateType.value = 'completed'
            }

            let res = await axios.put(`http://localhost:1337/api/activities/${props.id}`, {
                data: {
                    title: title.value,
                    description: description.value,
                    location: location.value,
                    type: calculateType.value,
                    date: formattedDate, // Date in YYYY-MM-DD
                    start_time: `${start_time.value}:00.000`, // Start time in HH:mm:ss.SSS
                    end_time: `${end_time.value}:00.000`, // End time in HH:mm:ss.SSS
                    school: school.value
                }
            });

            console.log(res, "Activity edited successfully", startTime, endTime, activityDate, calculateType.value);
            toast.success('Activity Edited Successfully');
            router.push({ name: 'dashboard' });
            isLoading.value = false;
        } catch (err) {
            // Log detailed error information
            console.error('Error Editing Activity:', err.response?.data || err.message);
            toast.error('Error Editing Activity');
            isLoading.value = false;
        }
    }
};
</script>

<style></style>