import HeroImage from '../assets/hero-image.jpg'
import Logo from '../assets/Logo.svg'

export default function Hero() {
  return (
    <header className='w-full  flex items-center justify-center'>
      <img className='absolute' src={Logo} alt='Logo' />
      <img className='w-full' src={HeroImage} alt='Hero' />
    </header>
  )
}
