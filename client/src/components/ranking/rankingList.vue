<template>
    <div class="ranking-list">
        <ul>
            <router-link tag="li" :to="{name:'movieDetail',params:{id:item.id}}" v-for="(item,index) in movieList" :key="item.id">
                <div class="index">
                    <span>
                        {{ index+1 }}
                    </span>
                </div>
                <div class="movie-image">
                    <img :src="item.imgUrl" alt="">
                </div>
                <div class="detail">
                    <p class="title">{{ item.name }}</p>
                    <p class="type">类型：{{ item.type }}</p>
                    <p class="publish">{{ item.publishDate }}</p>
                    <span class="first-score">{{ item.score.slice(0,2) }}</span>
                    <span class="last-score">{{ item.score.slice(2) }}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            movieList: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/ranking/rankingList.scss'
</style>