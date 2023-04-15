<template>
    <div>
        <div style="margin: 20px;"></div>
        <el-form class="el-form" :label-position="labelPosition" label-width="100px" :model="recipeModel">
            <el-form-item label="菜单名称：">
                <el-input style="width: 200px" v-model="recipeModel.recipename"></el-input>
            </el-form-item>
            <el-form-item label="菜单简介：">
                <el-input
                style="width: 500px"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="recipeModel.recipedescription">
                </el-input>
            </el-form-item>
            <el-form-item label="菜单价格：">
                <el-input style="width: 150px" v-model="recipeModel.price"></el-input>
            </el-form-item>
            <el-form-item label="菜单分类：">
                <el-select v-model="recipeModel.categoryname" placeholder="请选择">
                    <el-option
                    v-for="item in categoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否售罄：">
                <el-switch
                v-model="recipeModel.issoldout"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="是否促销：">
                <el-switch
                v-model="recipeModel.ispromotion"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item v-if="recipeModel.ispromotion" label="促销价格：">
                <el-input style="width: 150px" v-model="recipeModel.promotionprice"></el-input>
            </el-form-item>
            <el-form-item label="图片上传：">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                list-type="picture">
                    <el-button size="small" type="primary" :disabled="fileList.length>3">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button @click="handleUpdateBtnClick" type="primary">更新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'left',
                recipeModel: {
                    recipename: '',
                    recipedescription: '',
                    price: '',
                    categoryname: '',
                    ispromotion: false,
                    promotionprice: '',
                    issoldout: false,
                    image: []
                },
                recipeModel_old: {},
                fileList: [],   
                fileList_old: [],
                categoryList: [
                    {
                        value: '热菜',
                        label: '热菜'
                    },
                    {
                        value: '凉菜',
                        label: '凉菜'
                    },
                    {
                        value: '汤',
                        label: '汤'
                    },
                    {
                        value: '饮料',
                        label: '饮料'
                    },
                    {
                        value: '甜品',
                        label: '甜品'
                    },
                    {
                        value: '其他',
                        label: '其他'
                    }
                ]
            };
        },
        methods: {
            handleChange(file, fileList) {
                if (fileList.length > 3) {
                    this.$message.error('最多上传3张图片');
                    fileList.splice(3, 1);
                    return false;
                } else {
                    this.fileList = fileList;
                }
			},
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.fileList = fileList;
            },
            handlePreview(file) {
                console.log(file);
            },
            // 校验数据
            validateData() {
                if (this.recipeModel.recipename === '') {
                    this.$message.error('菜单名称不能为空');
                    return false;
                }
                if (this.recipeModel.recipedescription === '') {
                    this.$message.error('菜单简介不能为空');
                    return false;
                }
                if (this.recipeModel.price === '') {
                    this.$message.error('菜单价格不能为空');
                    return false;
                }
                if (this.recipeModel.categoryname === '') {
                    this.$message.error('菜单分类不能为空');
                    return false;
                }
                if (this.recipeModel.ispromotion === true) {
                    if (this.recipeModel.promotionprice === '') {
                        this.$message.error('促销价格不能为空');
                        return false;
                    }
                }
                if (this.recipeModel.image.length === 0) {
                    this.$message.error('请上传图片');
                    return false;
                }
                return true;
            },
            handleUpdateBtnClick() {
                console.log(this.recipeModel);
                if (this.validateData()) {
                    this.$confirm('确认更新吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const formData = new FormData();
                        formData.append('recipename', this.recipeModel.recipename);
                        formData.append('recipedescription', this.recipeModel.recipedescription);
                        formData.append('price', this.recipeModel.price);
                        formData.append('categoryname', this.recipeModel.categoryname);
                        formData.append('ispromotion', this.recipeModel.ispromotion);
                        formData.append('promotionprice', this.recipeModel.promotionprice);
                        formData.append('issoldout', this.recipeModel.issoldout);
                        for (let i = 0;i < this.fileList_old.length; i++) {
                            formData.append('images_old_name', this.fileList_old[i].name);
                        }
                        for (let i = 0; i < this.recipeModel.image.length; i++) {
                            formData.append('images', this.recipeModel.image[i].raw);
                        }
                        // this.$http.post(`/recipes/update/${this.$route.params.id}`, formData).then(
                        //     (response) => {
                        //         if (response.code === 200) {
                        //             this.$message.success('更新成功');
                        //             this.$router.push('/recipe');
                        //         } else {
                        //             this.$message.error(response.msg);
                        //         }
                        //     },
                        //     (response) => {
                        //         this.$message.error('网络错误');
                        //     }
                        // );
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消更新'
                        });
                    });
                }
            }
        },
        created() {
            // this.$http.get('/category/get').then(
            //     (response) => {
            //         if (response.code === 200) {
            //             // console.log(response.data);
            //             this.categoryList = response.data.map((item) => {
            //                 return {
            //                     value: item.categoryname,
            //                     label: item.categoryname
            //                 };
            //             })
            //         } else {
            //             this.categoryList = [];
            //             this.$message.error(response.msg);
            //         }
            //     },
            //     (response) => {
            //         this.$message.error('网络错误');
            //     }
            // );
            if (this.$route.params.id) {
                this.$http.get('/recipes/get/' + this.$route.params.id).then(
                    (response) => {
                        console.log(response.data);
                        if (response.code === 200) {
                            const data = response.data;
                            data.ispromotion = data.promotioninfo.ispromotion;
                            data.promotionprice = data.promotioninfo.promotionprice;
                            delete data.promotioninfo;
                            console.log(data);
                            this.recipeModel = data;
                            this.fileList = data.image.map((item) => {
                                return {
                                    name: item.split('uploads/')[1],
                                    path: item
                                };
                            });
                            this.fileList_old = this.fileList;
                        } else {
                            this.$message.error(response.msg);
                        }
                    },
                    (response) => {
                        this.$message.error('网络错误');
                    }
                );
            }
        }
    }
</script>

<style>
    /* .el-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    } */
        /*当upLoadShow为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
	.upLoadShow .el-upload {
		width:8rem !important;
		height: 8rem !important;
		line-height: 8rem !important;
	}

        /*当upLoadHide为true时，启用如下样式，即缩略图的样式，若为false则不启用该样式*/
	.upLoadShow .el-upload-list--picture-card .el-upload-list__item {
		width: 8rem !important;
		height: 8rem !important;
		line-height: 8rem !important;
	}
        /*当upLoadHide为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
	.upLoadHide .el-upload {
		display: none;
	}
</style>