import React from 'react'
import Header from '../../components/candidate/header/Header'
import SearchJobBar from '../../components/candidate/search_job_bar/SearchJobBar'
import JobList from '../../components/candidate/job_list/JobList'
import JobListing from '../../components/JobListing'

const SearchJobCandidate = () => {
  return (
    <>
      <Header />
      <SearchJobBar />
      <JobListing />
      <JobList />
    </>
  )
}

export default SearchJobCandidate