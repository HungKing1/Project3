import React, { useContext, useState } from 'react'
import s from './header_manage.module.scss'
import { Switch } from 'antd'
import NotificationCenter from '../../header/notification/NotificationCenter'

//nên nằm ngoài 
const Header = () => {
    const [preventFirstRender, setPreventFirstRender] = useState(true)
    const [showNotiPc, setShowNotiPc] = useState(false)
    const [candiAllowSearch, setCandiAllowSearch] = useState('1'); 

    const toggleNotiPc = () => {
        setShowNotiPc(!showNotiPc)
    }

    const onChange = (check) => {
        if (check) {
            fetchSwitchAllowSearch(1)
        } else {
            fetchSwitchAllowSearch(0)
        }
    };

    const fetchSwitchAllowSearch = async (value) => {
       console.log("Switched to:", value);
       setCandiAllowSearch(String(value));
    }

    return (
        <div className={s.heaeder_manage}>
            <div className={s.heaeder_left}>
                <p>{"Hiện thị hồ sơ của tôi"}</p>
                <Switch checked={candiAllowSearch == '1' ? true : false} onChange={(check) => onChange(check)} />
            </div>
            <div className={s.heaeder_right}>
                <a href="/">Tìm việc làm</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" viewBox="0 0 27 32" fill="none" className={s.notif} onClick={toggleNotiPc}>
                    <path d="M10.2513 28.5208H16.0846C16.0846 30.125 14.7721 31.4375 13.168 31.4375C11.5638 31.4375 10.2513 30.125 10.2513 28.5208ZM26.293 25.6042V27.0625H0.0429688V25.6042L2.95964 22.6875V13.9375C2.95964 9.41667 5.8763 5.47917 10.2513 4.16667V3.72917C10.2513 2.125 11.5638 0.8125 13.168 0.8125C14.7721 0.8125 16.0846 2.125 16.0846 3.72917V4.16667C20.4596 5.47917 23.3763 9.41667 23.3763 13.9375V22.6875L26.293 25.6042ZM20.4596 13.9375C20.4596 9.85417 17.2513 6.64583 13.168 6.64583C9.08464 6.64583 5.8763 9.85417 5.8763 13.9375V24.1458H20.4596V13.9375Z" fill="#333333" />
                </svg>
                <button className={s.logout} onClick={() => {
                    window.location.href = "/"
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9596 24.7917C11.9596 24.4049 11.806 24.034 11.5325 23.7605C11.259 23.487 10.8881 23.3333 10.5013 23.3333H3.20964V2.91667H10.5013C10.8881 2.91667 11.259 2.76302 11.5325 2.48953C11.806 2.21604 11.9596 1.84511 11.9596 1.45833C11.9596 1.07156 11.806 0.700626 11.5325 0.427136C11.259 0.153645 10.8881 0 10.5013 0H3.20964C2.43609 0 1.69422 0.307291 1.14724 0.854272C0.600259 1.40125 0.292969 2.14312 0.292969 2.91667V23.3333C0.292969 24.1069 0.600259 24.8487 1.14724 25.3957C1.69422 25.9427 2.43609 26.25 3.20964 26.25H10.5013C10.8881 26.25 11.259 26.0964 11.5325 25.8229C11.806 25.5494 11.9596 25.1784 11.9596 24.7917Z" fill="white" />
                        <path d="M27.5855 14.1459C27.8523 13.8747 28.002 13.5098 28.0026 13.1294V13.1206C28.0018 12.7353 27.8482 12.3661 27.5753 12.094L21.742 6.26064C21.6075 6.12136 21.4465 6.01026 21.2686 5.93383C21.0907 5.8574 20.8993 5.81717 20.7057 5.81548C20.5121 5.8138 20.32 5.8507 20.1408 5.92403C19.9616 5.99735 19.7987 6.10564 19.6618 6.24257C19.5249 6.37949 19.4166 6.54232 19.3433 6.72154C19.27 6.90077 19.2331 7.0928 19.2347 7.28644C19.2364 7.48007 19.2767 7.67143 19.3531 7.84936C19.4295 8.02728 19.5406 8.1882 19.6799 8.32272L23.0239 11.6667H9.04427C8.6575 11.6667 8.28656 11.8203 8.01307 12.0938C7.73958 12.3673 7.58594 12.7382 7.58594 13.125C7.58594 13.5118 7.73958 13.8827 8.01307 14.1562C8.28656 14.4297 8.6575 14.5834 9.04427 14.5834H23.0239L19.6799 17.9273C19.4142 18.2024 19.2673 18.5707 19.2706 18.9531C19.2739 19.3355 19.4273 19.7012 19.6977 19.9716C19.968 20.242 20.3338 20.3954 20.7162 20.3987C21.0986 20.402 21.4669 20.255 21.742 19.9894L27.5753 14.1561L27.5855 14.1459Z" fill="white" />
                    </svg>
                    Đăng xuất
                </button>
                {showNotiPc && <div><NotificationCenter /></div>}
            </div>
        </div>
    )
}

export default Header