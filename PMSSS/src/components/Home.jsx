import React from 'react'
import { FaMale, FaFemale, FaUsers } from 'react-icons/fa';
import { useState , useEffect } from 'react';
import Footer from './Footer';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { FaCircleInfo } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { GrHelpBook } from "react-icons/gr";


const Home = () => {

    const neviget = useNavigate();
    const hendelbnev = () =>{
        neviget('/student')
    }
const arr = [img1, img2, img3, img4, img5, img6, img7, img8, img9];


    const [countBoys, setCountBoys] = useState(0);
    const [countGirls, setCountGirls] = useState(0);
    const [countTotal, setCountTotal] = useState(0);
  
    useEffect(() => {
      const incrementBoys = setInterval(() => {
        setCountBoys((prev) => (prev < 2500 ? prev + 4 : 2500));
      }, 1);
  
      const incrementGirls = setInterval(() => {
        setCountGirls((prev) => (prev < 3000 ? prev + 4 : 3000));
      }, 1);
  
      const incrementTotal = setInterval(() => {
        setCountTotal((prev) => (prev < 5500 ? prev + 4 : 5500));
      }, 1);
  
      return () => {
        clearInterval(incrementBoys);
        clearInterval(incrementGirls);
        clearInterval(incrementTotal); 
      };
    }, []);
   

  return (
    <>
    <div className='bg-gray-700 text-white sm:flex sm:justify-between flex justify-center'>
        <a href='https://www.india.gov.in/' className='hidden sm:block'>Government of India</a><p className='font-bold '><span className='font-thin '> DEPARTMENT OF </span>Ex-servicemen Welfare</p><a href='https://www.mod.gov.in/' className='hidden sm:block'>Ministry of Defence</a>
    </div>
    <Header/>
    <div className='hidden sm:flex h-[2.6rem] bg-gray-500 justify-end content-center'>
        <FaCircleInfo className='h-[1.8rem] w-[1.6rem] mr-[0.8rem] mt-[0.4rem]'/>
        <GrHelpBook className='h-[1.8rem] w-[1.6rem] mr-[0.8rem] mt-[0.4rem]'/> 
        <button
            onClick={hendelbnev}
        className='flex pr-2 pl-2 text-lg font-bold mr-[0.8rem] pt-[0.2rem] border border-black border-2 hover:text-gray-300 hover:bg-black rounded'>Login<CiLogin className='block h-[1.8rem] w-[1.5rem]  mt-[0.15rem] text-bold'/></button>
    </div>
    <div className='pr-[10%] pl-[10%] mt-[1%] mb-[2%]'>
        <h2 className='font-bold  text-xl pb-[1%]'>PM Scholarship Scheme (PMSS)</h2>
        <h2 className='font-bold  pb-[0.8%]'>Prime Minister’s Scholarship Scheme (PMSS)</h2>
        <p className='font-bold pb-[0.8%]'>Introduction :</p>
        <p className='pb-[1.5%]'>The Prime Minister's Scholarship Scheme (PMSS) was introduced in the academic year 2006-07 by the Department of Ex-Servicemen Welfare, Ministry of Defence, to encourage higher technical and professional education among the dependent wards and widows of Ex-Servicemen (ESM) and Ex-Coast Guard personnel.</p>
        <p className='pb-[1.5%]'>The <span className='font-bold'>‘Prime Minister’s Scholarship Scheme (PMSS)’</span> ’ is being implemented to encourage technical and post-graduate education for the widows and wards of the deceased/ex-service personnel of Armed Forces. The scheme is funded out of National Defence Fund administered by Prime Minister’s Office. Scholarships are available for education at various technical institutions (medical, dental, veterinary, engineering, MBA, MCA and other equivalent technical institutions having AICTE/UGC approval).</p>
        <p className='pb-[1.5%]'>The Scheme was introduced in 2006.<span className='font-bold'> Five thousand five hundred (5500) scholarships are being awarded annually under this scheme </span>. The amount of scholarships was Rs.2,000/- for boys and Rs.2,250/- for the girls per month and is paid annually. <span> This has now been increased to Rs.2,500/- per month for boys and Rs.3,000/- per month for girls w.e.f. FY 2019-20</span>. The payment is made through ECS into the bank account of the selected students. The scheme migrated from offline to online mode with effect from Academic Year 2016-17.</p>
    </div>
    <div className="flex justify-center mt-10 flex-wrap">
        <div className="text-center rounded-full shadow-md shadow-black  h-[12rem] sm:h-60 w-[12rem] sm:w-60 pt-8 m-[1rem]">
          <FaMale className=" h-20 w-20 mx-auto text-gray-700" />
          <p className="text-gray-700 text-3xl font-bold">{countBoys}+</p>
          <p className="text-gray-700 text-lg font-semibold">Boys</p>
        </div>
        <div className="text-center rounded-full shadow-md shadow-black  h-[12rem] sm:h-60 w-[12rem] sm:w-60 pt-8 m-[1rem] mb-[2rem]">
          <FaFemale className="h-20 w-20 mx-auto text-gray-700" />
          <p className="text-gray-700 text-3xl font-bold">{countGirls}+</p>
          <p className="text-gray-700  text-lg font-semibold">Girls</p>
        </div>
        <div className="text-center rounded-full shadow-md shadow-black  h-[12rem] w-[12rem] sm:h-60 sm:w-60 pt-8 m-[1rem] mb-[2rem]">
          <FaUsers className="h-20 w-20 mx-auto text-gray-700" />
          <p className="text-gray-700 text-3xl font-bold ">{countTotal}+</p>
          <p className="text-gray-700 text-lg font-semibold">Total</p>
        </div>
      </div>
      <div className='py-4 justify-between flex px-10 bg-slate-50 flex-wrap'>
      {
        arr.map((element,i)=>(
          <img src={element} alt=""  className='h-[6%] w-[8%] cursor-pointer rounded-full' key={i}/>
        ))
      }

    </div>
      <Footer/>
    </>
  )
}

export default Home