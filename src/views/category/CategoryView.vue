<template>
    <div>
        <el-empty v-if="!categoryList.length " description="暂无数据">
            <el-button>重试</el-button>
        </el-empty>
        <el-table
        v-else
        :data="categoryList"
        style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            label="图标"
            prop="icon"
            align="center"
            width="80">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="" width="40" height="40">
                </template>
            </el-table-column>
            <el-table-column
            v-for="item in categoryListHeader"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center">
            </el-table-column>
            <el-table-column
            label="选项"
            align="center"
            width="400">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="handleEditBtnClick(scope.$index, categoryList)"
                    type="text">
                    edit
                    </el-button>
                    <el-button @click="$event => handleDeleteBtnClick(scope.$index, categoryList)" type="text">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="24" align="center">
                <el-pagination
                :hide-on-single-page="true"
                background
                layout="prev, pager, next"
                :total="20">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
    data() {
        return {
            categoryListHeader: [
                {
                    label: '分类名称',
                    prop: 'categoryname',
                    width: 150
                },
                {
                    label: '分类描述',
                    prop: 'categorydescription',
                    width: 200
                },
            ],
            categoryList: [
                {
                    _id: 0,
                    categoryname: '热菜',
                    categorydescription: '热菜',
                    icon: ''
                }
            ],
            tableData: []
        };
    },
    methods: {
        getCategoryList() {
            this.$http.get('/category/list').then(res => {
                if (res.code === 200) {
                    this.categoryList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        handleEditBtnClick(index, list) {
            this.$router.push(`/category/edit/${list[index]._id}`);
        },
        handleDeleteBtnClick(index, list) {
            this.$confirm('将同时删除相关的所有评论，是否确认删除', '注意', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(`/category/delete/${list[index]._id}`).then(res => {
                    if (res.code === 200) {
                        this.$message.success('删除成功!');
                        this.getCategoryList();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }).catch(() => {
                
            });
        }
    },
    mounted() {
        this.getCategoryList();
    }
}
</script>