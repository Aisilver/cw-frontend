<style scoped lang="scss" src="./sign-up-role-image-carousel.component.scss"></style>
<script lang="ts" src="./sign-up-role-image-carousel.component.ts"></script>

<template>
    <main role-select-carousel>
        <div class="img-wrap" :class="Role == 'parent' ? 'active' : ''">
            <imageComponent :objectFit="'contain'" :src="ParentImgSrc"/>
        </div>
        
        <div class="img-wrap" :class="Role == 'student' ? 'active' : ''">
            <imageComponent :objectFit="'contain'" :src="StudentImgSrc"/>
        </div>

        <div class="img-wrap" :class="Role == 'teacher' ? 'active' : ''">
            <imageComponent :objectFit="'contain'" :src="TeacherImgSrc"/>
        </div>
    </main>
</template>