<template>
  <div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getFoodList">
      <van-cell v-for="item in state.data" :key="item">
        <!-- 左侧图片 -->
        <template #icon>
          <van-image width="80px" height="80px" fit="cover" :src="item.url" />
        </template>

        <!-- 中间菜品名称和单价 -->
        <template #title>
          <div class="dish-info">
            <div class="dish-name">{{ item.name }}</div>
            <div class="dish-price">￥{{ item.price }}</div>
          </div>
        </template>

        <!-- 右侧加减按钮和数字 -->
        <template #right-icon>
          <div class="counter">
            <van-button plain type="primary" @click="decrement(item)" :disabled="item.quantity <= 0"
              size="small">-</van-button>
            <span>{{ item.quantity }}</span>
            <van-button plain type="primary" @click="increment(item)" size="small">+</van-button>
          </div>
        </template>

      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { setUser } from '../utils/auth'
import axios from '../axios'
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10000,

})

const state = reactive({
  data: []
});
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const getInfo = () => {

  axios.get('user/info').then(res => {
    const user = res
    console.log(user)
    setUser(user)

  })
}


const getFoodList = () => {

  axios.get('food/list', { params: queryParams }).then(res => {

    // for (let i = 0; i < res.list.length; i++) {
    //   state.data.push(res.list[i])
    // }
    state.data = res.list.map(item => {
      return {
        ...item,
        quantity: 0
      }
    })

    loading.value = false;

    if (state.data.length >= res.total) {
      finished.value = true
    }
    console.log(state.data)

  })

}

function increment(item) {
  item.quantity++;
}
function decrement(item) {
  if (item.quantity > 0) {
    item.quantity--;
  }
}

getFoodList()
getInfo()

</script>

<style lang="css" scoped>
.van-image{
margin: 10px;
}
.dish-info {
  display: flex;
  flex-direction: column;
}

.dish-name {
  font-size: 16px;
  font-weight: bold;
}

.dish-price {
  font-size: 14px;
  color: #999;
}

.counter {
  display: flex;
  align-items: center;
}

.counter span {
  margin: 0 10px;
  font-size: 16px;
}
</style>