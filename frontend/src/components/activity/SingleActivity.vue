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
                    <span @click="deleteActivity"
                        :class="['material-symbols-outlined', 'me-2', 'delete', { 'disabled-icon': activity.status === 'completed' }]">
                        delete
                    </span>
                    <!-- Conditionally disable edit icon -->
                    <router-link v-if="activity.status !== 'completed'"
                        :to="{ name: 'edit', params: { id: activity.id } }">
                        <span class="material-symbols-outlined edit text-black">edit</span>
                    </router-link>
                    <span v-else class="material-symbols-outlined edit text-muted disabled-icon">edit</span>
                </div>
            </div>

            <!-- Activity description -->
            <p @click="isShow = !isShow" class="text-muted description mt-3">{{ isShow ? activity.description :
                cutBodyDescription }}</p>

            <!-- Activity details -->
            <div class="d-flex gap-2 mt-3 flex-wrap">
                <div class="px-4 py-2 bg-secondary rounded-5">
                    <i class="fas fa-clock text-black me-1"></i> {{ formattedDate }} | {{ formattedStartTime }} - {{
                        formattedEndTime }}
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
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { format, isSameDay, isBefore, isAfter, parse } from 'date-fns';

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
        let isShow = ref(false);
        const now = ref(new Date());

        // Set dynamic border color class based on activity status
        let dynamicBorderClass = computed(() => {
            if (props.activity.status === 'ongoing') return 'border-start border-5 border-info';
            else if (props.activity.status === 'upcoming') return 'border-start border-5 border-warning';
            else return 'border-start border-5 border-success';
        });

        // Utility function to update activity status
        const updateActivityStatus = async (updatedStatus) => {
            await fetch(`http://localhost:3000/activities/${props.activity.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: updatedStatus })
            });
            context.emit('updated', props.activity.id, updatedStatus);
        };

        // Function to check and update the status based on time
        const checkStatus = () => {
            const current = new Date();
            const activityDate = new Date(props.activity.date);
            const startTime = parse(props.activity.start_time, 'HH:mm', activityDate);
            const endTime = parse(props.activity.end_time, 'HH:mm', activityDate);

            if (isSameDay(current, activityDate)) {
                if (isBefore(current, startTime)) {
                    if (props.activity.status !== 'upcoming') {
                        updateActivityStatus('upcoming');
                    }
                } else if (isAfter(current, startTime) && isBefore(current, endTime)) {
                    if (props.activity.status !== 'ongoing') {
                        updateActivityStatus('ongoing');
                    }
                } else if (isAfter(current, endTime)) {
                    if (props.activity.status !== 'completed') {
                        updateActivityStatus('completed');
                    }
                }
            }
        };

        // Check status on mounted
        onMounted(() => {
            checkStatus();
            // Set interval to check status periodically (e.g., every 10 seconds)
            const interval = setInterval(() => {
                checkStatus();
            }, 1000); // 10 seconds

            // Clear interval when component is unmounted
            onBeforeUnmount(() => {
                clearInterval(interval);
            });
        });

        // Computed for shortened description
        let cutBodyDescription = computed(() => {
            return props.activity.description.substring(0, 52) + '... See more';
        });

        // Format times
        const formatTime = (time) => {
            const date = parse(time, 'HH:mm', new Date());
            return format(date, 'h:mm a');
        };

        // Computed properties for formatted start and end times
        let formattedStartTime = computed(() => formatTime(props.activity.start_time));
        let formattedEndTime = computed(() => formatTime(props.activity.end_time));
        const formattedDate = format(new Date(props.activity.date), 'MMM d, yyyy');

        // Delete activity function
        let deleteActivity = async () => {
            let res = await fetch(`http://localhost:3000/activities/${props.activity.id}`, {
                method: "DELETE"
            });
            console.log(res);
            // Emit delete event to parent component
            context.emit('deleteActivity', props.activity.id);
        };

        return { dynamicBorderClass, isShow, cutBodyDescription, deleteActivity, formattedStartTime, formattedEndTime, formattedDate };
    }
};
</script>

<style></style>