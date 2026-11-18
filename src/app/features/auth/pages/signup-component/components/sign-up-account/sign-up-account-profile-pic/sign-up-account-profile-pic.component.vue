<style scoped lang="scss" src="./sign-up-account-profile-pic.component.scss"></style>
<script lang="ts" src="./sign-up-account-profile-pic.component.ts"></script>

<template>
    <main sign-up-account-profile-pic-component>
        <loader-component>
            <template #content>
                <imageComponent :src="ProfileImgUrl" :defaultImage="'no-user'"/>
            </template>
        </loader-component>

        <button>
            <iconComponent name="pen"/>
        </button>
    </main>
</template>