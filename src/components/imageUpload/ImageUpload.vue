<template>
    <ImageList>
      <template v-slot:uploadBtn>
        <div class="upload-btn" @click="showDrawer">
          <upload-outlined :style="{fontSize: '2rem'}"></upload-outlined>
          <h3>CLick to Upload</h3>
        </div>
      </template>
  </ImageList>
    <a-drawer v-model:open="open"
              class="custom-class"
              root-class-name="root-class-name"
              :root-style="{ color: 'blue' }"
              style="color: red"
              title="图片上传"
              placement="right"
              destroyOnClose
              @after-open-change="afterOpenChange">
      <div class="clearfix">
        <ImageFrom />
      </div>
    </a-drawer>

</template>
<script setup>
import { ref } from 'vue';
// import request from 'umi-request';
// import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

import ImageList from './ImageList.vue';
import ImageFrom from './ImageForm.vue';




const open = ref(false);
const afterOpenChange = bool => {
  console.log('open', bool);
};
const showDrawer = () => {
  open.value = true;
};

const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = file => {
  fileList.value = [...(fileList.value || []), file];
  // imageUrl
  return false;
};

const tobase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject;
});

const handleChange = async info => {
    imageUrl.value = await tobase64(fileList.value[0])
    debugger
    loading.value = false;
};

const handleUpload = async () => {
  const formData = new FormData();
  fileList.value.forEach(file => {
    formData.append('files[]', file);
  });
  uploading.value = true;
  // console.log(fileList.value.map(item => {
  //     return new Blob(item)
  // }));
  const imageBase64 = await tobase64(fileList.value[0]);
  console.log('----------', imageBase64);

  const rest = await imageUpload({ name: 'test\'s image', username: 'test', data: imageBase64.replace('data:image/png;base64,', ''), desc: 'test' });
  console.log('upload-rest', rest);
  if (rest.status === 0) {

  }
  uploading.value = false;
};
</script>

<style lang="less" scoped>
    .upload-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 49%;
        min-width: 8rem;
        min-height: 10rem;
        background-color: rgba(0, 0, 0, 0.02);
        border: 1px dashed #d9d9d9;
        border-radius: 8px;
        cursor: pointer;
        transition: border-color 0.3s;
        h3 {
          margin-top: 1rem;
          text-align: center;
        }
        &:hover {
              border-color: #1677ff;
        }
    }
</style>