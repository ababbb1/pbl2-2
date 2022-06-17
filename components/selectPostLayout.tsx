import { UseFormRegisterReturn } from 'react-hook-form'
import { LayoutType } from '../libs/types'

export default function SelectPostLayout({
  register,
  setLayoutState,
}: {
  register: UseFormRegisterReturn<'layout'>
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutType>>
}) {
  return (
    <div className='flex flex-col w-full gap-2 items-center'>
      <span>레이아웃 선택</span>
      <ul className='flex justify-center gap-6'>
        <li>
          <input type='radio' id='default' value='default' className='peer hidden' {...register} />
          <label
            onClick={() => {
              setLayoutState('default')
            }}
            htmlFor='default'
            className='flex flex-col w-10 h-10 bg-gray-200 rounded-sm shadow-md mx-1 hover:cursor-pointer peer-checked:w-14 peer-checked:h-14 peer-checked:bg-gray-300 peer-checked:ring ring-theme1'
          >
            <div className='h-2/5 flex flex-col justify-around pt-1 px-1.5'>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
            </div>
            <div className='flex justify-center h-3/5 items-center p-1'>
              <div className='w-full h-full rounded-sm bg-white'></div>
            </div>
          </label>
        </li>

        <li>
          <input type='radio' id='left' value='left' className='peer hidden' {...register} />
          <label
            onClick={() => {
              setLayoutState('left')
            }}
            htmlFor='left'
            className='flex w-12 h-10 bg-gray-200 rounded-sm shadow-md hover:cursor-pointer peer-checked:w-16 peer-checked:h-14 peer-checked:bg-gray-300 peer-checked:ring ring-theme1'
          >
            <div className='flex justify-center w-3/5 items-center p-1'>
              <div className='w-full h-full rounded-sm bg-white'></div>
            </div>
            <div className='w-2/5 flex flex-col justify-around pr-1 py-1'>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
            </div>
          </label>
        </li>

        <li>
          <input type='radio' id='right' value='right' className='peer hidden' {...register} />
          <label
            onClick={() => {
              setLayoutState('right')
            }}
            htmlFor='right'
            className='flex w-12 h-10 bg-gray-200 rounded-sm shadow-md hover:cursor-pointer peer-checked:w-16 peer-checked:h-14 peer-checked:bg-gray-300 peer-checked:ring ring-theme1'
          >
            <div className='w-2/5 flex flex-col justify-around pl-1 py-1'>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
              <div className='h-[0.125rem] bg-gray-500 rounded-full'></div>
            </div>
            <div className='flex justify-center w-3/5 items-center p-1'>
              <div className='w-full h-full rounded-sm bg-white'></div>
            </div>
          </label>
        </li>
      </ul>
    </div>
  )
}
