import clsx from 'clsx'
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import Checkbox from './checkbox'
import {FormControl, FormLabel, styles, StylesProvider} from './form-control'
import {Input} from './input'

const interestedIn = [
  'Site from scratch',
  'Frontend development',
  'HTML/CSS coding',
]

function FeedbackForm() {
  const {t} = useTranslation('feedback')

  return (
    <form>
      <StylesProvider value={styles}>
        <div className={styles.form?.container}>
          <h1 className={clsx('block text-left', styles.label)}>
            I'm interested in...
          </h1>
          {interestedIn.map(title => (
            <Checkbox key={title} title={title} rootClassName="mr-4" />
          ))}
        </div>
        <FormControl id="email">
          <FormLabel>{t('form.email')}</FormLabel>
          <Input name="email" type="email" />
        </FormControl>
      </StylesProvider>
    </form>
  )
}

export {FeedbackForm}
