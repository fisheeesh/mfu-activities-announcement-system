<template>
    <div>
        <div class="container py-5">
            <div class="row">
                <div class="col-5 offset-4">
                    <!-- MFU Logo -->
                    <div class="image-container d-flex justify-content-center">
                        <img src="@/assets/images/logo_mfu.png" alt="logo.png" width="100">
                    </div>
                    <!-- Title -->
                    <h4 class="fst-italic fw-bolder mt-3 text-center">MFU Activities Annoucement System</h4>
                    <div class="text-muted d-flex justify-content-center gap-3 mb-4">
                        <span>Email - admin@mfu.ac.th</span>
                        <span>Password - password</span>
                    </div>
                    <!-- Login Form -->
                    <form @submit.prevent="signIn">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" v-model="email" placeholder="name@mfu.ac.th"
                                class="form-control form-control-lg">
                        </div>
                        <div class="password mb-3">
                            <label class="form-label">Password</label>
                            <input v-model="password" :type="isVisible ? 'text' : 'password'" placeholder="password"
                                class="form-control form-control-lg">
                            <span @click="isVisible = !isVisible" class="material-symbols-outlined eye">
                                {{ isVisible ? 'visibility' : 'visibility_off' }}
                            </span>
                        </div>
                        <div class="d-grid mt-4">
                            <button class="btn btn-primary text-white btn-lg">Log In</button>
                        </div>
                        <p class="text-danger text-center fw-bold mt-3" v-if="error">{{ error }}</p>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useSignIn from '@/composables/auth/useSignIn';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter(); //this.$router

        let email = ref('');
        let password = ref('');
        let isVisible = ref(false)

        let { error, logIn } = useSignIn()

        let signIn = async () => {
            let res = await logIn(email.value, password.value)

            if (res) {
                console.log('Logged In Successfully!', res.user.displayName)
                router.push('/admin')
            }
        }

        return { signIn, isVisible, email, password, error }
    }
}
</script>

<style></style>