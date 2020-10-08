<template>
    <div class="panel">
        <template v-if="type === 'price'">
            <dl class="type-price list">
                <dt class="title">
                    {{title}}
                    <router-link tag="span" to="movie">
                        查看全部榜单
                        <i class="el-icon-arrow-right"></i>
                    </router-link>
                </dt>
                <router-link tag="dl" v-for="(item,index) in listData" :key="item.id" :to="{name:'movieDetail',params:{id:item.id}}">
                    <span class="queue-num">{{ index+1 }}</span>
                    <span>{{ item.name }}</span>
                    <span class="info">{{ item.income }} 亿</span>
                </router-link>
            </dl>
        </template>

        <template v-if="type === 'forward'">
            <dl class="type-forward list">
                <dt class="title">
                    {{title}}
                    <router-link tag="span" to="movie">
                        查看全部榜单
                        <i class="el-icon-arrow-right"></i>
                    </router-link>
                </dt>
                <router-link tag="dl" v-for="(item,index) in listData" :key="item.id" :to="{name:'movieDetail',params:{id:item.id}}">
                    <span class="queue-num">{{ index+1 }}</span>
                    <span>{{ item.name }}</span>
                    <span class="info">{{ Math.floor((Math.random() * 1000000 - 100000) + 100000) }} 人想看</span>
                </router-link>
            </dl>
        </template>

        <template v-if="type === 'likes'">
            <dl class="type-likes list">
                <dt class="title">
                    {{title}}
                    <router-link tag="span" to="movie">
                        查看全部榜单
                        <i class="el-icon-arrow-right"></i>
                    </router-link>
                </dt>
                <router-link tag="dl" v-for="(item,index) in listData" :key="item.id" :to="{name:'movieDetail',params:{id:item.id}}">
                    <span class="queue-num">{{ index+1 }}</span>
                    <span>{{ item.name }}</span>
                    <span class="info">{{ item.score }} 分</span>
                </router-link>
            </dl>
        </template>

    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            listData: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/movie/ranking.scss'
</style>