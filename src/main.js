import Vue from 'vue';
import App from './App.vue';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import 'viewerjs/dist/viewer.css'
import Viewer from "v-viewer"

Vue.use(ViewUI);
Vue.use(Viewer);

import router from "./router"

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
