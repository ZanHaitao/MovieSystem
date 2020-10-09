<template>
    <div class="comment">
        <div class="title">
            热门短评
        </div>
        <template v-if="loginUser !== ''">
            <div class="publish-comment">
                <el-popover placement="bottom" width="500" trigger="click">
                    <div class="score">
                        <span>评分：</span>
                        <el-rate v-model="score"></el-rate>
                    </div>
                    <div class="content">
                        <p>内容：</p>
                        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </div>
                    <el-button @click="publishComment">发布</el-button>
                    <el-button slot="reference">发布评论</el-button>
                </el-popover>
            </div>
        </template>
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
                likes: [false, false, false, false, false, false, false, false, false, false],
                loginUser: this.$store.state.loginUser.name ? this.$store.state.loginUser.name : '',
                score: 0,
                textarea: ''
            }
        },
        mounted() {
            this.changeData();
        },
        computed: {
            userLogin() {
                return this.$store.state.loginUser;
            }
        },
        methods: {
            publishComment() {
                console.log(this.$store.state.loginUser.id)
                if (this.textarea.length == 0 || this.score == 0) {
                    this.warning();
                    return;
                }
                const nowDate = new Date();
                this.$api.addComment({
                    UserId: this.$store.state.loginUser.id,
                    MovieId: this.movieId,
                    content: this.textarea,
                    score: this.score * 2,
                    likes: 0,
                    publishDate: `${nowDate.getFullYear() }-${nowDate.getMonth()+1 }-${nowDate.getDate()+1 }`
                }).then(res => {
                    if(res){
                        this.changeData();
                        this.success();
                    }
                })
            },
            success() {
                this.$notify({
                    title: '发布成功',
                    message: `评论发布成功！`,
                    type: 'success'
                });
            },
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
            },
            warning() {
                this.$notify({
                    title: '警告',
                    message: '信息填写不完整！',
                    type: 'warning'
                });
            },
        },
        watch: {
            $route() {
                this.changeData();
                this.likes.splice(0, 10, false, false, false, false, false, false, false, false, false, false);
            },
            userLogin() {
                this.loginUser = this.$store.state.loginUser.name;
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/comment/comment.scss'
</style>