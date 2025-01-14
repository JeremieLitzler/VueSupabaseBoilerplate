import { type App } from 'vue'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, url, min } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import { en } from '@/i18n/vee-validate-en'
import { fr } from '@/i18n/vee-validate-fr'

interface UniqueRuleArgs {
  prop: string
  excluding: string
}

const veeValidatePlugin = {
  install(app: App) {
    defineRule('required', required)
    defineRule('email', email)
    defineRule('url', url)
    defineRule('min', min)
    defineRule('unique', async <T, A>(value: T, args: A) => {
      throw new Error('Not implemented')
    })

    configure({
      generateMessage: localize({
        // use `setLocale('fr');` to change the validation messages
        // see https://vee-validate.logaretm.com/v4/guide/i18n/
        en,
        fr,
      }),
    })

    app.component('VeeForm', Form)
    app.component('VeeField', Field)
    app.component('VeeErrorMessage', ErrorMessage)
  },
}

export default veeValidatePlugin
