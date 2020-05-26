import '@sass/style.scss'
// necessary for dynamic imports
import '@js/polyfills'

import Vue from 'vue'
import Sample from 'components/Sample.vue'

new Vuse({
  render: createComponent => createComponent(Sample),
}).$mount('#vue-sample')
