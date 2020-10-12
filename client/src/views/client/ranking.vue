<template>
    <div class="page-ranking">
        <div class="nav-bar">
            <ul class="util-wrapper">
                <li @click="changActice(item)" :class="{'active':active === item}" v-for="item in navList" :key="item">
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="content util-wrapper">
            <ranking-list :movieList="movieList" />
        </div>
    </div>
</template>

<script>
    import RankingList from '@/components/client/ranking/rankingList';
    export default {
        components: {
            RankingList
        },
        data() {
            return {
                navList: [
                    '热映口碑榜',
                    '最受期待榜',
                    '国内票房榜',
                    'TOP 10 榜'
                ],
                active: '热映口碑榜',
                movieList: [],
            }
        },
        created() {
            this.$api.getMovieList({
                limit: 10
            },'user').then(res => {
                this.movieList = res.data;
            })
        },
        methods: {
            changActice(title) {
                this.active = title;
            },
            changeMovieList(page) {
                this.$api.getMovieList({
                    page: page,
                    limit: 10
                },'user').then(res => {
                    this.movieList = res.data;
                })
            }
        },
        watch: {
            active(val) {
                if (val === '热映口碑榜') {
                    this.changeMovieList(1);
                } else if (val === '最受期待榜') {
                    this.changeMovieList(2);
                } else if (val === '国内票房榜') {
                    this.changeMovieList(3);
                } else {
                    this.changeMovieList(4);
                }
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/ranking/pageRanking.scss'
</style>