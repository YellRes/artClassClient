<template>
    <div class="course-table">
        <a-table
            :columns="columns"
            :data-source="tableData.data"
            >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'detail'">
                    <span>detail</span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue';

import { getCourses } from '../../apis/course/index';


const data = [
  {
    key: '1',
    name: 'John Brown',
    username: 32,
    detail: 'New York No. 1 Lake Park',
    consume: 2,
    rest: 2,
    status: 0
  },
]
const columns = [
    {
        title: '用户名称',
        dataIndex: 'username',
    },
    {
        title: '课程名称',
        dataIndex: 'name',
    },
    {
        title: '已上课时',
        dataIndex: 'consume',
    },
    {
        title: '未上课时',
        dataIndex: 'rest',
    },
    {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail'
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
];
// const sourceData = ref([]);
// const tableData = {columns,data: sourceData};
const tableData = reactive({data: []});


// tableData.columns = columns;

const _getCourses = async () => {
    const rest = await getCourses();
    if (rest.status === 0) {
        tableData.data = rest.data.map((item, index) => {
            return {
                key: `${index}`,
                name: item.name,
                username: item.username,
                consume: item.consume,
                rest: item.rest,
                detail: JSON.stringify(item.detail),
                status: item.status
            };
        });
    }
}

_getCourses();
// watchEffect(async () => {
//     _getCourses()
// })

</script>

<style lang="less" scoped>
    .course-table {
        box-shadow: 0 -20px 48px -45px #000;
    }
</style>
