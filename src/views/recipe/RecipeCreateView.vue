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
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :auto-upload="false"
                :class="objClass"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item>
                <el-button @click="handleCreateBtnClick" type="primary">确认新建</el-button>
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
                dialogImageUrl: '',
                dialogVisible: false,
				objClass: {
					upLoadShow: true,
					upLoadHide: false,
				},
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
                if (fileList.length >= 3) {
                    this.$message.error('最多上传3张图片');
                    this.objClass.upLoadHide = true;//上传图片后置upLoadHide为真，隐藏上传框
                    return false;
                } else {
                    this.recipeModel.image = fileList;
                }
			},
            handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
            handleRemove(file, fileList) {
                this.recipeModel.image = fileList;
                this.objClass.upLoadHide = false;
                this.objClass.upLoadShow = true;
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
            handleCreateBtnClick() {
                console.log(this.recipeModel);
                if (this.validateData()) {
                    const formData = new FormData();
                    formData.append('recipename', this.recipeModel.recipename);
                    formData.append('recipedescription', this.recipeModel.recipedescription);
                    formData.append('price', this.recipeModel.price);
                    formData.append('categoryname', this.recipeModel.categoryname);
                    formData.append('ispromotion', this.recipeModel.ispromotion);
                    formData.append('promotionprice', this.recipeModel.promotionprice);
                    formData.append('issoldout', this.recipeModel.issoldout);
                    for (let i = 0; i < this.recipeModel.image.length; i++) {
                        formData.append('images', this.recipeModel.image[i].raw);
                    }
                    this.$http.post('/recipes/create', formData).then(
                        (response) => {
                            if (response.code === 200) {
                                this.$message.success('新建成功');
                                this.$router.push('/recipe');
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
        },
        mounted() {
            this.$http.get('/category/list').then(
                (response) => {
                    if (response.code === 200) {
                        // console.log(response.data);
                        this.categoryList = response.data.map((item) => {
                            return {
                                value: item.categoryname,
                                label: item.categoryname
                            };
                        })
                    } else {
                        this.categoryList = [];
                        this.$message.error(response.msg);
                    }
                },
                (response) => {
                    this.$message.error('网络错误');
                }
            );
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