<template>
    <div class="category">
        <dl v-for="value in listData" :key="value.id">
            <dt>{{ value.type }}</dt>
            <dd :class="{ 
                'typeActive':value.type === '类型 :' && selectType === item,
                'areaActive':value.type === '区域 :' && selectArea === item,
                'yearActive':value.type === '年代 :' && selectYear === item
             }" v-for="item in value.typeArr" :key="item" @click="change(value.type,item)">
                {{ item }}
            </dd>
        </dl>
    </div>
</template>

<script>
    export default {
        props: {
            listData: {
                type: Object,
                required: true
            },
            selectType: {
                type: String,
                required: true
            },
            selectArea: {
                type: String,
                required: true
            },
            selectYear: {
                type: String,
                required: true
            },
        },
        data() {
            return {
            }
        },
        methods: {
            change(type, typeName) {
                this.$emit('change', type, typeName)
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/movie/category.scss'
</style>