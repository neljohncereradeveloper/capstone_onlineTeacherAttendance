import classnames from 'classnames';
import { SVGProps } from 'react';
import Spinners from '../spinners';
import { PropsComponents } from '../types';

interface Props extends PropsComponents {
  fullWidth?: boolean;
  text: string;
  icon: 'left' | 'right';
  iconPath: SVGProps<SVGPathElement>;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  fullWidth = false,
  text,
  icon,
  iconPath,
  disabled,
  isLoading,
  onClick,
  size = 'base',
  backGroundColor = 'blue',
  textColor = 'base',
  mr = 'none',
  ml = 'none',
  mt = 'none',
  mb = 'none',
  mx = 'none',
  my = 'none',
  ...props
}) => {
  return (
    <button
      className={classnames(
        // base class
        'inline-flex items-center justify-center px-4 py-1.5',
        'border border-transparent rounded shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        // full width
        fullWidth ? 'w-full' : 'w-36',
        // font size
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'base',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        },
        // height
        {
          'h-9': size === 'xs',
          'h-10': size === 'sm',
          'h-11': size === 'base',
          'h-14': size === 'lg',
          'h-16': size === 'xl',
        },
        // if disable cursor not allowed
        {
          'disabled:opacity-50 cursor-not-allowed': disabled === true,
        },
        // disable true or false background color
        disabled
          ? 'bg-gray-400 text-gray-300'
          : {
              'bg-blue-500': backGroundColor === 'blue',
              'bg-red-500': backGroundColor === 'red',
              'bg-green-500': backGroundColor === 'green',
              'bg-yellow-500': backGroundColor === 'yellow',
              'bg-gray-500': backGroundColor === 'gray',
              'text-white': textColor === 'base',
            },
        // disable true or false backgroundcolor hover
        disabled
          ? ''
          : {
              'hover:bg-blue-700': backGroundColor === 'blue',
              'hover:bg-red-700': backGroundColor === 'red',
              'hover:bg-green-700': backGroundColor === 'green',
              'hover:bg-yellow-700': backGroundColor === 'yellow',
              'hover:bg-gray-700': backGroundColor === 'gray',
            },
        // focus ring background color
        {
          'focus:ring-blue-500': backGroundColor === 'blue',
          'focus:ring-red-500': backGroundColor === 'red',
          'focus:ring-green-500': backGroundColor === 'green',
          'focus:ring-yellow-500': backGroundColor === 'yellow',
          'focus:ring-gray-500': backGroundColor === 'gray',
        },
        // margins
        {
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
        }
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {icon === 'left' && (
        <>
          {isLoading ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classnames(
                  {
                    'h-4': size === 'xs',
                    'h-5': size === 'sm',
                    'h-6': size === 'base',
                    'h-7': size === 'lg',
                    'h-8': size === 'xl',
                  },
                  {
                    'w-4': size === 'xs',
                    'w-5': size === 'sm',
                    'w-6': size === 'base',
                    'w-7': size === 'lg',
                    'w-8': size === 'xl',
                  },
                  'text-white mr-2'
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {iconPath}
              </svg>
            </>
          )}

          {text}
        </>
      )}
      {icon === 'right' && (
        <>
          {text}
          {isLoading ? (
            <>
              <Spinners />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classnames(
                  {
                    'h-4': size === 'xs',
                    'h-5': size === 'sm',
                    'h-6': size === 'base',
                    'h-7': size === 'lg',
                    'h-8': size === 'xl',
                  },
                  {
                    'w-4': size === 'xs',
                    'w-5': size === 'sm',
                    'w-6': size === 'base',
                    'w-7': size === 'lg',
                    'w-8': size === 'xl',
                  },
                  'text-white ml-2'
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {iconPath}
              </svg>
            </>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
