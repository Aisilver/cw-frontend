<style scoped lang="scss" src="./sign-up-bio.component.scss"></style>
<script lang="ts" src="./sign-up-bio.component.ts"></script>

<template>
    <main sign-up-bio-component>

        <h1>SIGN UP</h1>

        <section class="role-img-wrapper">

            <div class="img-wrap" :class="Role == 'parent' ? 'active' : ''">
                <imageComponent :objectFit="'contain'" :src="imageSrc.parent"/>
            </div>
            
            <div class="img-wrap" :class="Role == 'student' ? 'active' : ''">
                <imageComponent :objectFit="'contain'" :src="imageSrc.student"/>
            </div>

            <div class="img-wrap" :class="Role == 'teacher' ? 'active' : ''">
                <imageComponent :objectFit="'contain'" :src="imageSrc.teacher"/>
            </div>
        </section>
        
        <signUpRoleSelectComponent/>
    </main>
</template>