<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 156px"
    mode="inline"
    :items="items"
    @click="handleClick"
  ></a-menu>
</template>
<script setup>
import { reactive, ref, watch, h, onMounted } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const selectedKeys = ref(['image/upload']);
const openKeys = ref(['sub1']);
const router = useRouter();

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// const items = reactive([
//   getItem('Navigation One', 'sub1', () => h(MailOutlined), [
//     getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
//     getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
//   ]),
//   getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//   ]),
//   {
//     type: 'divider',
//   },
//   getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Option 11', '11'),
//     getItem('Option 12', '12'),
//   ]),
//   getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
// ]);
const items = [
    {
    key: 'image/upload',
    // icon: () => h(PieChartOutlined),
    label: '图片上传',
    title: '图片上传-title',
  },
  {
    key: 'course',
    // icon: () => h(DesktopOutlined),
    label: '课程管理',
    title: '课程管理-title',
  },
]
const handleClick = e => {
    router.push(`/${e.key}`)
};

onMounted(() => {
    router.push(`/${items[0].key}`);
})

watch(openKeys, val => {
  console.log('openKeys', val);
});
</script>