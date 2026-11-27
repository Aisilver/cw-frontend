<style scoped lang="scss" src="./login.component.scss"></style>
<script lang="ts" src="./login.component.ts"></script>

<template>
    <main login-component>
        <h1>Login</h1>

        <image-component :src="LoginImageUrl" objectFit="contain"/>

        <b v-if="ErrorMessage">{{ ErrorMessage }}</b>

        <form-component v-slot="{ formKey, valid }" :submit="Login()">

            <label>
                <input-component ref="UsernameModel" :formContextKey="formKey">
                    <input  
                        type="text" 
                        name="username"
                        required
                        placeholder="Username">
                </input-component>

                <form-err-message-component v-if="UsernameModel?.Model.dirty && UsernameModel?.Model.errors?.['required']">
                    This field cannot be empty.
                </form-err-message-component>
            </label>

            <label>
                <input-component ref="PasswordModel" :formContextKey="formKey">
                    <input 
                        type="password" 
                        name="password"
                        required
                        placeholder="Password">
                </input-component>

                <form-err-message-component v-if="PasswordModel?.Model.dirty && PasswordModel?.Model.errors?.['required']">
                    This field cannot be empty.
                </form-err-message-component>
            </label>

            <loader-component ref="Loader">
                <template #content>
                    <input type="submit" value="Submit" :disabled="!valid" :class="{disabled: !valid}">
                </template>
            </loader-component>
        </form-component>

        <p>Don't have an account? <span @click="toSignup">Sign up</span>.</p>
    </main>
</template>