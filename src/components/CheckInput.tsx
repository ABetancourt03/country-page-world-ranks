import CheckboxDone from '../assets/Done_round.svg'

export default function CheckInput({ displayText }: { displayText: string }) {
  return (
    <div className='flex items-center w-full mt-2'>
      <div>
        <input
          className='w-6 h-6 border-2 cursor-pointer checked:bg-[#4E80EE] checked:border-[#4E80EE] rounded appearance-none'
          type='checkbox'
        />
        <img className='hidden' src={CheckboxDone} alt='done' />
      </div>
      <p className='ml-4 text-md'>{displayText}</p>
    </div>
  )
}
