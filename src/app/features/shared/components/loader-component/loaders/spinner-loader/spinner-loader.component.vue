<style scoped lang="scss" src="./spinner-loader.component.scss"></style>
<script lang="ts" src="./spinner-loader.component.ts"></script>

<template>
    <main spinner-loader-component :class="Style">
        <div class="spinner" :style="{width: Size, height: Size}"></div>
    </main>
</template>