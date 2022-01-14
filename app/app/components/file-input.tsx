import * as React from 'react'
import svgsprites from '../../public/svgsprites.svg'
import {useId} from '@chakra-ui/hooks'

function FileInput(props: React.ComponentPropsWithoutRef<'input'>) {
  const id = useId()

  return (
    <div className="relative cursor-pointer inline">
      <input
        id={id}
        type="file"
        className="opacity-0 overflow-hidden w-[0.1px] h-[0.1px] absolute z-[-1]"
        {...props}
      />
      <label
        className="relative block h-auto m-0 p-0 z-[2] color-inherit bg-[0 0] border-0 outline-0 tracking-tight no-underline transition-opacity duration-300 cursor-pointer font-semibold text-2xl"
        style={{
          WebkitAppearance: 'button',
          textAlign: 'inherit',
          textTransform: 'inherit',
          textIndent: 'inherit',
          textDecoration: 'none',
        }}
        htmlFor={id}
      >
        <svg className="inline-block w-4 h-4 fill-current align-middle mr-8 text-lg leading-[0] transition-transform duration-300">
          <use xlinkHref={`${svgsprites}#attachment`} />
        </svg>
        <span
          className="relative inline-block align-middle"
          style={{
            content: '""',
            display: 'block',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-0.25rem',
            height: '1px',
            transform: 'scaleX(0)',
            transformOrigin: 'right center',
            background: 'currentColor',
            transition:
              'transform .7s cubic-bezier(.19,1,.22,1),transition-orign 0s',
          }}
        >
          Добавить прикрепление
        </span>
      </label>
    </div>
  )
}

export default FileInput
