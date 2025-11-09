import React from 'react'
import LoginCandidate from './pages/candidate/LoginCandidate'
import RegisterCandidate from './pages/candidate/RegisterCandidate'
import { Route, Routes } from 'react-router-dom'
import RegisterEmployer from './pages/employer/RegisterEmployer'
import LoginEmployer from './pages/employer/LoginEmployer'
import SignInSignUp from './pages/auth/SignInSignUp'
import JobListing from './components/JobListing'
import CandidateHome from './pages/candidate/CandidateHome'
import SearchJobCandidate from './pages/candidate/search_job_candidate/SearchJobCandidate'
import JobDetail from './pages/candidate/job_detail/JobDetail'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/dang-nhap-ung-vien' element={<LoginCandidate />}/>
        <Route path='/dang-ky-ung-vien' element={<RegisterCandidate />}/>
        <Route path='/dang-nhap-ntd' element={<LoginEmployer />}/>
        <Route path='/dang-ky-ntd' element={<RegisterEmployer />}/>
        <Route path='/dang-nhap' element={<SignInSignUp />}/>
        <Route path='/dang-ky' element={<SignInSignUp />}/>
        <Route path='/' element={<CandidateHome />}/>
        <Route path='/job' element={<JobListing />}/>
        <Route path='/tim-viec-lam' element={<SearchJobCandidate />}/>
        <Route path='/nhan-vien-kinh-doanh-viec-lam-mau-12345' element={<JobDetail />}/>
      </Routes> 
    </>
  )
}

export default App