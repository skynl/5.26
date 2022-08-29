<template>
    <button 
    class="gyj-button"
    :class="[`gyj-button-${type}`,{'is-plain':plain},{'is-round':round}]"
    >
        <span>
            <slot></slot>
        </span>
    </button>
</template>
<script>

    export default {
        name : 'GYJButton',
        // 接收props
        props : {
            type: {
                type: String,
            default : 'default'
            },
            plain:{
                type:Boolean,
                // default : ''
            },
            round:{
                type:Boolean,
            }
        }
    }
</script>

<style lang="less">
    // 风格样式
    .gyj-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: nwj;
        text-align: center;
        box-sizing: border-box;
        outline: nwj;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        //禁止元素的文字被选中
        -moz-user-select: nwj;
        -webkit-user-select: nwj;
        -moz-user-select: nwj;
        -ms-user-select: nwj;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        &:hover,
        &:focus {
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
    }
    .gyj-button-primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        &:hover,
        &:focus {
            background: #66b1ff;
            background-color: #66b1ff;
            color: #fff;
        }
        &:active{
          background-color: #409eff;
    }
    }
    .gyj-button-success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    &:hover,
    &:focus {
    background: #85ce61;
    background-color: #85ce61;
    color: #fff;
    }
    &:active{
    background-color: #67c23a;
    }
    }
    .gyj-button-info {
        color: #fff;
        background-color: #909399;
        border-color: #909399;
        &:hover,
        &:focus {
            background: #a6a9ad;
            background-color: #909399;
            color: #fff;
        }
        &:active{
            background-color: #a6a9ad;
        }
    }
    .gyj-button-warning {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;
        &:hover,
        &:focus {
            background: #ebb563;
            background-color: #ebb563;
            color: #fff;
        }
        &:active{
            background-color: #e6a23c;
        }
        }
    .gyj-button-danger {
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;
        &:hover,
        &:focus {
        background: #f78989;
        background-color: #f78989;
        color: #fff;
 }
 &:active{
 background-color: #f56c6c;
 }
    }



    // 朴素按钮样式
    .gyj-button.is-plain{
    &:hover,
    &:focus{
    background: #fff;
    border-color: #489eff;
    color: #409eff;
    }
    }
    .gyj-button-primary.is-plain{
        color: #409eff;
        background: #ecf5ff;
        &:hover,
        &:focus{
            background: #409eff;
            border-color: #409eff;
            color: #fff;
        }
    }
    .gyj-button-success.is-plain{
        color: #67c23a;
        background: #c2e7b0;
        &:hover,
        &:focus{
            background: #67c23a;
            border-color: #67c23a;
            color: #fff;
        }
    }
    .gyj-button-info.is-plain{
        color: #909399;
        background: #d3d4d6;
        &:hover,
        &:focus{
        background: #909399;
        border-color: #909399;
        color: #fff;
        }
    }
    .gyj-button-warning.is-plain{
        color: #e6a23c;
        background: #f5dab1;
        &:hover,
        &:focus{
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
        }
    }
    .gyj-button-danger.is-plain{
        color: #f56c6c;
        background: #fbc4c4;
        &:hover,
        &:focus{
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
        }
    }

    // round圆角样式
    .gyj-button.is-round{
        border-radius: 20px;
        padding: 12px 23px;
    }
    // circle圆角样式

    .gyj-button.is-circle{
        border-radius: 50%;
        padding: 12px;
    }
</style>