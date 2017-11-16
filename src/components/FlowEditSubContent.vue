<template>
  <div>
    <div v-for="item in subforms" :key="item.id">
      <template v-if="item.component === 'textarea'">
        <group>
          <x-textarea ref="item.id" :title="item.title"></x-textarea>
        </group>
      </template>
      <template v-else-if="item.component === 'checkbox' || item.component === 'radio'">
        <group :title="item.title">
          <checker default-item-class="checker-item" selected-item-class="checker-item-selected">
            <checker-item v-for="option in item.options" :key="option.value" :value="option.value">{{option.text}}
            </checker-item>
          </checker>
        </group>
      </template>

      <template v-else-if="item.component === 'text'">
        <group :title="item.title">
          <x-input :title="item.title"></x-input>
        </group>
      </template>
    </div>
  </div>
</template>

<script>
  import {Checker, CheckerItem, XInput, Group, XButton, XTextarea, Box} from 'vux'

  export default {
    name: 'FlowEditSubContent',
    props: {
      subforms: {
        type: Array,
        default() {
          return []
        }
      },
      flag: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        html: '',
        showCollapse: false,
        ifColl: (val) => {
          return !val
        }
      }
    },
    methods: {
      clickContent() {
        this.$emit('saveEditInfo')
      }
    },
    components: {
      Box,
      Checker,
      CheckerItem,
      XInput,
      XButton,
      Group,
      XTextarea
    }
  }
</script>
<style scoped lang="less">
  .checker-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    margin: 3px 5px;
  }

  .checker-item-selected {
    background: #ffffff url(/static/images/active.png) no-repeat right bottom;
    border: 1px solid @theme-color;
  }
</style>
