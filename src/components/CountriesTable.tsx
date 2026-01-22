import { type Country } from '../../types.ts'

import TableHead from './TableHead'

export default function CountriesTable({ countries }: { countries: Country[] }) {
  return (
    <table className='w-full h-max'>
      <thead className='border-b-[#282B30] border-b-2 w-full'>
        <tr>
          <TableHead displayText='Flag' />
          <TableHead displayText='Country' />
          <TableHead displayText='Population' />
          <TableHead displayText='Area (km²)' />
          <TableHead displayText='Region' />
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country?.name?.common}>
            <td>
              <img src={country?.flags?.png} alt={country?.flags?.alt} className='my-4 w-12 rounded' />
            </td>
            <td>
              <a href={`/country/${country?.name?.common}`}>{country?.name?.common}</a>
            </td>
            <td>{country?.population?.toLocaleString()}</td>
            <td>{country?.area?.toLocaleString()}</td>
            <td>{country?.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
