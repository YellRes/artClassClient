<template>
    <a-drawer
        v-model:open="_open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        style="color: red"
        title="新增课程"
        placement="right"
        destroyOnClose
        @after-open-change="afterOpenChange"
        @close="darwerClose"
        >
        <a-form
            :model="formData"
            >
            <a-form-item
                label="课程名"
                name="name"
                >
                <a-input v-model="formData.name" />
            </a-form-item>
             <a-form-item
                label="有效期"
                name="validDate"
                >
                <a-range-picker v-model:value="formData.ranegDate" />
            </a-form-item>
             <a-form-item
                label="详情"
                name="detail"
                >
                <!-- <a-select v-model:value="formData.status">
                    <a-select-option value="0">周一</a-select-option>
                    <a-select-option value="1">周二</a-select-option>
                </a-select>
                <span><PlusOutlined /></span>
                <a-time-range-picker /> -->
                <!-- <a-input v-model="formData.detail" /> -->
                <CourseDatePicker />
            </a-form-item>
             <a-form-item
                label="状态"
                name="status"
                >
                <a-select v-model:value="formData.status">
                    <a-select-option value="0">正常</a-select-option>
                    <a-select-option value="1">过期</a-select-option>
                </a-select>
                <!-- <a-input v-model="formData.status" /> -->
            </a-form-item>
        </a-form>
    </a-drawer>    
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

import CourseDatePicker from './CourseDatePicker.vue';

const props = defineProps(['open']);
const emit = defineEmits(['darwerChange']);

const formData = reactive({});
const _open = ref(false);
const afterOpenChange = bool => {
    console.log('_open', bool);
};
const darwerClose = () => {
    emit('darwerChange', false);
}


// const showModal = () => {
//   open.value = true;
// };
// const handleOk = e => {
//   console.log(e);
//   _open.value = false;
// };

watch(() => props.open, (e) => {
    _open.value = Boolean(e);
})
</script>