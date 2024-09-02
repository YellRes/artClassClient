<template>
    <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 4 }">
        <a-form-item
            name="name"
            label="名称">
            <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item
            name="username"
            label="用户">
            <a-input v-model:value="formData.username" />
        </a-form-item>
        <a-form-item
            name="img"
            label="图片">
            <a-upload list-type="picture-card"
                    class="avatar-uploader"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                    :show-upload-list="false"
                    :maxCount="1"
                    @remove="handleRemove"
                    @change="handleChange">
                <img class="uploader-pre-img" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
            </div>
            </a-upload>
           
            <!-- <a-button
                type="primary"
                :disabled="fileList.length === 0"
                :loading="uploading"
                style="margin-top: 16px"
                @click="handleUpload">
                {{ uploading ? 'Uploading' : 'Start Upload' }}
            </a-button> -->
            <!-- <a-input v-model:value="formData.imgUrl" /> -->
        </a-form-item>
    </a-form>
    <a-button type="primary" @click="handleUpload">上传</a-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { imageUpload } from '../../apis/imageUpload/index';

import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';

const formRef = ref();
const formData = reactive({});

const fileList = ref([]);
const uploading = ref(false);
const loading = ref(false);
const imageUrl = ref(null);

const handleRemove = file => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};
const beforeUpload = file => {
    fileList.value = [...(fileList.value || []), file];
    return false;
};

const tobase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject;
});

const handleChange = async info => {
    imageUrl.value = await tobase64(fileList.value[fileList.value.length - 1])
    loading.value = false;
};

const handleUpload = async () => {
    // const formData = new FormData();
    // fileList.value.forEach(file => {
    //     formData.append('files[]', file);
    // });
    uploading.value = true;
    const imageBase64 = await tobase64(fileList.value[fileList.value.length - 1]);

    const rest = await imageUpload({ name: formData.name, username: formData.username, data: imageBase64.replace('data:image/png;base64,', ''), desc: 'test' });
    console.log('upload-rest', rest);
    if (rest.status === 0) {

    }
    uploading.value = false;
};

</script>

<style lang="less" scoped>
    .uploader-pre-img {
      width: 100%;
    }
</style>