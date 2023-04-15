<template>
    <span v-on:dblclick="copy()" :class="lineThrough?'':'line-through'">{{ formattedValue }}</span>
</template>

<script>
import { throttle } from '../utils/utils';
export default {
    data() {
        return {
            // _value: this.$props.value,
            formattedValue: 0
        }
    },
    props: {
        // value 类型为字符或数字
        value: {
            type: [String, Number],
            required: true,
        },
        currency: {
            type: String,
            required: false,
            default: 'CNY',
        },
        lineThrough: {
            type: Boolean,
            required: false,
            default: false,
        },
        
    },
    methods: {
        copy: throttle(function () {
            //复制
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', this.formattedValue.split('¥')[1]);
            document.body.appendChild(input);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                // console.log('复制成功'+this.formattedValue.split('¥')[1]);
                this.$message('复制成功')
            }
            document.body.removeChild(input);
        }, 1500),
    },
    created() {
        this.formattedValue = new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: this.$props.currency,
        }).format(this.$props.value);
    },
   
}
</script>

<style>
    /* 为文字添加中划线 */
    .line-through {
        text-decoration: line-through;
    }
</style>