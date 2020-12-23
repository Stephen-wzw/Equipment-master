<template>
    <el-form :inline="true" :model="form" ref="form" label-width="100px">
        <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
            <el-input v-model="form[item.model]" :placeholder="'请输入关键字' + item.label" v-if="!item.type"></el-input>
            <el-select v-model="form[item.model]" placeholder='请选择' v-if="item.type === 'select'">
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>

</template>

<script>
    export default {
        props: {
            inLine: Boolean,
            form: Object,
            formLabel: Array
        },
    }
</script>

<style lang="scss" scoped>

</style>