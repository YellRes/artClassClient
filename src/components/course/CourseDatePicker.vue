<template>
    <div class="course-date-picker">
        <div v-for="(item, index) in datesArr" :key="index">
            <a-select v-model:value="item.week">
                <a-select-option v-for="i in weeks" :key="i.value" :value="i.value">{{i.label}}</a-select-option>
                <!-- <a-select-option value="0">周一</a-select-option>
                <a-select-option value="1">周二</a-select-option> -->
            </a-select>
            <span class="plus-btn" @click="() => addTime(item)"><PlusOutlined /></span>
            <div class="course-time">
                <template v-for="(ite, inde) in item.info" :key="inde">
                    <!-- <a-time-range-picker format="HH:mm" :key="inde" v-model="[dayjs(ite.startTime), dayjs(ite.endTime)]" /> -->
                    <a-time-range-picker format="HH:mm" v-model:value="ite.times" />
                </template>
            </div>
        </div>
        <a-button type="primary" @click="addDate">增加课程</a-button>
        <!-- <a-button type="primary" @click="getSource">get data</a-button> -->
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons-vue';

const weeks = [{
    value: 0,
    label: '周日'
},{
    value: 1,
    label: '周一'
},{
    value: 2,
    label: '周二'
},{
    value: 3,
    label: '周三'
},{
    value: 4,
    label: '周四'
},{
    value: 5,
    label: '周五'
},{
    value: 6,
    label: '周六'
},]

const datesArr = reactive([
    {
        week: 1,
        times: [],
        info: [
            {
                times: [dayjs('12:00', 'HH:mm'), dayjs('13:00', 'HH:mm')]
            },
            // {
            //     startTime:'12:00',
            //     endTIme: '13:00'
            // }
        ]
    }
    ]);
const timeArr = ref([]);

const addDate = () => {
    datesArr.push({
        week: null,
        info: []
    });
}
const addTime = (e) => {
    e.info.push({
        times: null
    });
}

const getSource = () => {
    console.log(datesArr)
}
</script>

<style lang="less" scoped>
    .course-date-picker {
        display: flex;
        flex-direction: column;
        > div {
            display: flex;
            align-items: baseline;
            margin-bottom: .6rem;
            .ant-select {
                width: 5rem;
                min-width: 5rem;
            }
            .plus-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: .8rem;
                height: .8rem;
                margin: 0 .4rem;
                font-size: .6rem;
                border: 1px solid;
                border-radius: 50%;
                cursor: pointer;
            }
            .course-time {
                .ant-picker {
                    margin-bottom: .4rem;
                }
            }
        }
    }
</style>