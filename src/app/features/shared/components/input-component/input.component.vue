<style lang="scss" src="./input.component.scss"></style>
<script lang="ts" src="./input.component.ts"></script>

<template>
    
    <main input-component>
        <label ref="LabelHolderElement" :class="{hasValue: HasValue && PlaceHolder, hasError: HasError}">

            <div v-if="PlaceHolder">{{ PlaceHolder }}</div>
         
            <slot />
        
        </label>
    </main>

</template>