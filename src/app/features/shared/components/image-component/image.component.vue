<style lang="sass" src="./image.component.scss" scoped></style>
<script src="./image.component.ts" lang="ts"></script>

<template>
    <main image-component>
        <loader-component ref="loader" type="fade-loader">
            <template #content>
                <img ref="ImgElement">
            </template>
        </loader-component>
    </main>
</template>