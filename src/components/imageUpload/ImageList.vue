<template>
    <section id="image-list">
        <slot name="uploadBtn"></slot>
        <template v-for="item in list">
            <img :src="item.data" alt="img">
        </template>
    </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

import { getImageList } from '../../apis/imageUpload/index';

const list = ref([]);

watchEffect(async () => {
    const rest = await getImageList();
    if (rest.status === 0) {
        list.value = rest.data
    }
    console.log('list', rest);
})

</script>

<style lang="less" scoped>
    section#image-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 2rem;
        img {
            width: 49%;
            border-radius: 8px;
        }
        > * {
            margin-bottom: .6rem;
        }
    }
</style>
