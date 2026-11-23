<style scoped lang="scss" src="./sign-up-account.component.scss"></style>
<script lang="ts" src="./sign-up-account.component.ts"></script>

<template>
    <main sign-up-account-component>
        <h1>Account Setup</h1>

        <signUpAccountProfilePicComponent @profile_image_ref="OnProfileImageSet($event)"/>

        <formComponent v-slot="{ formKey, valid }" @submit="Submit()">
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
                
                <formErrMessageComponent v-if="PasswordWodel?.Model.dirty && PasswordWodel?.Model.errors?.['required']">
                   This field cannot be empty.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="PasswordWodel?.Model.errors?.['MUST_HAVE_CAPITAL_LETTER']">
                   Password must contain a capital letter.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="PasswordWodel?.Model.errors?.['MUST_HAVE_A_NUMBER']">
                   Password must contain a number.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="PasswordWodel?.Model.errors?.['MUST_HAVE_A_SYMBOL']">
                   Password must contain a symbol.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="PasswordWodel?.Model.errors?.['TOO_SHORT']">
                   Password must be at least 6 characters long.
                </formErrMessageComponent>
            </label>

            <label>
                <inputComponent ref="ComfirmPasswordModel" :formContextKey="formKey">
                    <input 
                        type="password"
                        name="password"
                        v-model="ConfirmPasswordValue"
                        placeholder="Confirm password"
                        required>
                </inputComponent>

                <formErrMessageComponent v-if="ComfirmPasswordModel?.Model.dirty && ComfirmPasswordModel?.Model.errors?.['required']">
                   This field cannot be empty.
                </formErrMessageComponent>

                <formErrMessageComponent v-if="ComfirmPasswordModel?.Model.dirty && !PasswordIsConfirmed">
                   Values does not match password.
                </formErrMessageComponent>
            </label>

            <div class="btn-wrap">
                <button type="button" @click="Back"><b>Back</b></button>

                <button :disabled="!valid || !PasswordIsConfirmed" :class="{disabled: !valid || !PasswordIsConfirmed}" type="submit"><b>Create Account</b></button>
            </div>
        </formComponent>
    </main>
</template>