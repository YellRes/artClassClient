<template>
    <div id="login">
        <h2>Welecome!</h2>
        <LoginForm />
    </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue';

</script>

<style lang="less" scoped>
    #login {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        h2 {
            margin-bottom: 2rem;
        }
    }
</style>