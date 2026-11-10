<style scoped lang="scss" src="./sign-up.component.scss"></style>
<script lang="ts" src="./sign-up.component.ts"></script>

<template>
    <main sign-up-component>
        <signUpBioComponent v-if="Stage == 'bio'"/>
    </main>
</template>