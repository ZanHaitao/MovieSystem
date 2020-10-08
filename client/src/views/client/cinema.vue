<template>
    <dir class="page-cinema util-wrapper">
        <cinema-list :listData="cinemaData" />
    </dir>
</template>

<script>
    import CinemaList from '@/components/client/cinema/cinemaList';
    export default {
        data() {
            return {
                cinemaData: []
            }
        },
        components: {
            CinemaList
        },
        methods: {
            getData() {
                this.$api.getCinemaList({
                    cityid: this.$store.state.CityId
                }).then(res => {
                    this.cinemaData = res.data;

                    for (let i = 0; i < this.cinemaData.length; i++) {
                        const item = this.cinemaData[i]
                        this.$api.getCinemaServiceList({
                            cinemaid: item.id
                        }).then(res => {
                            this.$set(item, 'server', res.data);
                        })
                    }
                })
            }
        },
        created() {
            this.getData();
        },
        computed: {
            CityId() {
                return this.$store.state.CityId;
            }
        },
        watch: {
            CityId() {
                this.getData();
            }
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/client/cinema/pageCinema.scss'
</style>