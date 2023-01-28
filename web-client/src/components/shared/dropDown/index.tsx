import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';

interface Props {
  label: string;
  data: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const DropDown: React.FC<Props> = ({ label, data, state, setState }) => {
  return (
    <Listbox as="div" className="mb-4 w-full" value={state} onChange={setState}>
      {({ open }) => (
        <>
          <Listbox.Label className="text-gray-400 text-base mb-2">
            {label}
          </Listbox.Label>
          <div className="relative bg-white px-3 py-2 rounded border border-gray-600">
            <span className="inline-block w-full">
              <Listbox.Button
                className={classNames(
                  'relative rounded text-gray-300 py-1',
                  'pl-3 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
                )}
              >
                <span className="block truncate">{state}</span>
              </Listbox.Button>
            </span>
            <Transition show={open}>
              <Listbox.Options
                static
                className="bg-gray-200 border border-gray-300 rounded mt-1"
              >
                {data?.map((dt) => (
                  <Listbox.Option key={dt} value={dt}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-blue-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-10 pr-4`}
                      >
                        <span
                          className={`${
                            selected ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          {dt}
                        </span>

                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-blue-600'
                            } absolute inset-y-0 left-0 flex items-center pl-2`}
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default DropDown;
