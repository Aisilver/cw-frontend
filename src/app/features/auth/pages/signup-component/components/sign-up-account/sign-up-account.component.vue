<style scoped lang="scss" src="./sign-up-account.component.scss"></style>
<script lang="ts" src="./sign-up-account.component.ts"></script>

<template>
    <main sign-up-account-component>
        <h1>Account Setup</h1>

        <signUpAccountProfilePicComponent @profile_image_ref="OnProfileImageSet($event)"/>

        <formComponent v-slot="{ formKey }" @submit="Submit($event)">
            <label>
                <inputComponent ref="UsernameModel" :formContextKey="formKey">
                    <input 
                        type="text"
                        name="username"
                        v-model="NewAccount.userName"
                        placeholder="@Username"
                        required>
                </inputComponent>

                <formErrMessageComponent v-if="UsernameModel?.Model.errors?.['required'] && UsernameModel.Model.dirty">
                    This Field cannot be emtpy.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="UsernameModel?.Model.errors?.['TOO_SHORT']">
                    Must be at least 6 charaters long.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="UsernameModel?.Model.errors?.['STARTS_WITH_A_SYMBOL_OR_NUMBER']">
                    Cannot start with a symbol or number.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="UsernameModel?.Model.errors?.['USERNAME_EXISTS']">
                    Oops seems "{{ NewAccount.userName }}" has already been used.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="UsernameModel?.Model.errors?.['VERIFICATION_FAILED']">
                    Oops seems we encountered an error while validating, please try again.
                </formErrMessageComponent>
            </label>

            <label>
                <inputComponent ref="PasswordWodel" :formContextKey="formKey">
                    <input 
                        type="password"
                        name="password"
                        v-model="NewAccount.password"
                        placeholder="Password"
                        required>
                </inputComponent>
            </label>
        </formComponent>
    </main>
</template>