<template>
    <div>
        <div class="container py-6 text-center">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="image-container d-flex justify-content-center">
                        <img src="@/assets/logo.png" alt="logo.png" width="100">
                    </div>
                    <h3 class="fst-italic fw-bolder mt-3 mb-4">MFU Activities Annoucement System</h3>
                    <form @submit.prevent="signIn">
                        <div class="mb-3">
                            <input type="email" placeholder="name@mfu.ac.th" class="form-control form-control-lg">
                        </div>
                        <div class="mb-3">
                            <input type="password" placeholder="password" class="form-control form-control-lg">
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
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter(); //this.$router
        let signIn = () => {
            router.push({ name: 'dashboard' });
        }

        return { signIn }
    }
}
</script>

<style>
.form-control:focus {
    outline: none;
    box-shadow: none
}
</style>