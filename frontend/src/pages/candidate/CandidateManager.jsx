import React from 'react'
import s from './CandidateManager.module.scss'
import Sidebar from '../../components/candidate/side_bar/Sidebar'
import Header from '../../components/candidate/candidate_profile/header/Header'
import { Outlet } from 'react-router-dom'

const CandidateManager = ({ children }) => {
    return (
        <>
            <div className={s.container}>
                <Sidebar />
                <div className={s.content}>
                    <Header />
                    <div className={s.children_content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CandidateManager