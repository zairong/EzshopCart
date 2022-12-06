<template>
  <section class="main__button">

    <button class="main__button__next" @click.stop.prevent="changeNextStep">
      {{ currentStep === 3 || currentStep === 4 ? '確認下單' : '下一步' }}
      <span v-show="currentStep === 1 || currentStep === 2"></span>
    </button>

    <button class="main__button__previous" v-show="currentStep !== 1" @click.stop.prevent="changePreviousStep">
      <span></span>上一步
    </button>

  </section>
</template>

<script>
export default {
  props: {
    initialStep: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentStep: this.initialStep,
    }
  },
  watch: {
    initialStep: {
      handler(e) {
        console.log(e)
        this.currentStep = e
      },
      // deep: true
    }
  },
  methods: {
    changeNextStep() {

      if (this.currentStep === 4) return

      this.currentStep += 1
      this.$emit('emitStepChange', this.currentStep)
    },
    changePreviousStep() {
      this.currentStep -= 1
      this.$emit('emitStepChange', this.currentStep)
    }
  }
}
</script>