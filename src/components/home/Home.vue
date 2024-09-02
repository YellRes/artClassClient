<template>
    <section id="home">
        <Menu />
        <div>
            <router-view />
        </div>
    </section>
</template>

<script setup>
import Menu from './Menu.vue';

</script>

<style lang="less" scoped>
    section#home {
        display: flex;
        width: 100%;
        height: 100%;
        > div {
            flex: 1;
        }
    }
</style>