<style scoped lang="scss" src="./sign-up-create-account.component.scss"></style>
<script lang="ts" src="./sign-up-create-account.component.ts"></script>

<template>
    <main sign-up-create-account-component>

        <loader-component :hideContent="true" ref="loader">

            <template #content>
                <section>
                    <h1 :class="{failed: !AccountCreated}">{{ HeaderText }}</h1>

                    <image-component :src="ImageUrl"/>

                    <button v-if="AccountCreated">To Login</button>

                    <button @click="CreateAccount()" class="retry" v-if="!AccountCreated">Retry</button>
                </section>
            </template>

        </loader-component>

    </main>
</template>