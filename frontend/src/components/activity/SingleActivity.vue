<template>
    <div :class="['card mt-2 mb-3 ps-2 shadow-sm border-0 rounded-3', dynamicBorderClass]">
        <div class="card-body">
            <!-- Activity title -->
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h4 class="fw-bold">{{ activity.title }}</h4>
                </div>
                <!-- Delete and Edit icons -->
                <div v-if="isEditable">
                    <!-- Conditionally disable delete icon -->
                    <span
                        @click="!activity.isCompleted && deleteActivity"
                        :class="['material-symbols-outlined', 'me-2', 'delete', { 'disabled-icon': activity.isCompleted }]"
                    >
                        delete
                    </span>
                    <!-- Conditionally disable edit icon -->
                    <router-link v-if="!activity.isCompleted" :to="{ name: 'edit', params: { id: activity.id } }">
                        <span class="material-symbols-outlined edit text-black">edit</span>
                    </router-link>
                    <span v-else class="material-symbols-outlined edit text-muted disabled-icon">edit</span>
                </div>
            </div>

            <!-- Activity description -->
            <p @click="isShow = !isShow" class="text-muted description mt-3">{{ isShow ? activity.description : cutBodyDescription }}</p>

            <!-- Activity details -->
            <div class="d-flex gap-2 mt-3 flex-wrap">
                <div class="px-4 py-2 bg-secondary rounded-5">
                    <i class="fas fa-clock text-black me-1"></i> {{ activity.date }} | {{ formattedStartTime }} - {{ formattedEndTime }}
                </div>
                <div class="px-4 py-2 bg-white rounded-5 border border-1">
                    <i class="fas fa-map-marker-alt text-primary me-1"></i> {{ activity.location }}
                </div>
                <div class="px-4 py-2 bg-white rounded-5 border border-1">
                    <i class="fas fa-building-columns text-black me-1"></i> {{ activity.school }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { format, parse } from 'date-fns';

export default {
    props: {
        isEditable: {
            type: Boolean,
            default: false
        },
        activity: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {
        let isShow = ref(false)
        // Set border-color dynamically based on activity status
        let dynamicBorderClass = computed(() => {
            if (props.activity.status === 'ongoing') return 'border-start border-5 border-info';
            else if (props.activity.status === 'upcoming') return 'border-start border-5 border-warning';
            else return 'border-start border-5 border-success';
        })

        let cutBodyDescription = computed(() => {
            return props.activity.description.substring(0, 52) + '... See more'
        })

        const formatTime = (time) => {
            const date = parse(time, 'HH:mm', new Date()); // Parse the time
            return format(date, 'h:mm a'); // Format to 12-hour with AM/PM
        };

        // Computed properties for formatted times
        let formattedStartTime = computed(() => formatTime(props.activity.start_time));
        let formattedEndTime = computed(() => formatTime(props.activity.end_time));


        let deleteActivity = async () => {
            let res = await fetch(`http://localhost:3000/activities/${props.activity.id}`, {
                method: "DELETE"
            })
            console.log(res)
            /**
             * We have to emit a custom event to the parent component to ensure that activity is deleted from the UI
             */
            context.emit('deleteActivity', props.activity.id)
        }

        return { dynamicBorderClass, isShow, cutBodyDescription, deleteActivity, formattedStartTime, formattedEndTime }
    }
}
</script>

<style>

</style>