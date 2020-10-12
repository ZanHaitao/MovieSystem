<template>
    <div class="page-move util-wrapper">
        <my-category @change="changSelect(arguments)" :listData="showType" :selectType="selectType" :selectArea="selectArea" :selectYear="selectYear" />

        <my-movie :movieList="movieData" :type="'movieList'"></my-movie>

        <template v-if="movieData.length !== 0">
            <el-pagination background :current-page="nowPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="limit" layout="prev, pager, next" :total="total">
            </el-pagination>
        </template>
    </div>
</template>

<script>
    import MyCategory from '@/components/client/movie/category';
    import MyMovie from '@/components/client/movie/movie';
    export default {
        data() {
            return {
                listData: [],
                selectType: '全部',
                selectArea: '全部',
                selectYear: '全部',
                movieData: [],
                total: 0,
                nowPage: 1,
                limit: 24,
                type: []
            }
        },
        created() {
            this.$api.getMovieTypeList({
                limit: 999
            },'user').then(res => {
                this.listData = res.data;
            });

            this.$api.getMovieList({
                page: this.nowPage,
                limit: this.limit
            },'user').then(res => {
                this.total = res.count
                this.movieData = res.data;
            })
        },
        components: {
            MyCategory,
            MyMovie
        },
        computed: {
            showType() {
                const typeObj = {}
                for (let i = 0; i < this.listData.length; i++) {
                    const item = this.listData[i];
                    if (!typeObj[item.type]) {
                        typeObj[item.type] = {};
                        typeObj[item.type].id = i;
                        typeObj[item.type].type = item.type + " :";
                        typeObj[item.type].typeArr = [];
                        typeObj[item.type].typeArr.push('全部')
                        typeObj[item.type].typeArr.push(item.typeName)
                    } else {
                        typeObj[item.type].typeArr.push(item.typeName)
                    }
                }
                return typeObj;
            }
        },
        methods: {
            changSelect(args) {
                const type = args[0];
                const typeName = args[1];
                if (type === '类型 :') {
                    this.selectType = typeName;
                } else if (type === '区域 :') {
                    this.selectArea = typeName;
                } else {
                    this.selectYear = typeName
                }
            },
            handleSizeChange(page) {
                this.nowPage = page;
            },
            handleCurrentChange(page) {
                this.nowPage = page;
            },
            getData(type) {
                const options = {
                    page: this.nowPage,
                    limit: this.limit
                }
                this.type = this.type.filter(item => {
                    return item !== '全部'
                })
                if (this.type) {
                    options.type = this.type.join(' ');
                }
                this.$api.getMovieList({
                    ...options
                },'user').then(res => {
                    this.total = res.count
                    this.movieData = res.data;
                })
            }
        },
        watch: {
            nowPage() {
                this.getData();
            },
            selectType(val, oldVal) {
                if (this.type.indexOf(oldVal) !== -1) {
                    this.type.splice(this.type.indexOf(oldVal), 1)
                }
                this.nowPage = 1;
                this.type.push(val)
                this.getData();
            },
            selectArea(val, oldVal) {
                if (this.type.indexOf(oldVal) !== -1) {
                    this.type.splice(this.type.indexOf(oldVal), 1)
                }
                this.nowPage = 1;
                this.type.push(val)
                this.getData();
            },
            selectYear(val, oldVal) {
                if (this.type.indexOf(oldVal) !== -1) {
                    this.type.splice(this.type.indexOf(oldVal), 1)
                }
                this.nowPage = 1;
                this.type.push(val)
                this.getData();
            },
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/movie/pageMovie.scss';
</style>