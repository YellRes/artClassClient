<template>
    <section id="course">
        <div class="course-pool">
            <template v-for="item in coursePools">
                <a-tag :bordered="false" :color="item.color || 'processing'">{{item.name}}</a-tag>
            </template>
            <a-tag :bordered="false" :color="'processing'" @click="addCourse"><PlusOutlined /></a-tag>
        </div>
        <UserCourseTable />
        <CourseDrawer :open="open" @darwerChange="darwerChange" />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import UserCourseTable from './UserCourseTable.vue';
import CourseDrawer from './CourseDrawer.vue';

import { getCourses, createUserCourse } from '../../apis/course/index';

import { colors } from '../../utils/index';

import { PlusOutlined } from '@ant-design/icons-vue';

const coursePools = ref([]);

const getCoursePools = async () => {
    const rest = await getCourses();
    if (rest.status === 0) {
        coursePools.value = rest.data.map((item, index) => {
            const _index = Math.floor(Math.random() * colors.length);
            // item.color = colors[_index];
            return {color: colors[_index], ...item}
        });
    }
}

getCoursePools();

const open = ref(false);
const darwerChange = (e) => {
    open.value = e;
}

const addCourse = () => {
    open.value = true;
}

const newCourse = async () => {
    const res = await createUserCourse({
        name: '',
        // username: userInfo.name,
        startTime: '2024-08-08',
        endTime: '2024-10-10',
        detail: [{week: 5, info: [{startTime: '09:00', endTime: '12:00', sort:1, name: 'course-api'}]}],
        status: 0
    });
    console.log(`create-course: ${res}`);
}
</script>

<style lang="less" scoped>
    .course-pool {
        padding: 2rem 1rem;
        height: 10rem;
        overflow-y: auto;
        .ant-tag {
            margin-left: 1rem;
            cursor: pointer;
            &:hover {
              border-color: #1677ff;
            }
        }
    }
</style>