import { useEffect, useState } from 'react'

import { type Country } from '../types.ts'
import { $ } from './utils'

import Hero from './components/Hero.tsx'
import CountriesTable from './components/CountriesTable.tsx'
import CheckInput from './components/CheckInput.tsx'
import SearchIcon from './assets/Search.svg'

export default function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  // const [excludedRegions, setExcludedRegions] = useState<string[]>([])

  useEffect(() => {
    async function getCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region')
        const data: Country[] = await res.json()
        setCountries(data)

        if (!filteredCountries || filteredCountries.length < 1) {
          setCountries(data)
        } else {
          setCountries(filteredCountries)
        }
      } catch (err) {
        console.error('Failed to fetch countries', err)
      }
    }

    getCountries().catch((err) => console.error(err))
  }, [filteredCountries])

  async function filterCountries() {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region')
      const data: Country[] = await res.json()

      const searchInput = (($('#searchCountriesInput') as HTMLInputElement)?.value ?? '').toLowerCase()
      const filteredData = data.filter((country) => country.name?.common?.toLowerCase()?.includes(searchInput))

      if (filteredData.length < 1) {
        setCountries([])
      } else {
        setFilteredCountries(filteredData)
      }
    } catch (err) {
      console.error('Failed to fetch countries', err)
    }
  }

  // useEffect(() => {
  //   async function excludeRegions(excludedRegions: string[]) {
  //     try {
  //       const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region')
  //       const data: Country[] = await res.json()

  //       const filteredData = data.filter((country) => !excludedRegions.includes(country.region))

  //       console.log(excludedRegions)

  //       if (filteredData.length < 1) {
  //         setCountries([])
  //       } else {
  //         setFilteredCountries(filteredData)
  //       }
  //     } catch (err) {
  //       console.error('Failed to fetch countries', err)
  //     }
  //   }

  //   excludeRegions(excludedRegions).catch((err) => console.error(err))
  // }, [excludedRegions])

  return (
    <section className='flex flex-col items-center w-full'>
      <Hero />

      <div className='absolute top-72 bg-[#1B1D1F] border-[#282B30] border-2 rounded-xl w-4/5 py-4 px-8'>
        <div className='flex justify-between w-full pb-10 pt-5'>
          <span className='text-[16px] font-medium'>Found {countries.length} countries</span>
          <div className='flex'>
            <img className='bg-[#282B30] p-2 rounded-l-xl' src={SearchIcon} alt='search' />
            <input
              id='searchCountriesInput'
              type='search'
              className='text-sm bg-[#282B30] w-72 p-2 rounded-r-xl focus:outline-none'
              placeholder='Search by Name, Region, Subregion'
              onChange={filterCountries}
            />
          </div>
        </div>

        <div className='flex'>
          <div className='w-90 mr-10'>
            <div>
              <p className='text-xs font-semibold'>Sort by</p>
              <div className='mt-2'>
                <select
                  id='sortBySelect'
                  className='w-full text-sm font-medium bg-[#1B1D1F] border-[#282B30] border-2 rounded-xl p-2 focus:outline-none'
                >
                  <option value='population'>Population</option>
                  <option value='area'>Area</option>
                </select>
              </div>
            </div>

            <div>
              <p className='text-xs font-semibold mt-10'>Region</p>
              <div className='space-x-3 space-y-3 mt-2'>
                <button
                  className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer'
                  type='button'
                >
                  Americas
                </button>
                <button
                  className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer'
                  type='button'
                >
                  Antarctica
                </button>
                <button
                  className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer'
                  type='button'
                >
                  Africa
                </button>
                <button
                  className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer'
                  type='button'
                >
                  Asia
                </button>
                <button
                  className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer'
                  type='button'
                >
                  Europe
                </button>
                <button
                  className='bg-[#282B30] font-medium text-sm px-3 py-2 rounded-xl hover:cursor-pointer'
                  type='button'
                >
                  Oceania
                </button>
              </div>

              <div>
                <p className='text-xs font-semibold mt-10'>Status</p>
                <div>
                  <CheckInput displayText='Member of the United Nations' />
                  <CheckInput displayText='Independent' />
                </div>
              </div>
            </div>
          </div>
          <CountriesTable countries={countries} />
        </div>
      </div>
    </section>
  )
}
