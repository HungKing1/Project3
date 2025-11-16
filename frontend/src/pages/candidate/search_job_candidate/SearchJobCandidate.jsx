import React, { useEffect, useState } from 'react'
import Header from '../../../components/candidate/header/Header'
import JobListSearch from '../../../components/candidate/job_list/JobListSearch'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { data } from 'jquery';
import { set } from 'react-hook-form';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchJobCandidate = () => {

  const [searchParam] = useSearchParams()

  const city = searchParam.get('city')
  const exp = searchParam.get('exp')
  const salary = searchParam.get('salary')
  const job_level = searchParam.get('job_level')
  const work_type = searchParam.get('work_type')
  const district = searchParam.get('district')
  const industry = searchParam.get('industry')
  const [pageSize, setPageSize] = useState(7)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [totalJob, setTotalJob] = useState(0);
  const [jobCardList, setJobCardList] = useState([])

  const searchJob = async () => {
    try {
      const params = {
        city,
        exp,
        salary,
        job_level,
        work_type,
        district,
        industry,
        page,
        pageSize
      }
      const {data} = await axios.get(`${API_BASE_URL}/public/search-jobs`, {
        params: params,
        withCredentials: true
      })
      if(data.success) {
        setJobCardList(data.data.content)
        setTotalPage(data.data.page.totalPages)
        setTotalJob(data.data.page.totalElements)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    searchJob()
  }, [searchParam, page])

  return (
    <>
      <Header />
      <JobListSearch jobCardList={jobCardList} setPage={setPage} page={page} totalPage={totalPage} totalJob={totalJob}/>
    </>
  )
}

export default SearchJobCandidate