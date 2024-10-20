<template>
  <div>
    
    <el-table class="my-table" :data="state.data.list">
     
      <el-table-column prop="id" label="id" />
      <el-table-column prop="table" label="桌号" />
      <el-table-column prop="createTime" label="创建时间" />


      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" @click="handelView(scope.$index, scope.row)">
            详情
          </el-button>
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">
            改状态
          </el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    <el-dialog v-model="dialogVisible1" width="500" @close="clearData">

      <template #footer>
        <div class="dialog-footer">
         
          <el-button type="primary" @click="dialogVisible1=false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="js" setup>
import { reactive, ref } from 'vue';
import axios from '../../axios';
import { ElMessage } from 'element-plus';
let mode = '0'
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  
})
const state = reactive({
  data: {},
  curOrder: {}
})
const handleInput = (value) => {
  console.log('输入的值:', value);
  // 你可以在这里处理输入的内容

  form.password = "a" + value
}
const form = reactive({
  foodInfo: '',
  status: '',
  table: '',
  id: ''

})
const dialogVisible1 = ref(false)

const clearData = () => {
  form.foodInfo = ''
  form.status = ''
  form.table = 0
  form.id = ''
  mode = '0'
}



const getOrderList = () => {

  axios.get('order/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}

const saveOrUpdate = () => {
  if (mode == '0') {


    axios.post('order', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('新增成功')
      getOrderList()

    })
  } else {
    axios.put('order', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('修改成功')
      getOrderList()

    })
  }


}

const copyValue = (src, target) => {
  // 遍历 target 中的 key，并将 src 对应属性赋值给 target
  Object.keys(target).forEach((key) => {
    if (src[key] !== undefined) {
      target[key] = src[key] // 仅赋值存在于 src 中的属性
    }
  })
}
const handelView=(index,row)=>{

}

const handleEdit = (index, row) => {
  mode = '1'
  copyValue(row, form)
  dialogVisible1.value = true
}


const onPageChange = (page, size) => {
  queryParams.pageNum = page
  getOrderList()
}

getOrderList()

</script>

<style lang="css" scoped>
.header {
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

}

.btn-add {
  position: absolute;
  right: 20px;
}
</style>