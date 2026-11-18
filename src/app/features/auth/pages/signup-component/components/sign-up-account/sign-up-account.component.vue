<style scoped lang="scss" src="./sign-up-account.component.scss"></style>
<script lang="ts" src="./sign-up-account.component.ts"></script>

<template>
    <main sign-up-account-component>
        <h1>Account Setup</h1>

        <signUpAccountProfilePicComponent/>

        <formComponent v-slot="{ formKey }" @submit="Submit($event)">
            <label>
                <label>
                    <inputComponent ref="UsernameModel" :formContextKey="formKey" :validateOnBlur="true">
                        <input 
                            type="text"
                            name="username"
                            placeholder="@Username"
                            required>
                    </inputComponent>

                    <formErrMessageComponent v-if="UsernameModel?.Model.errors?.['required'] && UsernameModel.Model.dirty">
                        This Field cannot be emtpy.
                    </formErrMessageComponent>
                </label>
            </label>
        </formComponent>

    </main>
</template>