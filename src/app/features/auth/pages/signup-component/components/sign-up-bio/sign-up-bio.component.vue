<style scoped lang="scss" src="./sign-up-bio.component.scss"></style>
<script lang="ts" src="./sign-up-bio.component.ts"></script>

<template>
    <main sign-up-bio-component>

        <h1>SIGN UP</h1>
        
        <signUpRoleImageCarouselComponent :Role="Role"/>

        <signUpRoleSelectComponent @onRoleChange="onRoleChange($event)"/>

        <formComponent v-slot="{ formKey, valid }" @submit="Next()">

            <inputComponent :formContextKey="formKey">
                <input type="text" placeholder="First name" v-model="NewUser.firstName" required name="firstName"/>
            </inputComponent>
        
            <inputComponent :formContextKey="formKey" >
                <input type="text" placeholder="Last name" v-model="NewUser.lastName" name="lastName"/>
            </inputComponent>
        
            <button v-if="valid">Hello</button>

        </formComponent>
    </main>
</template>