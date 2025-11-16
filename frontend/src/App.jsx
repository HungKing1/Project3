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
import { Toaster } from 'react-hot-toast'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  return (
    <>
      {/* Toaster nên để ngoài Routes để luôn hoạt động */}
      <Toaster
        reverseOrder={false}     // giữ thứ tự bình thường
      />

      <Routes>
        <Route path='/dang-nhap-ung-vien' element={<PublicRoute><LoginCandidate /></PublicRoute>}/>
        <Route path='/dang-ky-ung-vien' element={<PublicRoute><RegisterCandidate /></PublicRoute>}/>
        <Route path='/dang-nhap-ntd' element={<PublicRoute><LoginEmployer /></PublicRoute>}/>
        <Route path='/dang-ky-ntd' element={<PublicRoute><RegisterEmployer /></PublicRoute>}/>
        <Route path='/dang-nhap' element={<SignInSignUp />}/>
        <Route path='/dang-ky' element={<SignInSignUp />}/>
        <Route path='/' element={<CandidateHome />}/>
        <Route path='/job' element={<JobListing />}/>
        <Route path='/tim-viec-lam' element={<ProtectedRoute><SearchJobCandidate /></ProtectedRoute>}/>
        <Route path='/get-job-detail/:idJob' element={<JobDetail />}/>
      </Routes> 
    </>
  )
}

export default App