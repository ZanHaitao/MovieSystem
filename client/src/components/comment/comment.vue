<template>
    <div class="comment">
        <div class="title">
            热门短评
        </div>
        <div class="content">
            <template v-if="commentsData.length === 0">
                <div class="error">
                    当前影片暂无评论，赶快去抢占沙发把。
                </div>
            </template>
            <ul>
                <li v-for="(item,index) in commentsData" :key="item.id">
                    <div class="portrait">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                    <div class="detail">
                        <p class="name">{{ item.User.name + item.User.id }}</p>
                        <p class="score">
                            <span class="publish">{{ item.publishDate }}</span>
                            <el-rate :value="+item.score / 2" disabled score-template="{value}">
                            </el-rate>
                            <span class="likes" @click="changLikes(index,item)" :class="{ 'active': likes[index] === true}">
                                <i class="el-icon-sugar"></i>
                                <span>{{ item.likes }}</span>
                            </span>
                        </p>
                        <p class="content">
                            {{ item.content }}
                        </p>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            movieId: {
                type: [String, Number],
                required: true
            }
        },
        data() {
            return {
                commentsData: [],
                likes: [false, false, false, false, false, false, false, false, false, false]
            }
        },
        mounted() {
            this.changeData();
        },
        methods: {
            changLikes(index, item) {
                this.likes.splice(index, 1, !this.likes[index])
                if (this.likes[index] === true) {
                    this.$set(item, item.likes, item.likes++);
                } else {
                    this.$set(item, item.likes, item.likes--);
                }
            },
            changeData() {
                this.$api.getCommentList({
                    movieid: this.movieId
                }).then(res => {
                    this.commentsData = res.data;
                })
            }
        },
        watch: {
            $route() {
                this.changeData();
                this.likes.splice(0, 10, false, false, false, false, false, false, false, false, false, false);
            }
        },
    }
</script>

<style lang="scss">
    @import '../../assets/scss/comment/comment.scss'
</style>