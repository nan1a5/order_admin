<template>
    <div>
        <el-empty v-if="!recipeList.length " description="暂无数据">
            <el-button>重试</el-button>
        </el-empty>
        <el-table
        v-else
        :data="recipeList"
        style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            label="图片"
            align="center"
            width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.image[0]" alt="" width="120" height="120">
                </template>
                <!-- <img src="" alt="" width="120" height="120"> -->
            </el-table-column>
            <el-table-column
            v-for="item in recipeListHeader"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center">
            </el-table-column>
            <el-table-column
            prop="price"
            label="单价"
            align="center"
            width="80">
                <template v-slot:default="scope">
                    <currency :value="scope.row.price" :line-through=scope.row.ispromotion></currency>
                </template>
            </el-table-column>
            <el-table-column
            prop="ispromotion"
            label="是否促销"
            align="center"
            width="100">
                <template v-slot:default="scope">
                    <el-switch
                    :v-model="scope.row.ispromotion"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    :disabled="true">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
            prop="promotionprice"
            label="促销价格"
            align="center"
            width="100">
                <template v-slot:default="scope">
                    <currency :value="scope.row.promotionprice" :line-through=!scope.row.ispromotion></currency>
                </template>
            </el-table-column>
            <el-table-column
            prop="issoldout"
            label="是否售罄"
            align="center"
            width="100">
                <template v-slot:default="scope">
                    <span v-if="scope.row.issoldout">
                        是
                    </span>
                    <span v-else>
                        否
                    </span>
                </template>
            </el-table-column>
            <el-table-column
            label="选项"
            align="center"
            width="400">
                <template v-slot:default="scope">
                    <el-button
                    @click.native.prevent="handleEditBtnClick(scope.$index, recipeList)"
                    type="text"
                    size="small">
                    edit
                    </el-button>
                    <el-button @click="handleDeleteBtnClick" type="text">delete</el-button>
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
    import Currency from '@/components/Currency.vue';
// import Currency from '../../components/Currency.vue';
    export default {
  components: { Currency },
    comments: {
        Currency
    },
    data() {
        return {
            recipeListHeader: [
                {
                    label: '分类名称',
                    prop: 'recipename',
                    width: 150,
                    image: []
                },
                {
                    label: '分类描述',
                    prop: 'recipedescription',
                    width: 200,
                    image: []
                },
                {
                    label: '分类',
                    prop: 'categoryname',
                    width: 120
                },
            ],
            recipeList: [
                
            ],
            tableData: []
        };
    },
    methods: {
        getRecipeList() {
            this.$http.get('/recipes/list').then(res => {
                // console.log(res.data);
                // console.log(res);
                if (res.code === 200) {

                    // 移除promotioninfo字段
                    res.data.forEach(item => {
                        item.ispromotion = item.promotioninfo.ispromotion;
                        item.promotionprice = item.promotioninfo.promotionprice;
                        delete item.promotioninfo;
                    });
                    this.recipeList = res.data;
                }
            }).catch(err => {
                console.log('无数据');
            })
        },
        handleEditBtnClick(index, list) {
            this.$router.push(`/recipe/edit/${list[index]._id}`);
        },
        handleDeleteBtnClick() {
            this.$confirm('将同时删除相关的所有评论，是否确认删除', '注意', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(`/recipe/delete/${list[index]._id}`).then(res => {
                    if (res.code === 200) {
                        this.$message.success('删除成功!');
                        this.getRecipeList();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }).catch(() => {
                
            });
        }
    },
    created() {
        this.getRecipeList();
        // console.log(this.recipeList);
    }
}
</script>

<style>
      /* 重写el-table-item的样式 */
  .cell {
        color: rgb(129, 129, 129) !important;
        font-size: 1.15em !important;
        font-weight: 600 !important;
    }
</style>