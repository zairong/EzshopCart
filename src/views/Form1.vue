<template>
  <div class="app-container">
    <h1 class="app__title">結帳</h1>
    <main>

      <!-- Main Stepper -->
      <Stepper :currentStep="currentStep" />

      <section class="main__form">
        <form action="#" class="form__parts">
          <div class="part">
            <h2 class="part__title">寄送地址</h2>
            <div class="part__wrapper address">
              <div class="form-row title">
                <label for="">稱謂</label>
                <div class="select-wrapper">
                  <select name="" id="" v-model="form.salutation">
                    <option value="先生" selected>先生</option>
                    <option value="小姐">小姐</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
              <div class="form-row name">
                <label for="">姓名</label>
                <input type="text" placeholder="請輸入姓名" v-model="form.name">
              </div>
              <div class="form-row phone">
                <label for="">電話</label>
                <input type="text" placeholder="請輸入行動電話" v-model="form.phone">
              </div>
              <div class="form-row email">
                <label for="">Email</label>
                <input type="text" placeholder="請輸入電子郵件" v-model="form.email">
              </div>
              <div class="form-row city">
                <label for="">縣市</label>
                <div class="select-wrapper">
                  <select name="" id="" required v-model="form.city">
                    <option value="" disabled selected>請選擇縣市</option>
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="台中市">台中市</option>
                    <option value="嘉義縣">嘉義縣</option>
                  </select>
                </div>
              </div>
              <div class="form-row address">
                <label for="">地址</label>
                <input type="text" placeholder="請輸入地址" v-model="form.address">
              </div>
            </div>
          </div>

        </form>
      </section>

      <!-- Main Cart -->
      <Cart :shippingFee="form.shippingFee" />

      <!-- Main Button -->
      <Buttons :initialStep="currentStep" @emitStepChange="handleStepChange" />

    </main>
  </div>
</template>

<script>
import Stepper from '../components/Stepper.vue'
import Cart from '../components/Cart.vue'
import Buttons from '../components/Button.vue'
import { formWatch } from '../utils/mixins'

const STORAGE_KEY = 'form-info'

export default {
  mixins: [formWatch],
  components: {
    Stepper,
    Buttons,
    Cart,
  },
  data() {
    return {
      currentStep: 1,
      form: {
        salutation: '先生', //預設 選取先生
        name: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        shippingFee: 0, //預設 標準運送
        ccName: '',
        ccNumber: '',
        ccExpireDate: '',
        ccCvc: ''
      },
    }
  },
  created() {
    this.form = JSON.parse(localStorage.getItem(STORAGE_KEY)) || this.form
  },
  methods: {
    handleStepChange(stepNum) {
      this.currentStep = stepNum

      // 當 currentStep為 2時，更改到 Form2路由
      if (this.currentStep === 2) {
        this.$router.push({ name: 'Form2' })
      }
    }
  },
}
</script>