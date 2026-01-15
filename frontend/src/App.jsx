import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import LoginCandidate from './pages/candidate/LoginCandidate'
import RegisterCandidate from './pages/candidate/RegisterCandidate'
import RegisterEmployer from './pages/employer/RegisterEmployer'
import LoginEmployer from './pages/employer/LoginEmployer'
import SignInSignUp from './pages/auth/SignInSignUp'

import JobListing from './components/JobListing'
import CandidateHome from './pages/candidate/CandidateHome'
import SearchJobCandidate from './pages/candidate/search_job_candidate/SearchJobCandidate'
import JobDetail from './pages/candidate/job_detail/JobDetail'

import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'

import ChatBox from './components/chatbox/ChatBox'

import CandidateManager from './pages/candidate/CandidateManager'
import CandidateProfile from './pages/candidate/CandidateProfile'
import GeneralManagement from './components/candidate/general_management/GeneralManagement'
import AppliedJobs from './components/candidate/applied_jobs/AppliedJobs'
import ChangePassword from './components/candidate/change_password/ChangePassword'
import DeleteAccount from './components/candidate/delete_account/DeleteAccount'

const App = () => {
  const location = useLocation()

  const hiddenChatBotRoutes = [
    '/dang-nhap-ung-vien',
    '/dang-ky-ung-vien',
    '/dang-nhap-ntd',
    '/dang-ky-ntd',
    '/dang-nhap',
    '/dang-ky'
  ]

  const shouldHideChatBox = hiddenChatBotRoutes.some(path =>
    location.pathname.startsWith(path)
  )

  return (
    <>
      <Toaster reverseOrder={false} />

      <Routes>
        <Route path='/dang-nhap-ung-vien' element={<PublicRoute><LoginCandidate /></PublicRoute>} />
        <Route path='/dang-ky-ung-vien' element={<PublicRoute><RegisterCandidate /></PublicRoute>} />
        <Route path='/dang-nhap-ntd' element={<PublicRoute><LoginEmployer /></PublicRoute>} />
        <Route path='/dang-ky-ntd' element={<PublicRoute><RegisterEmployer /></PublicRoute>} />
        <Route path='/dang-nhap' element={<SignInSignUp />} />
        <Route path='/dang-ky' element={<SignInSignUp />} />

        <Route path='/' element={<CandidateHome />} />
        <Route path='/job' element={<JobListing />} />
        <Route path='/tim-viec-lam' element={<ProtectedRoute><SearchJobCandidate /></ProtectedRoute>} />
        <Route path='/get-job-detail/:idJob' element={<JobDetail />} />

        <Route path='/candidate' element={<CandidateManager />}>
          <Route path='general-management' element={<GeneralManagement />} />
          <Route path='job-application' element={<CandidateProfile />} />
          <Route path='cv' element={<CandidateProfile />} />
          <Route path='upload-file' element={<CandidateProfile />} />
          <Route path='saved-jobs' element={<CandidateProfile />} />
          <Route path='applied-jobs' element={<AppliedJobs />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='delete-account' element={<DeleteAccount />} />
        </Route>
      </Routes>

      {!shouldHideChatBox && <ChatBox />}
    </>
  )
}

export default App
