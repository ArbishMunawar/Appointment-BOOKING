import React from 'react'
import HeaderSection from '../sections/HeaderSection'
import SpecialityMenuSection from '../sections/SpecialityMenuSection'
import TopDoctors from '../sections/TopDoctors'
import Banner from '../sections/Banner'

const HomePage = () => {
  return (
    <div>
      <HeaderSection/>
      <SpecialityMenuSection/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default HomePage