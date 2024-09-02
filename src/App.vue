<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<script setup>
import Login from './components/login/Login.vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
const locale = zhCN;
</script>

<style>
    #app {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>