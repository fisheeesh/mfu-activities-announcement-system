<template>
    <section class="create">
        <div v-if="delay" class="m-auto text-center mt-8 py-7">
            <!-- <RiseLoader :color="'#BA1E23'" /> -->
            <ScaleLoader :color="'#BA1E23'" />
        </div>
        <div v-else class="container-lg">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <h1 class="fs-4 fw-bold text-center mt-4">Create a new activity</h1>
                    <form @submit.prevent="createActivity" novalidate>
                        <div class="row mt-4">
                            <div class="col-md-7">
                                <!-- Title -->
                                <div class="mb-3">
                                    <div class="form-label">Title <span class="text-danger">*</span></div>
                                    <input @keydown.enter.prevent v-model="title" type="text"
                                        placeholder="Activity Title" :class="{ 'is-invalid': showError('title') }"
                                        class="form-control bg-light border-1" required>
                                    <div class="invalid-feedback">
                                        Please provide a title.
                                    </div>
                                </div>
                                <!-- Description -->
                                <div class="mb-3">
                                    <div class="form-label">Description <span class="text-danger">*</span></div>
                                    <textarea v-model="description" style="resize: none;"
                                        :class="{ 'is-invalid': showError('description') }"
                                        class="form-control bg-light border-1" rows="4"
                                        placeholder="Activity Description" required></textarea>
                                    <div class="invalid-feedback">
                                        Please provide a description.
                                    </div>
                                </div>
                                <!-- Host & Category -->
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-label">Host <span class="text-danger">*</span></div>
                                            <select v-model="school" :class="{ 'is-invalid': showError('school') }"
                                                class="form-select border-1 bg-light" required>
                                                <option value="" selected disabled>Choose School</option>
                                                <option value="School of Agro Industry">School of Agro Industry</option>
                                                <option value="School of Applied Digital Technology">School of Applied
                                                    Digital
                                                    Technology
                                                </option>
                                                <option value="School of Cosmetic Science">School of Cosmetic Science
                                                </option>
                                                <option value="School of Dentistry">School of Dentistry</option>
                                                <option value="School of Health Science">School of Health Science
                                                </option>
                                                <option value="School of Laws">School of Laws</option>
                                                <option value="School of Liberal Arts">School of Liberal Arts</option>
                                                <option value="School of Management">School of Management</option>
                                                <option value="School of Medicine">School of Medicine</option>
                                                <option value="School of Nursing">School of Nursing</option>
                                                <option value="School of Science">School of Science</option>
                                                <option value="School of Sinology">School of Sinology</option>
                                                <option value="School of Public Health">School of Public Health</option>
                                                <option value="Mae-Fah-Luang University">Mae-Fah-Luang University
                                                </option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div class="invalid-feedback">
                                                Please select a school.
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-label">Category <span class="text-danger">*</span></div>
                                            <select v-model="category" :class="{ 'is-invalid': showError('category') }"
                                                class="form-select border-1 bg-light" required>
                                                <option value="" selected disabled>Choose Category</option>
                                                <option value="University">University</option>
                                                <option value="Major">Major</option>
                                                <option value="School">School</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div class="invalid-feedback">
                                                Please select a category.
                                            </div>
                                        </div>
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
                                    <input @keydown.enter.prevent v-model="location" type="text"
                                        placeholder="Indoor Stadium" :class="{ 'is-invalid': showError('location') }"
                                        class="form-control bg-light border-1" required>
                                    <div class="invalid-feedback">
                                        Please provide a location.
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <!-- Start Date -->
                                <div class="mb-3">
                                    <div class="form-label">Date <span class="text-danger">*</span></div>
                                    <v-date-picker v-model="date" style="padding-bottom: 13.5px;"
                                        :class="{ 'is-invalid': showError('date') }" color="primary"
                                        elevation="1"></v-date-picker>
                                    <div class="invalid-feedback">
                                        Please select a date.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Buttons -->
                        <div class="btns d-flex hstack gap-4 justify-content-center align-items-center mt-2">
                            <button class="cancel btn btn-light px-5 text-white fw-bold"
                                @click="router.push({ name: 'dashboard' })">Cancel</button>
                            <button type="submit" class="btn btn-success px-5 text-white fw-bold">
                                <span v-if="isLoading" class="spinner-border text-white spinner-border-sm me-3"
                                    role="status" aria-hidden="true"></span>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import RiseLoader from 'vue-spinner/src/RiseLoader.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { isSameDay, isBefore, isAfter, parse } from 'date-fns';

const toast = useToast();
const router = useRouter();
let title = ref(null);
let description = ref(null);
let school = ref(null);
let location = ref(null);
let date = ref(null);
let start_time = ref(null);
let end_time = ref(null);
let category = ref(null)

let delay = ref(true)
const isLoading = ref(false)

onMounted(() => setTimeout(() => delay.value = false, 800))

/**
 * ? To track which form fields have been touched by user
 * ? When user touched a field, it will be marked as true which means we will start checking for errors on it
 */
let touchedFields = ref({});

/**
 * ? If 2 coniditons are met, showError functin will be activated
 * ? Condi -> touchedFields.value[field] which means check the field whether it is touched by user or not
 * ? In our case, we set default as true so the form fields are marked as alwasy touched by default and the condi 1 is always true
 * ? Condi 2 -> to check form fields are empty or not. eval() return the actual value of its para
 * ? In our case, if title input is empty string and it value is fasle but we chec wit ! so it will return true
 * ? After 2 condi are met it will invoke showError() function to respective input
 * 
 */
const showError = (field) => {
    return touchedFields.value[field] && !eval(field).value;
};

// To ensure end time is later than start time
const isEndTimeValid = computed(() => {
    // Check both fields are filled or not
    if (!start_time.value || !end_time.value) return true;
    return end_time.value > start_time.value;
});

let createActivity = async () => {

    /**
     * ? Marked all the fields are touched by default which means it will be known as touched fields 
     * ? and erors checking process is always set
     */
    touchedFields.value = {
        title: true,
        description: true,
        school: true,
        location: true,
        date: true,
        start_time: true,
        end_time: true,
        category : true
    };

    // Check if all fields are filled and end time is valid
    if (title.value && description.value && school.value && start_time.value && end_time.value && location.value && date.value && isEndTimeValid.value) {
        try {
            isLoading.value = true
            // Format the date and times to ISO format
            const formattedDate = new Date(date.value).toLocaleDateString('en-CA');
            // Append seconds to the time
            const formattedStartTime = `${start_time.value}:00.000`;
            // Append seconds to the time
            const formattedEndTime = `${end_time.value}:00.000`;

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

            const newActivity = {
                title: title.value,
                description: description.value,
                location: location.value,
                type: calculateType.value,
                date: formattedDate, // formatted date (YYYY-MM-DD)
                start_time: formattedStartTime, // formatted start time (HH:mm:ss)
                end_time: formattedEndTime, // formatted end time (HH:mm:ss)
                school: school.value,
                category: category.value
            }

            await axios.post('http://localhost:1337/api/activities', {
                data: newActivity
            })

            console.log(startTime, endTime, calculateType.value)
            toast.success('Activity Created Successfully!');
            router.push({ name: 'dashboard' });
            isLoading.value = false
        }
        catch (err) {
            console.error('Error Creating Activity: ', err)
            toast.error('Error Creating Activity');
            isLoading.value = false
        }
    }
};
</script>

<style></style>