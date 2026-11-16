<style scoped lang="scss" src="./radio.component.scss"></style>
<script lang="ts" src="./radio.component.ts"></script>

<template>
    <main radio-component>
        <label :for="UniqueKey" ref="LabelDOMElement" :class="{selected: Selected}">
            <slot/>
        </label>
    </main>
</template>