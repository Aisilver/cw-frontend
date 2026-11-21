<style scoped lang="scss" src="./sign-up-bio.component.scss"></style>
<script lang="ts" src="./sign-up-bio.component.ts"></script>

<template>
    <main sign-up-bio-component>

        <h1>SIGN UP</h1>
        
        <signUpRoleImageCarouselComponent :Role="Role"/>

        <signUpRoleSelectComponent @onRoleChange="onRoleChange()"/>

        <formComponent v-slot="{ formKey, valid }" @submit="Next()">

            <label>
                <inputComponent ref="FirstNameModel" :formContextKey="formKey">
                    <input 
                        type="text" 
                        placeholder="First name" 
                        v-model="NewUser.firstName" 
                        required 
                        name="firstName"
                        maxlength="15"/>
                </inputComponent>

                <FormErrMessageComponent v-if="FirstNameModel?.Model.dirty && FirstNameModel?.Model?.errors?.['required']">
                    This field cannot be empty.
                </FormErrMessageComponent>
            </label>
        
            <label>
                <inputComponent ref="LastNameModel" :formContextKey="formKey">
                    <input 
                        type="text" 
                        placeholder="Last name" 
                        v-model="NewUser.lastName" 
                        required 
                        name="lastName"
                        maxlength="15"/>
                </inputComponent>
                <FormErrMessageComponent v-if="LastNameModel?.Model.dirty && FirstNameModel?.Model?.errors?.['required']">
                    This field cannot be empty.
                </FormErrMessageComponent>
            </label>

            <inputComponent :formContextKey="formKey">
                <input 
                    type="text" 
                    placeholder="Middle name" 
                    v-model="NewUser.middleName" 
                    name="middleName"/>
            </inputComponent>

            <section class="radio-label">
                <b>Gender</b>

                <div>
                    <div>
                        <radioComponent :modelValue="NewUser.gender">
                            <input 
                                type="radio"
                                v-model="NewUser.gender"
                                name="gender"
                                value="male">
                        </radioComponent>

                        <p>Male</p>
                    </div>

                    <div>
                        <radioComponent :modelValue="NewUser.gender">
                            <input 
                                type="radio"
                                v-model="NewUser.gender"
                                name="gender"
                                value="female">
                        </radioComponent>

                        <p>Female</p>
                    </div>
                </div>
            </section>

            <section class="radio-label">
                <b>Marital Status</b>

                <div>
                    <div>
                        <radioComponent :modelValue="NewUser.maritalStatus">
                            <input 
                                type="radio"
                                v-model="NewUser.maritalStatus"
                                name="marital_status"
                                value="married">
                        </radioComponent>

                        <p>Married</p>
                    </div>

                    <div>
                        <radioComponent :modelValue="NewUser.maritalStatus">
                            <input 
                                type="radio"
                                v-model="NewUser.maritalStatus"
                                name="marital_status"
                                value="single">
                        </radioComponent>
                        <p>Single</p>
                    </div>
                </div>
            </section>
        
            <input :class="{disabled: !valid}" :disabled="!valid" type="submit" value="Next">
        </formComponent>
    </main>
</template>