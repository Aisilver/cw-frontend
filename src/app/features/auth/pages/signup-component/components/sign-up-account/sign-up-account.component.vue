<style scoped lang="scss" src="./sign-up-account.component.scss"></style>
<script lang="ts" src="./sign-up-account.component.ts"></script>

<template>
    <main sign-up-account-component>
        <h1>Account Setup</h1>

        <imageComponent :src="ImageSrc" :objectFit="'contain'"/>

        <formComponent>
            <label>
                <inputComponent v-slot="{}">
                    <input 
                        type="text">
                </inputComponent>
            </label>
        </formComponent>

    </main>
</template>