<template>
  <section class="main__cart">
    <h4 class="cart__title">購物籃</h4>
    <div class="cart__products">

      <div class="product d-flex" data-id="1" v-for="product in products" :key="product.id">
        <img :src="product.image" class="product__photo">
        <div class="product__info">
          <div class="product__info__name">{{ product.name }}</div>
          <div class="product__info__count d-flex justify-content-between align-items-center">
            <div class="count__icon minus" @click.stop.prevent="minusCount(product)"></div>
            <span class="count__number count">{{ product.count }}</span>
            <div class="count__icon plus" @click.stop.prevent="plusCount(product)"></div>
          </div>
          <div class="product__info__price price_1">{{ product.price | formatNumber }}</div>
        </div>
      </div>

    </div>
    <div class="cart__total justify-content-between">
      <span class="cart__subtitle">運費</span>
      <span class="amount freight__amount">{{ shippingFee === 0 ? '免費' : '$500' }}</span>
    </div>
    <div class="cart__total justify-content-between">
      <span class="cart__subtitle">小計</span>
      <span class="amount total__amount">{{ calTotalAmount | formatNumber }}</span>
    </div>
  </section>
</template>

<script>
import { formatNumberFilters } from '../utils/mixins.js'

const STORAGE_KEY = 'cart-info'
const dummyProducts = [
  {
    id: 1,
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    image: 'https://i.postimg.cc/YCKWsfqN/Photo-2x-product1.png',
    count: 1
  },
  {
    id: 2,
    name: '刷色直筒牛仔褲',
    price: 1299,
    image: 'https://i.postimg.cc/0y00GHdK/Photo-2x-product2.png',
    count: 1
  }
]

export default {
  mixins: [formatNumberFilters],
  props: {
    shippingFee: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      products: [],
    }
  },
  created() {
    this.products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || dummyProducts
  },
  methods: {
    minusCount(product) {
      if (product.count === 0) {
        return
      }
      product.count -= 1
    },
    plusCount(product) {
      product.count += 1
    }
  },
  computed: {
    calTotalAmount() {

      let totalAmount = this.shippingFee
      for (const product of this.products) {
        totalAmount += product.count * product.price
      }
      this.$emit('emitTotalAmount', totalAmount)
      return totalAmount
    }
  },
  watch: {
    products: {
      handler() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
      },
      deep: true
    }
  }
}
</script>