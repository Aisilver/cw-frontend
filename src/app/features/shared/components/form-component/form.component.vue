<style scoped lang="scss" src="./form.component.scss"></style>
<script lang="ts" src="./form.component.ts"></script>


<template>
    <main form-component>
        <form @submit.prevent="$emit('submit')" ref="FormElement">
            <slot :formKey="formKey" :valid="valid" />
        </form>
    </main>
</template>