<style lang="sass" src="./logo.component.scss" scoped></style>
<script src="./logo.component.ts" lang="ts"></script>

<template>
    <main logo-component>
        <imageComponent :src="logoUrl"/>

        <h3>{{ title }}</h3>
    </main>
</template>