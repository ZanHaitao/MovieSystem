<template>
    <div class="movie-list">
        <template v-if="type === 'defaultMovie'">
            <ul class="default">
                <li v-for="item in movieList" :key="item.id">
                    <router-link class="movie-img" tag="p" :to="{name:'movieDetail',params:{id:item.id}}">
                        <img :src="item.imgUrl" alt="">
                        <span class="detail">
                            <span class="movie-title">{{ item.name }}</span>
                            <span class="movie-score">{{ item.score }}</span>
                        </span>
                    </router-link>
                    <router-link tag="p" to="movie-buy" class="buy-ticket">购 票</router-link>
                </li>
            </ul>
        </template>
        <template v-else-if = "type === 'futureMovie'">
            <ul class="future">
                <li v-for="(item,index) in movieList" :key="item.id">
                    <router-link class="movie-img" tag="p" :to="{name:'movieDetail',params:{id:item.id}}">
                        <img :src="item.imgUrl" alt="">
                        <span class="detail">
                            <span class="movie-title">{{ item.name }}</span>
                        </span>
                    </router-link>
                    <p class="likes">{{ likesArr[index] }}人想看</p>
                    <p class="movie-btn">
                        <span>预告片</span>
                        <span>预售</span>
                    </p>
                    <p class="publish-date">{{ item.publishDate }}</p>
                </li>
            </ul>
        </template>
        <template v-if="type === 'movieList'">
            <ul class="list">
                <li v-for="item in movieList" :key="item.id">
                    <router-link class="movie-img" tag="p" :to="{name:'movieDetail',params:{id:item.id}}">
                        <img :src="item.imgUrl" alt="">
                        <span class="detail">
                            <span class="movie-title">{{ item.name }}</span>
                            <span class="movie-score">{{ item.score }}</span>
                        </span>
                    </router-link>
                    <p class="title">{{ item.name }}</p>
                    <p class="score">{{ item.score }}</p>
                </li>
            </ul>
        </template>

        <template v-if="type === 'related'">
            <ul class="related">
                <li v-for="item in movieList" :key="item.id">
                    <router-link class="movie-img" tag="p" :to="{name:'movieDetail',params:{id:item.id}}">
                        <img :src="item.imgUrl" alt="">
                        <span class="detail">
                            <span class="movie-title">{{ item.name }}</span>
                            <span class="movie-score">{{ item.score }}</span>
                        </span>
                    </router-link>
                    <p class="title">{{ item.name }}</p>
                    <p class="score">{{ item.score }}</p>
                </li>
            </ul>
        </template>

        <template v-if="movieList.length === 0">
            <div class="error">
                抱歉，没有找到相关结果，请尝试用其他条件筛选。
            </div>
        </template>

        
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true
            },
            movieList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                likesArr:[]
            }
        },
        created() {
            for (let i = 0; i < 8; i++) {
                this.likesArr.push(Math.floor((Math.random() * 10000 - 1000) + 1000))
            }
        },
    }
</script>

<style lang="scss">
    @import '../../assets/scss/movie/movie.scss';
</style>