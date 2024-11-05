<template>
    <section class="form mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <!-- MFU Logo -->
                    <div class="image-container d-flex justify-content-center">
                        <img src="@/assets/images/logo_mfu.png" alt="logo.png" width="100">
                    </div>
                    <!-- Title -->
                    <h4 class="fst-italic fw-bolder mt-3 text-center">MFU Activities Annoucement System</h4>
                    <div class="text-muted d-flex justify-content-center gap-3 mb-4">
                        <span>Email - admin@mfu.ac.th | Password - password</span>
                    </div>
                    <!-- Login Form -->
                    <form @submit.prevent="signIn" novalidate>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                            <input id="email" :class="{ 'is-invalid': showError('email') }" autocomplete="off"
                                type="email" v-model="email" placeholder="name@mfu.ac.th" class="form-control">
                            <div class="invalid-feedback">Email is required</div>
                        </div>
                        <div class="password mb-3">
                            <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                            <input :class="{ 'is-invalid': showError('password') }" id="password" v-model="password"
                                :type="isVisible ? 'text' : 'password'" placeholder="password" class="form-control">
                            <span :class="{ 'move': showError('password') }" @click="isVisible = !isVisible"
                                class="material-symbols-outlined eye">
                                {{ isVisible ? 'visibility' : 'visibility_off' }}
                            </span>
                            <div class="invalid-feedback">Password is required</div>
                        </div>
                        <div class="d-grid mt-4">
                            <button type="submit" class="btn text-white btn-primary w-100 py-2 fw-bold"
                                :disabled="loading || lockout">
                                <span v-if="loading" class="spinner-border text-white spinner-border-sm me-3"
                                    role="status" aria-hidden="true"></span>
                                Login
                            </button>
                        </div>
                        <p v-if="lockout" class="text-danger text-center fw-bold fs-6 mt-3">{{
                            lockoutMessage }}</p>
                        <p v-if="isError && !lockout" class="text-danger text-center fw-bold fs-6 mt-3">
                            {{ errorMessage }}</p>
                    </form>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
import useSignIn from '@/composables/auth/useSignIn';
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const email = ref("");
        const password = ref("");
        const isVisible = ref(false);
        const isError = ref(false);
        const loading = ref(false);
        const touchedFields = ref({});
        const attemptCount = ref(0);
        const lockout = ref(false);
        const lockoutTime = ref(0);
        const lockoutLevel = ref(0); // Tracks the lockout stage (1 = 1 min, 2 = 3 min, 3 = 15 min)
        const lockoutTimer = ref(null);
        const errorMessage = ref("");
        const { error, logIn } = useSignIn();

        const showError = (field) => touchedFields.value[field] && !eval(field).value;

        const lockoutDurations = [0, 60, 180, 900]; // Lockout times for levels (in seconds)

        // Lockout message based on time
        const lockoutMessage = computed(() => {
            return lockoutTime.value > 60
                ? `Too many requests. Please wait ${Math.ceil(lockoutTime.value / 60)} minutes before trying again.`
                : `Too many requests. Please wait ${lockoutTime.value} seconds before trying again.`;
        });

        const startLockout = () => {
            lockoutLevel.value = Math.min(lockoutLevel.value + 1, 3); // Max level is 3 (15 minutes)
            lockoutTime.value = lockoutDurations[lockoutLevel.value];
            lockout.value = true;

            lockoutTimer.value = setInterval(() => {
                lockoutTime.value--;
                if (lockoutTime.value <= 0) {
                    clearInterval(lockoutTimer.value);
                    lockout.value = false;
                    saveLockoutData(); // Update storage to mark end of lockout
                } else {
                    saveLockoutData(); // Save updated lockout data to localStorage
                }
            }, 1000);
        };

        const saveLockoutData = () => {
            localStorage.setItem("lockoutData", JSON.stringify({
                attemptCount: attemptCount.value,
                lockoutLevel: lockoutLevel.value,
                lockoutTime: lockoutTime.value,
                lockoutStartTime: Date.now()
            }));
        };

        const loadLockoutData = () => {
            const lockoutData = JSON.parse(localStorage.getItem("lockoutData"));
            if (lockoutData) {
                const elapsed = Math.floor((Date.now() - lockoutData.lockoutStartTime) / 1000);
                const remainingLockoutTime = lockoutData.lockoutTime - elapsed;

                attemptCount.value = lockoutData.attemptCount;
                lockoutLevel.value = lockoutData.lockoutLevel;

                if (remainingLockoutTime > 0) {
                    lockoutTime.value = remainingLockoutTime;
                    lockout.value = true;
                    lockoutTimer.value = setInterval(() => {
                        lockoutTime.value--;
                        if (lockoutTime.value <= 0) {
                            clearInterval(lockoutTimer.value);
                            lockout.value = false;
                            saveLockoutData(); // Clear lockout data when timer ends
                        }
                    }, 1000);
                }
            }
        };


        const signIn = async () => {
            touchedFields.value = { email: true, password: true };
            isError.value = false;
            error.value = null;

            if (email.value && password.value) {
                loading.value = true;

                if (lockout.value) return;

                const res = await logIn(email.value.trim(), password.value.trim());

                if (res) {
                    router.push("/admin");
                    isError.value = false;
                    attemptCount.value = 0;
                    lockoutLevel.value = 0;
                    localStorage.removeItem("lockoutData");
                } else {
                    isError.value = true;
                    attemptCount.value++;

                    if ((lockoutLevel.value === 0 && attemptCount.value >= 3) ||
                        (lockoutLevel.value === 1 && attemptCount.value >= 5) ||
                        (lockoutLevel.value >= 2)) {
                        errorMessage.value = "Too many requests. Please try again later.";
                        startLockout();
                    } else {
                        errorMessage.value = error.value;
                    }
                }
                loading.value = false;
            }
        };

        onMounted(loadLockoutData);

        return { signIn, isVisible, email, password, errorMessage, lockoutMessage, lockout, showError, isError, loading, error };
    }
}
</script>

<style></style>