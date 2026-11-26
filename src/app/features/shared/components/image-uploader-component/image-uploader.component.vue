<script lang="ts" src="./image-uploader.component.ts"></script>

<style scoped>

</style>

<template>
    <input type="file" id="file-input" ref="FileInputElement" hidden @change="OnFileInput($event)">
</template>