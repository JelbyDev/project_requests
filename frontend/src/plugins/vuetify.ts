// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          headerBg: '#fff',
          footerBg: '#545454',
          info: '#2196f3',
          error: '#b00020',
          success: '#4caf50',
        },
      },
    },
  },
});
