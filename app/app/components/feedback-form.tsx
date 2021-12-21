import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel, styles, StylesProvider } from './form-control';
import { Input } from './input';

function FeedbackForm() {
  const {t} = useTranslation('feedback')

  return (
    <form>
      <StylesProvider value={styles}>
      <FormControl id="email">
<FormLabel>{t('form.email')}</FormLabel>
<Input name="email" type="email" />
        </FormControl>
        </StylesProvider>
    </form>
  )
}

export {FeedbackForm}