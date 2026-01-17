export default function FilterButton({ displayText }: { displayText: string }) {
  return (
    <button className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer' type='button'>
      {displayText}
    </button>
  )
}
