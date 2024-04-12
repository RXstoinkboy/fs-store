<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp" v-model="form">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :rules="[
                  () => () => Boolean(email) || 'Email is required',
                  () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || 'Invalid email format'
                ]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                :rules="[
                  () => Boolean(password) || 'Password is required',
                  () => password.length >= 8 || 'Password must be at least 8 characters long'
                ]"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? mdiEye : mdiEyeOff"
              ></v-text-field>
              <v-btn type="submit" color="primary" :loading="isPending">Sign in</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { useSignInMutation } from '@/mutations/signInMutation'

const form = ref()
const email = ref()
const password = ref()
const showPassword = ref(false)

const { mutate, isPending } = useSignInMutation()

const signUp = async () => {
  if (!form.value) {
    return
  }
  mutate({
    email: email.value,
    password: password.value
  })
}
</script>
