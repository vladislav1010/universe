import clsx from 'clsx'
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import Checkbox from './checkbox'
import {FormControl, FormLabel, styles, StylesProvider} from './form-control'
import {Input, Textarea} from './input'

const interestedIn = [
  'Site from scratch',
  'Frontend development',
  'HTML/CSS coding',
]

function FeedbackForm() {
  const {t} = useTranslation('feedback')

  const [value, setValue] = React.useState('')

  return (
    <form className="flex flex-col space-y-4">
      <StylesProvider value={styles}>
        <div className={styles.form?.container}>
          <h1 className={clsx('block text-left', styles.label)}>
            {t('form.interestedIn')}
          </h1>
          {interestedIn.map(title => (
            <Checkbox key={title} title={title} rootClassName="mr-4" />
          ))}
        </div>
        <FormControl id="name">
          <FormLabel>{t('form.name')}</FormLabel>
          <Input name="name" type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>{t('form.email')}</FormLabel>
          <Input name="email" type="email" />
        </FormControl>
        <FormControl id="aboutProject">
          <FormLabel>{t('form.aboutProject')}</FormLabel>
          <Textarea
            name="aboutProject"
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
        </FormControl>
      </StylesProvider>
    </form>
  )
}

export {FeedbackForm}
