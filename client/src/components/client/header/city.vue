<template>
    <div class="city-list">
        <p class="location">
            当前定位城市：
            <i class="el-icon-location"></i>
            {{selectCity}}市
        </p>
        <dl v-for="value in showCity" :key="value.id">
            <dt>{{ value.province}}</dt>
            <dd @click="changeCity(city)" v-for="city in value.cityArr" :key="city">{{ city }}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        props: {
            cityList: {
                type: Array,
                required: true
            },
            selectCity: {
                type: String,
                required: true
            }
        },
        methods: {
            changeCity(city) {

                this.$api.getCityList({
                    key: city.slice(0, city.length - 1)
                },'user').then(res => {
                    this.$store.dispatch('changeCity', {
                        CityId: res.data[0].id
                    })
                })

                if (this.$route.path !== '/cinema') {
                    this.$router.push({ name: 'cinema' })
                }
            }
        },
        computed: {
            showCity() {
                const provinceObj = {}
                for (let i = 0; i < this.cityList.length; i++) {
                    const item = this.cityList[i];
                    if (!provinceObj[item.province]) {
                        if (item.province == '北京' || item.province == '上海' || item.province == '重庆' || item.province == '天津') {
                            if (!provinceObj['直辖市']) {
                                provinceObj['直辖市'] = {}
                                provinceObj['直辖市'].id = i;
                                provinceObj['直辖市'].province = "直辖市";
                                provinceObj['直辖市'].cityArr = [];
                            }
                            provinceObj['直辖市'].cityArr.push(item.city + "市")
                            continue;
                        }
                        provinceObj[item.province] = {};
                        provinceObj[item.province].id = i;
                        provinceObj[item.province].province = item.province + "省";
                        provinceObj[item.province].cityArr = [];
                        provinceObj[item.province].cityArr.push(item.city + "市")
                    } else {
                        provinceObj[item.province].cityArr.push(item.city + "市")
                    }
                }
                return provinceObj;
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/header/city.scss'
</style>