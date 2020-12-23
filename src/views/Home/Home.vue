<template>
    <div>

    </div>
</template>

<script>
    export default {
        mounted () {
            this.$http.get('/api/home/getData').then(res => {
                console.log(res.data)
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>