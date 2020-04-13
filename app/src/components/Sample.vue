<template>
  <div class="sample-vue">
    <fieldset>
      <legend>Sample Vue component (monofile / clientside)</legend>
      <p>{{sampleValue }}</p>
      <input type="text" v-model="sampleValue">
    </fieldset>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleValue: 'Change me !'
    }
  }
}
</script>

<style lang="scss" scoped>
.sample-vue {
  input {
    color: $titleColor;
  }
}
</style>