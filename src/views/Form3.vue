<template>
  <div class="app-container">
    <h1 class="app__title">結帳</h1>
    <main>
      <Stepper :currentStep="currentStep" />
      <section class="main__form">
        <form action="#" class="form__parts">

          <div class="part">
            <h2 class="part__title">付款資訊</h2>
            <div class="part__wrapper payment">
              <div class="form-row cardname">
                <label for="">持卡人姓名</label>
                <input type="text" placeholder="ZAI RONG" v-model="form.ccName">
              </div>
              <div class="form-row cardnumber">
                <label for="">卡號</label>
                <input type="text" placeholder="55688" v-model="form.ccNumber">
              </div>
              <div class="form-row cardexpire">
                <label for="">有效期限</label>
                <input type="text" placeholder="MM/YY" v-model="form.ccExpireDate">
              </div>
              <div class="form-row cardcvc">
                <label for="">CVC / CCV</label>
                <input type="text" placeholder="123" v-model="form.ccCvc">
              </div>
            </div>
          </div>

        </form>
      </section>
      <Cart :shippingFee="form.shippingFee" @emitTotalAmount="handleTotalAmount" />
      <Buttons :initialStep="currentStep" @emitStepChange="handleStepChange" />
      <Modal v-if="currentStep === 4" :totalAmount="totalAmount" @confirmOrder="handleConfirmOrder"
        @cancelOrder="handleCancelOrder" />
    </main>
  </div>
</template>

<script>
import Stepper from '../components/Stepper.vue'
import Cart from '../components/Cart.vue'
import Buttons from '../components/Button.vue'
import Modal from '../components/Modal.vue'
import { formWatch } from '../utils/mixins'

const STORAGE_KEY = 'form-info'

export default {
  mixins: [formWatch],
  components: {
    Stepper,
    Buttons,
    Cart,
    Modal
  },
  data() {
    return {
      currentStep: 3,
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
      totalAmount: ''
    }
  },
  created() {
    this.form = JSON.parse(localStorage.getItem(STORAGE_KEY)) || this.form
  },
  methods: {
    handleStepChange(stepNum) {
      this.currentStep = stepNum
      if (this.currentStep === 2) {
        this.$router.push({ name: 'Form2' })
      }
    },
    handleTotalAmount(amount) {
      this.totalAmount = amount
    },
    handleConfirmOrder() {
      this.currentStep = 3

      // 目前路由已經在 Form3了，不能再設定相同路由，主控台會跳出路由重複的錯誤訊息
      // this.$router.push({ name: 'Form3' }) 
    },
    handleCancelOrder() {

      // 這裡不用再設定，因為 currentStep在每個 view是獨立的 data，跳到 Form1，currentStep就會以 Form1的 data為主
      // this.currentStep = 1

      localStorage.clear()
      this.$router.push({ name: 'Form1' })
    }
  },
}
</script>