<template>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
  
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
  
      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>
  
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
</template>

  <script setup>
  import { reactive } from 'vue';
  import {login} from '../../apis/login';
  import { useRouter } from 'vue-router';

  const formState = reactive({
    username: '',
    password: '',
    remember: true,
  });
  const router = useRouter();
  
  const onFinish = async ({username, password}) => {
    const rest = await login({name: username, password});
    console.log('login', rest);
    if (rest.status === 0) {
      localStorage.setItem('userInfo', rest.data);
      localStorage.setItem('token', rest.data.token);
      router.push({path: '/'})
    }
    // console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  </script>

  <style lang="less" scoped>
    .ant-form {
      width: 60%;
    }
  </style>