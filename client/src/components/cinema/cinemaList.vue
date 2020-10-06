<template>
    <div class="cinema-list">
        <div class="title">
            影院列表
        </div>

        <template v-if="listData.length === 0">
            <div class="error">
                当前地点暂时没有影院，请您更改位置。
            </div>
        </template>

        <div class="content">
            <ul>
                <li v-for="item in listData" :key="item.id">
                    <router-link tag="p" :to="{name:'cinemaDetail',params:{id:item.id}}" class="title">{{ item.name }}</router-link>
                    <p class="address">地址：{{ item.address }}</p>
                    <ul class="server-list">
                        <li v-for="serv in item.server" :key="serv.id">
                            {{ serv.name }}
                        </li>
                    </ul>
                    <span class="price">
                        <span class="symbol">￥</span>{{ [35,45,24,22,55][Math.floor(Math.random()*5)] }}
                        <span class="prompt">起</span>
                    </span>
                    <router-link tag="span" :to="{name:'cinemaDetail',params:{id:item.id}}" class="buy-btn">选座购票</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            listData: {
                type: Array,
                required: true
            }
        },
    }
</script>

<style lang="scss">
    @import '../../assets/scss/cinema/cinemaList.scss'
</style>