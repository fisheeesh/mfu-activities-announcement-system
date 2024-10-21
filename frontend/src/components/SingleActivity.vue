<template>
    <div class="card mt-2 mb-3 ps-2 border-start border-5 border-warning shadow-sm border-0 rounded-3">
        <div class="card-body d-flex flex-column justify-content-center align-items-start">
            <h4 class="fw-bold">{{ activity.title }}</h4>
            <div class="d-flex gap-2 mt-2 flex-wrap">
                <div class="px-4 py-2 bg-secondary rounded-5">
                    {{ activity.date }} | {{ activity.duration }}
                </div>
                <div class="px-4 py-2 bg-white rounded-5 border border-1">
                    {{ activity.location }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'activity'
    ]
}
</script>

<style></style>