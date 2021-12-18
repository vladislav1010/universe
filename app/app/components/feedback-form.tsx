import * as React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx'


function Label(props: React.ComponentPropsWithoutRef<'label'>) {
  const {
    className,
    ...rest
  } = props

  return (
    <label className={clsx(className, 'block text-left mb-2 text-base font-medium opacity-100 disabled:opacity-40')} {...rest} />
  )
}

function Input(props: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input />
  )
}

function FeedbackForm() {
  const {t} = useTranslation('feedback')

  return (
    <form>
      <div>
        <Label htmlFor='topic'>{t('topic.label')}</Label>
        <Input />
      </div>
    </form>
  )
}

export {FeedbackForm}