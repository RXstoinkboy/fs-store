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
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :append-icon="show1 ? mdiEye : mdiEyeOff"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                required
                :rules="[
                  () => Boolean(confirmPassword) || 'Confirm password is required',
                  () => confirmPassword === password || 'Passwords do not match'
                ]"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                :append-icon="show2 ? mdiEye : mdiEyeOff"
              ></v-text-field>
              <v-btn type="submit" color="primary" :loading="isPending">Register</v-btn>
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
import { useSignUpMutation } from '@/mutations/signUpMutation'

const form = ref()
const email = ref('test@test.com')
const password = ref('12345678')
const confirmPassword = ref('1234567')
const show1 = ref(false)
const show2 = ref(false)

const { mutate, isPending } = useSignUpMutation()

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
