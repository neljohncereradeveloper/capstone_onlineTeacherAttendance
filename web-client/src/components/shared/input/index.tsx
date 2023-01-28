import classNames from 'classnames';
import { useField } from 'formik';
import { KeyboardEventHandler, LegacyRef, SVGProps } from 'react';
import { PropsComponents } from '../types';

interface Props extends PropsComponents {
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
  disabled?: boolean;
  id: string;
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  hasIcon: boolean;
  icon?: 'left' | 'right';
  iconPath?: SVGProps<SVGPathElement>;
  search?: boolean;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
}
const Input: React.FC<Props> = ({
  inputRef,
  disabled = false,
  label,
  labelColor = 'gray',
  size = 'base',
  search = false,
  hasIcon,
  icon = 'right',
  iconPath,
  mr = 'none',
  ml = 'none',
  mt = 'none',
  mb = 'none',
  mx = 'none',
  my = 'none',
  onKeyPress,
  ...props
}) => {
  const [field, { error, touched }] = useField(props.name);
  return (
    <div
      className={classNames('block', {
        'mr-0': mr === 'none',
        'mr-2': mr === 'base',
        'mr-3': mr === 'sm',
        'mr-4': mr === 'lg',
        'mr-5': mr === 'xl',
        'ml-0': ml === 'none',
        'ml-2': ml === 'base',
        'ml-3': ml === 'sm',
        'ml-4': ml === 'lg',
        'ml-5': ml === 'xl',
        'mt-0': mt === 'none',
        'mt-2': mt === 'base',
        'mt-3': mt === 'sm',
        'mt-4': mt === 'lg',
        'mt-5': mt === 'xl',
        'mb-0': mb === 'none',
        'mb-2': mb === 'base',
        'mb-3': mb === 'sm',
        'mb-4': mb === 'lg',
        'mb-5': mb === 'xl',
        'mx-0': mx === 'none',
        'mx-2': mx === 'base',
        'mx-3': mx === 'sm',
        'mx-4': mx === 'lg',
        'mx-5': mx === 'xl',
        'my-0': my === 'none',
        'my-2': my === 'base',
        'my-3': my === 'sm',
        'my-4': my === 'lg',
        'my-5': my === 'xl',
      })}
    >
      <label
        className={classNames(
          {
            'text-xs': size === 'xs',
            'text-sm': size === 'sm',
            'text-base': size === 'base',
            'text-lg': size === 'lg',
            'text-xl': size === 'xl',
          },
          {
            'text-gray-400': labelColor === 'gray',
            'text-white': labelColor === 'base',
          }
        )}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      {/* No Icon Default */}
      {hasIcon === false && (
        <>
          <input
            ref={inputRef}
            disabled={disabled}
            className={classNames(
              'w-full placeholder-gray-300 text-gray-600 relative bg-white',
              'rounded',
              {
                'px-3 py-5': size === 'xl',
                'px-3 py-4': size === 'lg',
                'px-3 py-3': size === 'base',
                'px-3 py-2': size === 'sm',
                'px-2 py-1': size === 'xs',
              },
              {
                'border border-red-500': error && touched,
                'border border-green-400': !error && touched,
              }
            )}
            {...field}
            {...props}
          />

          {error && touched ? (
            <span className="text-red-500 text-sm mt-1">{error}</span>
          ) : null}
        </>
      )}
      {/* Has Icon Optional */}
      {hasIcon && (
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            ref={inputRef}
            disabled={disabled}
            className={classNames(
              'w-full relative',
              'rounded border border-gray-400',
              {
                'px-3 py-5': size === 'xl',
                'px-3 py-4': size === 'lg',
                'px-3 py-3': size === 'base',
                'px-3 py-2': size === 'sm',
                'px-2 py-1': size === 'xs',
              },
              {
                'border border-gray-400 border-opacity-0 bg-white placeholder-gray-300 text-gray-600':
                  !error && !search,
                'border border-blue-300 border-opacity-0 bg-gray-100 placeholder-gray-500 text-gray-700 focus:ring-white':
                  !error && search,
                'border border-red-400': error,
              },
              { 'pl-10': icon === 'left' }
            )}
            {...field}
            {...props}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classNames(
              'absolute z-10 w-10 h-full',
              'font-normal text-lg text-center items-center justify-center',
              'bg-transparent rounded py-4',
              {
                'text-gray-400': !search,
                'text-gray-500': search,
              },
              {
                'right-0 pr-3 leading-normal': icon === 'right',
                'left-0 pl-3 leading-snug': icon === 'left',
              }
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {iconPath}
          </svg>
        </div>
      )}
    </div>
  );
};

export default Input;
