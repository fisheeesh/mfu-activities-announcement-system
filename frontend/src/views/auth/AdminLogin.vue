<template>
    <div>
        <div class="container py-6 text-center">
            <div class="row">
                <div class="col-6 offset-3">
                    <!-- MFU Logo -->
                    <div class="image-container d-flex justify-content-center">
                        <img src="@/assets/logo.png" alt="logo.png" width="100">
                    </div>
                    <!-- Title -->
                    <h3 class="fst-italic fw-bolder mt-3 mb-4">MFU Activities Annoucement System</h3>
                    <!-- Login Form -->
                    <form @submit.prevent="signIn">
                        <div class="mb-3">
                            <input type="email" placeholder="name@mfu.ac.th" class="form-control form-control-lg">
                        </div>
                        <div class="password mb-3">
                            <input :type="isVisible ? 'text' : 'password'" placeholder="password"
                                class="form-control form-control-lg">
                            <span @click="isVisible = !isVisible" class="material-symbols-outlined eye">
                                {{ isVisible ? 'visibility' : 'visibility_off' }}
                            </span>
                        </div>
                        <div class="d-grid mt-4">
                            <button class="btn btn-primary text-white btn-lg">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter(); //this.$router
        let isVisible = ref(false)
        let signIn = () => {
            router.push({ name: 'dashboard' });
        }

        return { signIn, isVisible }
    }
}
</script>

<style>

</style>