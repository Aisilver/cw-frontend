<style lang="sass" src="./loader.component.scss" scoped></style>
<script src="./loader.component.ts" lang="ts"></script>

<template>
    <main loader-component ref="LoaderContainer">
        <ui_float ref="FloatDOMElement"></ui_float>

        <slot name="content"/>
    </main>
</template>