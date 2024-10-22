<template>
    <div :class="['card mt-2 mb-3 ps-2 shadow-sm border-0 rounded-3', dynamicBorderClass]">
        <div class="card-body d-flex flex-column justify-content-center align-items-start">
            <!-- Activity title -->
            <h4 class="fw-bold">{{ activity.title }}</h4>
            <!-- Activity description -->
            <p @click="isShow = !isShow" class="text-muted description">{{ isShow ? activity.description :
                cutBodyDescription }}</p>
            <!-- Activity details -->
            <div class="d-flex gap-2 mt-2 flex-wrap">
                <div class="px-4 py-2 bg-secondary rounded-5">
                    {{ activity.start_date }} | {{ activity.duration }}
                </div>
                <div class="px-4 py-2 bg-white rounded-5 border border-1">
                    {{ activity.location }}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props: {
        activity: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        let isShow = ref(false)
        // Set border-color dynamically based on activity status
        let dynamicBorderClass = computed(() => {
            if (props.activity.status === 'ongoing') return 'border-start border-5 border-info';
            else if (props.activity.status === 'upcoming') return 'border-start border-5 border-warning';
            else return 'border-start border-5 border-success';
        })

        let cutBodyDescription = computed(() => {
            return props.activity.description.substring(0, 30) + '... See more'
        })

        return { dynamicBorderClass, isShow, cutBodyDescription }
    }
}
</script>

<style>
</style>