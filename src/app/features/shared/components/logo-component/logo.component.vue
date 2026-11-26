<style lang="sass" src="./logo.component.scss" scoped></style>
<script src="./logo.component.ts" lang="ts"></script>

<template>
    <main logo-component>
        <imageComponent :src="logoUrl"/>

        <b>{{ title }}</b>
    </main>
</template>