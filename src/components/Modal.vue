<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2>確認下單</h2>
          </div>
          <div class="modal-body">
            <h5>
              <p>稱謂：{{ form.salutation }} </p>
              <p>姓名：{{ form.name }} </p>
              <p>電話：{{ form.phone }} </p>
              <p>Email：{{ form.email }} </p>
              <p>縣市：{{ form.city }} </p>
              <p>地址：{{ form.address }} </p>
              <p>持卡人姓名：{{ form.ccName }} </p>
              <p>卡號：{{ form.ccNumber }} </p>
              <p>有效期限：{{ form.ccExpireDate }} </p>
              <p>CVC / CCV：{{ form.ccCvc }} </p>

              <br>

              <p v-for="product in products" :key="product.id">
                {{ product.name }}：{{ product.count }} 件
              </p>
              <p v-if="form.length === 0">運費：0 </p>
              <p v-else>運費：{{ form.shippingFee | formatNumber }} </p>
              <p>總金額：{{ totalAmount | formatNumber }} </p>
            </h5>
          </div>
          <button class="modal-default-button" v-on:click="$emit('confirmOrder')">確認</button>
          <button class="modal-default-button mr-4" v-on:click="$emit('cancelOrder')">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { formatNumberFilters } from '../utils/mixins.js'
const STORAGE_KEY1 = 'form-info'
const STORAGE_KEY2 = 'cart-info'

export default {
  mixins: [formatNumberFilters],
  props: {
    totalAmount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {},
      products: []
    }
  },
  mounted() {
    this.form = JSON.parse(localStorage.getItem(STORAGE_KEY1)) || []
    this.products = JSON.parse(localStorage.getItem(STORAGE_KEY2))
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/BasicSetting.scss';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .4s ease;
}

button {
  border: none;
  background: $button-bg;
  color: #fff;
  border-radius: 8px;
  color: $button-color;
  // padding: 10px;
  padding: 11px 39.5px 11px 38.5px;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 40px 80px 40px;
  min-height: 35px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .2s ease;

  .modal-header h2 {
    padding: 14px 0;
    border-bottom: 1px solid var(--form-border-active);
  }

  .modal-body {
    padding: 10px 0 20px 0;

    h5 {
      font-size: 18px;
      line-height: 30px;
    }
  }
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
</style>