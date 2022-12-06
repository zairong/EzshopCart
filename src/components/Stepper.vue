<template>
  <section class="main__stepper">
    <div class="step"
      :class="[{ active: currentStep === 1 }, { checked: currentStep === 2 || currentStep === 3 || currentStep === 4 }]">
      <div class="step__circle"></div>
      <div class="step__label">寄送地址</div>
      <div class="step__line"></div>
    </div>
    <div class="step" :class="[{ active: currentStep === 2 }, { checked: currentStep === 3 || currentStep === 4 }]">
      <div class="step__circle"></div>
      <div class="step__label">運送方式</div>
      <div class="step__line"></div>
    </div>
    <div class="step" :class="[{ active: currentStep === 3 }, { checked: currentStep === 4 }]">
      <div class="step__circle"></div>
      <div class="step__label">付款條件</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true
    }
  }
}
</script>