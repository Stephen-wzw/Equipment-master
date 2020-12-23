<template>
    <div class="user-table">
        <el-table stripe :data="tableData" v-loading="config.loading" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column label="序号" width="80" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ (config.page - 1) * 10 + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleWatch(scope.row)">查看</el-button>
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" class="page" :total="config.total" :current-page.sync="config.page" @current-change="changePage"></el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            tableData: Array,
            tableLabel: Array,
            config: Object
        },
        methods: {
            handleWatch(row) {
                this.$emit('watch', row)
            },
            handleEdit(row) {
                this.$emit('edit', row)
            },
            handleDelete(row) {
                this.$emit('del', row)
            },
            changePage(page) {
                this.$emit('changePage', page)
            }
        },
    }
</script>

<style>
    .user-table {
        height: calc(100% - 62px);
        
    }
    .page {
        position: absolute;
        bottom: 150px;
        right: 20px;
    }
</style>