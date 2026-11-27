<style scoped lang="scss" src="./auth.component.scss"></style>
<script lang="ts" src="./auth.component.ts"></script>

<template>
  <main auth-component>
    <NavComponent navStyle="logo-only"/>

    <section class="wrapper">
        <section class="route-wrapper">
          <logoComponent/>
          <RouterView/>
        </section>

        <section class="image-wrapper">
          <imageComponent :src="BannerImgUrl"/>
        </section>
    </section>
  </main>
</template>