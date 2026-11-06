<style lang="sass" src="./nav.component.scss" scoped></style>
<script src="./nav.component.ts" lang="ts"></script>

<template>
    <main nav-component :class="navState">
        <section>
            <logo-component/>
        </section>
    </main>
</template>