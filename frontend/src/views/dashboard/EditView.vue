<template>
    <div v-if="delay" class="m-auto text-center mt-8 py-7">
        <ScaleLoader :color="'#BA1E23'" />
    </div>
    <section v-else class="create">
        <div class="container-lg">
            <h1 class="fs-4 fw-bold text-center mt-5">Edit activity</h1>
            <form @submit.prevent="editActivity" novalidate>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <!-- Title -->
                        <div class="mb-3">
                            <div class="form-label">Title <span class="text-danger">*</span></div>
                            <input @keydown.enter.prevent required v-model="title"
                                :class="{ 'is-invalid': showError('title') }" type="text" placeholder="Activity Title"
                                class="form-control bg-light border-1">
                            <div class="invalid-feedback">
                                Please provide a title.
                            </div>
                        </div>
                        <!-- Description -->
                        <div class="mb-3">
                            <div class="form-label">Description <span class="text-danger">*</span></div>
                            <textarea required v-model="description" :class="{ 'is-invalid': showError('description') }"
                                style="resize: none;" name="" id="" class="form-control bg-light border-1" rows="4"
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
                                <option value="School of Information Technology">School of Information Technology
                                </option>
                                <option value="School of Management">School of Management</option>
                                <option value="School of Cosemtice Science">School of Cosemtice Science</option>
                                <option value="School of Laws">School of Laws</option>
                                <option value="School of Sinology">School of Sinology</option>
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
                                    <label for="start_time">Start Time <span class="text-danger">*</span></label>
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
                            <v-date-picker v-model="date" :class="{ 'is-invalid': showError('date') }" color="primary"
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
                        <span v-if="isLoading" class="spinner-border text-white spinner-border-sm me-3" role="status"
                            aria-hidden="true"></span>Edit</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import { useToast } from 'vue-toastification';

export default {
    components: {
        ScaleLoader
    },
    props: [
        'id'
    ],
    setup(props) {
        const toast = useToast();
        const router = useRouter();
        let title = ref(null)
        let description = ref(null)
        let school = ref(null)
        let start_time = ref(null)
        let end_time = ref(null)
        let location = ref(null)
        let date = ref(null)

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
                /**
                 * ! @todo - change databae with firebase firestore
                 */
                await new Promise((resolve, _) => setTimeout(() => resolve(), 1000))
                let res = await fetch(`http://localhost:3000/activities/${props.id}`)
                let data = await res.json()
                title.value = data.title
                description.value = data.description
                school.value = data.school
                start_time.value = data.start_time
                end_time.value = data.end_time
                location.value = data.location
                date.value = new Date(data.date);
            }
            catch (err) {
                console.err('Error Fetcing Specific Activity', err)
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
                    isLoading.value = true
                    await fetch(`http://localhost:3000/activities/${props.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            title: title.value,
                            description: description.value,
                            start_time: start_time.value,
                            end_time: end_time.value,
                            date: date.value,
                            location: location.value,
                            school: school.value,
                        })
                    })
                    toast.success('Activity Edited Successfully')
                    router.push({ name: 'dashboard' });
                    isLoading.value = false
                }
                catch (err) {
                    console.error('Error Editing Activity', err)
                    toast.error('Error Editing Activity')
                    isLoading.value = false
                }
            }
        }

        return { router, editActivity, title, description, school, start_time, end_time, location, date, showError, isEndTimeValid, delay, isLoading }
    }
}
</script>

<style></style>