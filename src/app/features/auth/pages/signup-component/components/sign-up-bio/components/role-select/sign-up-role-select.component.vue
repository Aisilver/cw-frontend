<style scoped lang="scss" src="./sign-up-role-select.component.scss"></style>
<script lang="ts" src="./sign-up-role-select.component.ts"></script>

<template>
    <main sign-up-role-select-component>
        <span 
            :class="role == Role ? 'active' : ''" 
            v-for="role in RoleValues"
            @click="SelectRole(role)">
            {{ role }}
        </span>
    </main>
</template>