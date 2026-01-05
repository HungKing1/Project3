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
import ChatBox from './components/chatbox/ChatBox'
import Sidebar from './components/candidate/side_bar/Sidebar'
import DesiredJob from './components/candidate/candidate_profile/desired_job/DesiredJob'
import CareerObjective from './components/candidate/candidate_profile/career_objective.jsx/CareerObjective'
import PersonalSkill from './components/candidate/candidate_profile/personal_skill/PersonalSkill'
// import LanguageCertificate from './components/candidate/candidate_profile/languague_certificate/LanguageCertificate'
import WorkExperience from './components/candidate/candidate_profile/work_experience/WorkExperience'
import CandidateDegree from './components/candidate/candidate_profile/degree/CandidateDegree'
import CandidateProfile from './pages/candidate/CandidateProfile'
import CandidateManager from './pages/candidate/CandidateManager'
import GeneralManagement from './components/candidate/general_management/GeneralManagement'
import AppliedJobs from './components/candidate/applied_jobs/AppliedJobs'
import ChangePassword from './components/candidate/change_password/ChangePassword'
import DeleteAccount from './components/candidate/delete_account/DeleteAccount'

const App = () => {
  return (
    <>
      <Toaster
        reverseOrder={false}    
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
      <ChatBox />
    </>
  )
}

export default App