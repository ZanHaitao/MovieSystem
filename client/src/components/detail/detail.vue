<template>
    <div class="detail-comp">
        <template v-if=" type === 'movie' ">
            <div class="content util-wrapper movie">
                <div class="detail-image">
                    <img :src="detailData.imgUrl" alt="">
                </div>
                <div class="detail-info">
                    <p class="title">{{ detailData.name }}</p>
                    <p class="type">{{ detailData.type }}</p>
                    <p class="region">{{ detailData.region}} / {{ detailData.duration }}</p>
                    <p class="publish">{{ detailData.publishDate }}</p>

                    <router-link class="buy-btn" tag="p" :to="{name:'cinema',params:{id:detailData.id}}">
                        立 即 购 票
                    </router-link>
                </div>
                <div class="detail-data">
                    <p>想看数</p>
                    <p class="score">{{ Math.floor((Math.random() * 1000000 - 100000) + 100000) }}</p>
                    <p>评分</p>
                    <p class="score">{{ detailData.score }}</p>
                    <p>累计票房</p>
                    <p class="score">{{ detailData.income }}亿</p>
                </div>
                <div class="info">
                    <p class="title">剧情简介</p>
                    <p class="content">
                        {{ detailData.introduce }}
                    </p>
                </div>
            </div>
        </template>

        <template v-if=" type === 'cinema' ">
            <div class="content util-wrapper cinema">
                <div class="detail-image">
                    <img :src="detailData.imgUrl" alt="">
                </div>
                <div class="detail-info">
                    <p class="title">{{ detailData.name }}</p>
                    <p class="address">{{ detailData.address }}</p>
                    <p class="mobile">电话: {{ detailData.mobile }}</p>
                    <p class="division">影院服务 <span class="symbol"></span></p>
                    <p v-for="item in detailData.server" :key="item.id" class="server">
                        <span class="title">{{ item.name }}</span>
                        <span class="content">{{ item.content }}</span>
                    </p>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        props: {
            detailData: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scope>
    @import '../../assets/scss/detail/detail.scss'
</style>