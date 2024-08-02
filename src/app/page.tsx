import Filters from './Filters'
import Results from './Results'
import mockData from '../util/flight-data.json'
export default function Home() {
  return (
    <main className='flex flex-col lg:grid lg:grid-cols-12 mt-5 pt-4'>
      <div className='col-span-2'>
        <Filters />
      </div>
      <div className='col-span-10 px-4'>
        <Results data={mockData} />
      </div>
    </main>
  )
}
