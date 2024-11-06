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
                    <!-- ? if activity is completed, we will disable delete and edit icon-buttons -->
                    <span @click="deleteActivity"
                        :class="['material-symbols-outlined', 'me-2', 'delete', { 'disabled-icon': activity.type === 'completed' }]">
                        delete
                    </span>
                    <!-- ? if activity is completed, we will disable delete and edit icon-buttons -->
                    <router-link v-if="activity.type !== 'completed'"
                        :to="{ name: 'edit', params: { id: activity.documentId } }">
                        <span class="material-symbols-outlined edit text-black">edit</span>
                    </router-link>
                    <span v-else class="material-symbols-outlined edit text-muted disabled-icon">edit</span>
                </div>
            </div>

            <!-- Activity description -->
            <div>
                <p v-if="activity.description.length > 52" @click="isShow = !isShow"
                    class="text-muted description mt-3">
                    {{ isShow ? activity.description : cutBodyDescription }}
                </p>
                <p v-else class="text-muted mt-3">{{ activity.description }}</p>
            </div>

            <!-- Activity details -->
            <div class="d-flex gap-2 mt-3 flex-wrap">
                <div class="px-4 py-2 bg-secondary rounded-5">
                    <i class="fas fa-clock text-black me-1"></i> {{ formatDate(activity.date) }} | {{
                        formatTime(activity.start_time) }} - {{ formatTime(activity.end_time) }}
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
import axios from 'axios';

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

        // Set dynamic border color class based on activity status
        const dynamicBorderClass = computed(() => {
            if (props.activity.type === 'ongoing') return 'border-start border-5 border-info';
            else if (props.activity.type === 'upcoming') return 'border-start border-5 border-warning';
            else return 'border-start border-5 border-success';
        });

        /**
         * ! @todo - Change Database with Firebase firestore
         */
        const updateActivityStatus = async (updatedStatus) => {
            await fetch(`http://localhost:1337/api/activities/${props.activity.documentId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: updatedStatus })
            });
            context.emit('updated', props.activity.id, updatedStatus);
        };

        /**
         * ? Check activity data and time and compare with current date and time
         * ? If activity date and time is before/after/same as current date and time, update activity status
         */
        const checkStatus = () => {
            const current = new Date();
            const activityDate = new Date(props.activity.date);
            const startTime = parse(props.activity.start_time, 'HH:mm', activityDate);
            const endTime = parse(props.activity.end_time, 'HH:mm', activityDate);

            if (isSameDay(current, activityDate)) {
                /**
                 * ? We dun want to have abuse api calls, we check with inner if to prevent server loads
                 * ? We only updated the status only when the activity current status is not the condition one
                 */
                if (isBefore(current, startTime)) {
                    if (props.activity.type !== 'upcoming') {
                        updateActivityStatus('upcoming');
                    }
                } else if (isAfter(current, startTime) && isBefore(current, endTime)) {
                    if (props.activity.type !== 'ongoing') {
                        updateActivityStatus('ongoing');
                    }
                } else if (isAfter(current, endTime)) {
                    if (props.activity.type !== 'completed') {
                        updateActivityStatus('completed');
                    }
                }
            }
            /**
             * ? If it is not on the same day, check if the current date is before the activity date, then update status to upcoming
             * ? It seems like it is not a big deal to check else if and else blocks
             * ? If we not check it, its's gonna be a problem in editing an acitivity whcih status is ongoing
             * ? Like changing from ongoing to upcoming or ongoing to completed
             */
            else if (isBefore(current, activityDate)) {
                if (props.activity.type !== 'upcoming') {
                    updateActivityStatus('upcoming');
                }
            }
            /**
             * * If all the above condition are not met, update status to completed
             */
            else {
                if (props.activity.type !== 'completed') {
                    updateActivityStatus('completed');
                }
            }
        };

        /**
         * ? Mounted hook works when the component is set/created.
         * ? As soon as our SingleActivity component is mounted, we check activity's date and time and then update its status
         * ? 
        */
        onMounted(() => {
            checkStatus();
            /**
             * ? To enhace real-time data, we made the check status process every 1 second
             * ? It will repeat until activity's status is changed
             */
            const interval = setInterval(() => {
                checkStatus();
            }, 500);

            /**
             * ? When the status is changed, the actitivity has to go to its respective page (depends on its status)
             * ? And it has to remove from current page. Before that remove time, beforeunmonted hook will work and stop the status checking process
             * ? Then the activity will be moved to its respective page and the status checking process will start again
             */
            onBeforeUnmount(() => {
                clearInterval(interval);
            });
        });

        // Cut description cuz it is too long to display
        const cutBodyDescription = computed(() => {
            return props.activity.description.substring(0, 52) + '... See more';
        });

        // format time in a format of AM/PM
        // const formatTime = (time) => {
        //     const date = parse(time, 'HH:mm', new Date());
        //     return format(date, 'h:mm a');
        // };

        /**
         * ! We use computed property cus we want a new data based on original data 
         * ! which is formatted time in a format of AM/PM
         */
        // const formattedStartTime = computed(() => formatTime(props.activity.start_time));
        // const formattedEndTime = computed(() => formatTime(props.activity.end_time));
        // const formattedDate = format(new Date(props.activity.date), 'MMM d, yyyy');


        // Helper function to format date
        const formatDate = (dateStr) => {
            return format(new Date(dateStr), 'MMM dd, yyyy');
        }

        // Helper function to format time
        const formatTime = (timeStr) => {
            const time = new Date(`1970-01-01T${timeStr}`); // Parse time as date object
            return format(time, 'h:mm a');
        }

        // Delete activity by id
        const deleteActivity = async () => {
            let res = await axios.delete(`http://localhost:1337/api/activities/${props.activity.documentId}`);
            console.log(res, "deleted");
            /**
             * ? We need to emit an event to delete activity from parent component
             * ? if not, it will not be deleted in UI and we have to refresh UI to delete
             * ? That's goona be a problem for our SPA application.
             */
            context.emit('deleteActivity', props.activity.documentId);
        };

        return { dynamicBorderClass, isShow, cutBodyDescription, deleteActivity, formatTime, formatDate };
    }
};
</script>

<style></style>