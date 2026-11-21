<style scoped lang="scss" src="./sign-up-account-profile-pic.component.scss"></style>
<script lang="ts" src="./sign-up-account-profile-pic.component.ts"></script>

<template>
    <main sign-up-account-profile-pic-component>
        <loader-component>
            <template #content>
                <imageComponent :src="ProfileImgUrl" :defaultImage="'no-user'"/>
            </template>
        </loader-component>

        <loaderComponent ref="FileUploadLoader">
            <template #content>
                <label for="file-input">
                    <input type="file" id="file-input" ref="FileInputElement" hidden @change="OnFileInput($event)">
                    <iconComponent name="pen"/>
                </label>
            </template>
        </loaderComponent>
    </main>
</template>