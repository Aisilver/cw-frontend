<style lang="scss" src="./input.component.scss"></style>
<script lang="ts" src="./input.component.ts"></script>

<template>
    
    <main input-component>
        <div class="wrapper" :class="{hasValue: HasValue && PlaceHolder}">
            
            <div 
                class="input-wrapper" 
                ref="LabelHolderElement" 
                :class="{
                    hasValue: HasValue && PlaceHolder, 
                    hasError: HasError, 
                    isValidating: IsvalidatingAsync
                }">

                <div v-if="PlaceHolder">{{ PlaceHolder }}</div>
                
                <slot />
        
            </div>

            <button type="button" class="password-toggle" v-if="TypeOfInputIsPassword" @click="TogglePasswordView">
                <iconComponent v-if="PasswordIsHidden" name="eye"/>

                <iconComponent  v-if="!PasswordIsHidden" name="eye-slash"/>
            </button>
        </div>

        <div class="min-loader" v-if="IsvalidatingAsync">
            <div class="line"></div>
        </div>
    </main>

</template>