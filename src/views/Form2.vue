<template>
  <div class="app-container">
    <h1 class="app__title">結帳</h1>
    <main>
      <Stepper :currentStep="currentStep" />
      <section class="main__form">
        <form action="#" class="form__parts">

          <div class="part">
            <h2 class="part__title">運送方式</h2>
            <div class="part__wrapper shipment" id="shipping__method">
              <div v-for="shippingMethod in shippingMethods" :key="shippingMethod.id" :class="shippingMethod.name"
                class="form-row">
                <input type="radio" name="shipment" v-model="form.shippingFee" :value="shippingMethod.fee">
                <label>
                  <p class="text">{{ shippingMethod.text }}</p>
                  <p class="description">{{ shippingMethod.description }}</p>
                </label>
                <span>{{ shippingMethod.feeText }}</span>
              </div>

            </div>
          </div>

        </form>
      </section>
      <Cart :shippingFee="form.shippingFee" />
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

const dummyShippingMethod = [
  {
    id: 1,
    name: 'standard',
    text: '標準運送',
    description: '約 3~7 個工作天',
    feeText: '免費',
    fee: 0,
    checked: true //預設為選取
  },
  {
    id: 2,
    name: 'dhl',
    text: 'DHL 貨運',
    description: '48 小時內送達',
    feeText: '$500',
    fee: 500,
    checked: false
  }
]

export default {
  mixins: [formWatch],
  components: {
    Stepper,
    Buttons,
    Cart,
  },
  data() {
    return {
      currentStep: 2,
      shippingMethods: [],
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
    this.fetchShippingMethod()
  },
  methods: {
    handleStepChange(stepNum) {
      this.currentStep = stepNum
      if (this.currentStep === 3) {
        this.$router.push({ name: 'Form3' })
      } else if (this.currentStep === 1) {
        this.$router.push({ name: 'Form1' })
      }
    },
    fetchShippingMethod() {
      this.shippingMethods = dummyShippingMethod
    }
  },
}
</script>