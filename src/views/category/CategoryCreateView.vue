<template>
    <div>
        <div style="margin: 20px;"></div>
        <el-form class="el-form" :label-position="labelPosition" label-width="80px" :model="categoryModel">
            <el-form-item label="分类名称：">
                <el-input style="width: 200px" v-model="categoryModel.categoryname"></el-input>
            </el-form-item>
            <el-form-item label="分类描述：">
                <el-input
                style="width: 500px"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="categoryModel.categorydescription">
                </el-input>
            </el-form-item>
            <el-form-item label="图标：">
                <el-upload action="#" 
                list-type="picture-card" 
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" 
                :auto-upload="false" :on-change="handleChange" 
                :class="objClass"
                :file-list="fileList" :limit="3">
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
                labelPosition: 'top',
                categoryModel: {
                    categoryname: '',
                    categorydescription: '',
                    icon: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
				fileList: [],
				objClass: {
					upLoadShow: true,
					upLoadHide: false,
				},
            };
        },
        methods: {
            handleChange(file) {
                // 判断是否为.png或.svg格式
                if (file.raw.type !== 'image/png' && file.raw.type !== 'image/svg+xml') {
                    this.$message.error('请上传png或svg格式的图片');
                    this.fileList.pop();
                    return;
                }

                this.categoryModel.icon = file.raw;
				this.objClass.upLoadHide = true;//上传图片后置upLoadHide为真，隐藏上传框
				this.objClass.upLoadShow = false;
			},
            handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
            handleRemove(file) {
                this.categoryModel.icon = '';
				this.objClass.upLoadShow = true;//删除图片后显示上传框
				this.objClass.upLoadHide = false;
			},
            // 验证数据
            validateData() {
                if (this.categoryModel.categoryname === '') {
                    this.$message.error('请输入分类名称');
                    return false;
                }
                if (this.categoryModel.categorydescription === '') {
                    this.$message.error('请输入分类描述');
                    return false;
                }
                if (this.categoryModel.icon === '') {
                    this.$message.error('请上传分类图标');
                    return false;
                }
                return true;
            },
            handleCreateBtnClick() {
                if (this.validateData()) {
                    const formData = new FormData();
                    formData.append('file', this.categoryModel.icon);
                    formData.append('categoryname', this.categoryModel.categoryname);
                    formData.append('categorydescription', this.categoryModel.categorydescription);
                this.$http.post('/category/create', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        if (response.code === 200) {
                            console.log(response);
                            this.$message.success('新建成功');
                            setTimeout(() => {
                                // 刷新页面
                                window.location.reload();
                            }, 1000);
                            // this.$router.push('/category');
                        } else {
                            this.$message.error(response.data.message);
                        }
                    });

                    // this.$http.post('/category/create', this.categoryModel).then((response) => {
                    //     if (response.code === 200) {
                    //         this.$message.success('新建成功');
                    //         // this.$router.push('/category');
                    //     } else {
                    //         this.$message.error(response.data.message);
                    //     }
                    // });
                }
                
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
		width: 5rem !important;
		height: 5rem !important;
		line-height: 5rem !important;
	}

        /*当upLoadHide为true时，启用如下样式，即缩略图的样式，若为false则不启用该样式*/
	.upLoadHide .el-upload-list--picture-card .el-upload-list__item {
		width: 5rem !important;
		height: 5rem !important;
		line-height: 5rem !important;
	}
        /*当upLoadHide为true时，启用如下样式，即上传框的样式，若为false则不启用该样式*/
	.upLoadHide .el-upload {
		display: none;
	}
</style>