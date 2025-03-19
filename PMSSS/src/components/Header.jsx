import React from 'react'
import Astambh from '/pngegg.png'
import Navlogo from './Navlogo'




const Header = () => {
    
  return (
    <>
    <div className='flex justify-center border-b-[0.2rem] shadow-md pb-[0.3rem] sm:pb-[0.6rem] pt-[0.2rem] sm:pt-[0.4rem]'>
        <div className='h-[3rem] w-[15%] sm:w-[10%] flex justify-center sm:h-[5rem] '>
            <img src={Astambh} alt="Image" className='h-[3rem] sm:h-[5rem] ' />
        </div>
        <div className='w-[50%] sm:w-[60%] content-center'>
            <h1 className='text-lg sm:text-4xl font-bold'>PMSS</h1>
            <div>
                <p className='text-[0.6rem] sm:text-lg'>Academic Year 2025-2026</p>
            </div>
        </div>
        <div className="w-[10%] flex justify-center mt-[1.1rem] sm:mt-[1.9rem]">
              <Navlogo className='h-[1rem] sm:hidden '/>
        </div>
        <div className='flex justify-center  mt-[0.8rem] sm:mt-[1.1rem] '>
             <img src="https://desw.gov.in/sites/all/themes/cmf/images/G20_logo.jpg" alt="G20" className='h-[1.5rem] sm:h-[3rem]'></img>
             <img src="https://desw.gov.in/sites/all/themes/cmf/images/swach-bharat.png" alt="Swach Bharat" className='h-[1.5rem] sm:h-[3rem]'></img>
        </div>
    </div>
    </>
  )
}

export default Header