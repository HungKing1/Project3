/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import 'select2';
import Banner from '../banner/Banner';
import JobListing from '../JobListing';
import '../../../public/styles/home.css';
// import News_box from './News_box';
// import ViecLamLuongCao from './ViecLamLuongCao';

// --- Giả lập (Stub) các hàm functions ---
const createLinkTilte2 = (title) => {
    // Giả lập hàm, chuyển "Kinh Doanh" -> "kinh-doanh"
    if (!title) return "";
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const getJobName = (id) => {
    // Giả lập hàm
    const jobs = {
        9: 'Kinh doanh',
        13: 'IT phần mềm',
        2: 'Hành chính văn phòng',
        14: 'Marketing',
        33: 'Bất động sản',
        27: 'Nhân sự',
        66: 'Bảo hiểm',
        10: 'Bán hàng',
    };
    return jobs[id] || 'Ngành Nghề Mẫu';
};

const isExperiment = () => false; // Giả lập A/B test
const linkPageCv = () => "/mau-cv-xin-viec"; // Giả lập link
const checkLogin = (type) => false; // Giả lập là chưa đăng nhập

// --- Dữ liệu mẫu (Mock Data) ---
const mockData = {
    // Dữ liệu cho "Việc làm hấp dẫn"
    ViecLamHapDan: [
        { new_id: 1, new_title: 'Việc Làm Hấp Dẫn 1', new_alias: 'viec-lam-hap-dan-1', new_money: 15000000, new_city: '1', new_han_nop: Date.now() + 100000000, new_cat_id: [9], usc_logo: '/images/company-logo-mock.png', usc_company: 'Công Ty Mẫu A' },
        { new_id: 2, new_title: 'Việc Làm Hấp Dẫn 2', new_alias: 'viec-lam-hap-dan-2', new_money: 20000000, new_city: '2', new_han_nop: Date.now() + 200000000, new_cat_id: [13], usc_logo: '/images/company-logo-mock.png', usc_company: 'Công Ty Mẫu B' },
        { new_id: 3, new_title: 'Việc Làm Hấp Dẫn 3', new_alias: 'viec-lam-hap-dan-3', new_money: 10000000, new_city: '45', new_han_nop: Date.now() + 300000000, new_cat_id: [10], usc_logo: '/images/company-logo-mock.png', usc_company: 'Công Ty Mẫu C' },
    ],
    // Dữ liệu cho "Việc làm lương cao"
    ViecLamThuongHieu: [
        { new_id: 101, new_title: 'Việc Làm Lương Cao 1', new_alias: 'viec-lam-luong-cao-1', new_money: 30000000, new_city: '1', new_han_nop: Date.now() + 100000000, new_cat_id: [14], usc_logo: '/images/company-logo-mock.png', usc_company: 'Tập Đoàn Mẫu X' },
        { new_id: 102, new_title: 'Việc Làm Lương Cao 2', new_alias: 'viec-lam-luong-cao-2', new_money: 50000000, new_city: '2', new_han_nop: Date.now() + 200000000, new_cat_id: [33], usc_logo: '/images/company-logo-mock.png', usc_company: 'Tập Đoàn Mẫu Y' },
    ],
    // Dữ liệu cho "Ngành nghề nổi bật"
    nganhNgheNoiBat: [
        { _id: 9, count: 1200 },
        { _id: 13, count: 950 },
        { _id: 2, count: 800 },
        { _id: 14, count: 750 },
        { _id: 33, count: 600 },
        { _id: 27, count: 550 },
        { _id: 66, count: 300 },
        { _id: 10, count: 1100 },
    ],
    // Dữ liệu cho "Tin tức"
    tinTucNoiBat: [
        { new_id: 201, new_title: 'Tin Tức Nổi Bật 1', new_alias: 'tin-tuc-1', new_picture: '/images/news-mock-1.jpg', new_des: 'Mô tả ngắn cho tin tức số 1...' },
        { new_id: 202, new_title: 'Tin Tức Nổi Bật 2', new_alias: 'tin-tuc-2', new_picture: '/images/news-mock-2.jpg', new_des: 'Mô tả ngắn cho tin tức số 2...' },
        { new_id: 203, new_title: 'Tin Tức Nổi Bật 3', new_alias: 'tin-tuc-3', new_picture: '/images/news-mock-3.jpg', new_des: 'Mô tả ngắn cho tin tức số 3...' },
        { new_id: 204, new_title: 'Tin Tức Nổi Bật 4', new_alias: 'tin-tuc-4', new_picture: '/images/news-mock-4.jpg', new_des: 'Mô tả ngắn cho tin tức số 4...' },
        { new_id: 205, new_title: 'Tin Tức Nổi Bật 5', new_alias: 'tin-tuc-5', new_picture: '/images/news-mock-1.jpg', new_des: 'Mô tả ngắn cho tin tức số 5...' },
        { new_id: 206, new_title: 'Tin Tức Nổi Bật 6', new_alias: 'tin-tuc-6', new_picture: '/images/news-mock-2.jpg', new_des: 'Mô tả ngắn cho tin tức số 6...' },
    ]
};
// --- Kết thúc Dữ liệu mẫu ---


const Body = () => {
    // Sử dụng dữ liệu mẫu (mockData) thay vì props
    const [viecLamHapDan, setViecLamHapDan] = useState(mockData.ViecLamHapDan);
    const [viecLamLuongCao, setViecLamLuongCao] = useState(mockData.ViecLamThuongHieu);
    const [rdTinTucNoiBat, SetRdTinTucNoiBat] = useState([]);
    const [pageTintuc, setPageTinTuc] = useState(0);
    
    const nganhNgheNoiBat = mockData.nganhNgheNoiBat;
    const tinTucNoiBat = mockData.tinTucNoiBat;

    // Logic router đã bị loại bỏ
    // const router = useRouter() 
    
    let totalPage = Array.isArray(tinTucNoiBat) ? Math.ceil(tinTucNoiBat.length / 4) - 1 : 1;
    
    // State cho Modal (Giữ lại vì là logic UI)
    const [openModalCheckAuth, setOpenModalCheckAuth] = useState(false);
    const [scrollToCamNang, setScrollToCamNang] = useState(false);
    
    // Hàm xử lý UI (Giữ lại)
    const reRenderTiTuc = () => {
        const renderTinTuc = [];
        let width = window.innerWidth;
        if (Array.isArray(tinTucNoiBat)) {
            if (width >= 1024 && width < 1365) {
                totalPage = Math.ceil(tinTucNoiBat.length / 3) - 1; // Cập nhật totalPage
                for (let i = pageTintuc * 3; i < pageTintuc * 3 + 3; i++) {
                    if (tinTucNoiBat[i]) {
                        renderTinTuc.push(tinTucNoiBat[i]);
                    }
                }
                SetRdTinTucNoiBat(renderTinTuc);
            } else {
                totalPage = Math.ceil(tinTucNoiBat.length / 4) - 1; // Cập nhật totalPage
                for (let i = pageTintuc * 4; i < pageTintuc * 4 + 4; i++) {
                    if (tinTucNoiBat[i]) {
                        renderTinTuc.push(tinTucNoiBat[i]);
                    }
                }
                SetRdTinTucNoiBat(renderTinTuc);
            }
        }
    };

    // --- Logic xác thực (handleNoAuth) đã bị loại bỏ ---

    // Hàm xử lý Modal (Giữ lại, stub phần điều hướng)
    const denyAuth = () => {
        setOpenModalCheckAuth(false);
        sessionStorage.setItem('denyAuth', '1');
    };
    const acceptAuth = () => {
        setOpenModalCheckAuth(false);
        // router.push('/ma-otp') // Đã loại bỏ
        alert("Chuyển đến trang xác thực OTP!");
    };

    // Hàm xử lý UI (Giữ lại)
    const handlePrevTinTuc = () => {
        setPageTinTuc((pre) => {
            if (pre - 1 < 0) {
                return totalPage;
            } else {
                return pre - 1;
            }
        });
        setScrollToCamNang(true);
    };

    // Hàm xử lý UI (Giữ lại)
    const handleNextTinTuc = () => {
        setPageTinTuc((pre) => {
            if (pre + 1 > totalPage) {
                return 0;
            } else {
                return pre + 1;
            }
        });
        setScrollToCamNang(true);
    };

    // Hàm xử lý UI (Giữ lại)
    const scrollToId = (id) => {
        const ele = document.getElementById(id);
        if (ele) {
            const rect = ele.getBoundingClientRect();
            const viewHeight = window.innerHeight || document.documentElement.clientHeight;
            const viewWidth = window.innerWidth || document.documentElement.clientWidth;
            const isOnScreen = rect.top >= 0 && rect.left >= 0 && rect.bottom <= viewHeight && rect.right <= viewWidth;
            !isOnScreen && ele.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Hàm xử lý dữ liệu (Giữ lại, dùng mock functions)
    const countNganhNgheNoiBat = (id) => {
        const job = nganhNgheNoiBat?.find((job) => Number(job._id) == id);
        return job ? job.count : 0; // Trả về 0 nếu không tìm thấy
    };
    
    // Hàm xử lý link (Giữ lại, dùng mock functions)
    const nganhNgheHandle = (id) => {
        const job = getJobName(id);
        return `/tim-viec-lam-${createLinkTilte2(job)}`; // Sử dụng hàm stub
    };

    // Hook xử lý UI (Giữ lại)
    useEffect(() => {
        reRenderTiTuc();
    }, [pageTintuc]);

    // Hook xử lý UI (Giữ lại)
    useEffect(() => {
        if (scrollToCamNang) {
            scrollToId('camnangtimviec');
            setScrollToCamNang(false);
        }
    }, [scrollToCamNang]);

    // Hook chính (Đã loại bỏ logic jQuery, auth)
    useEffect(() => {
        // Cập nhật lại tin tức khi load
        reRenderTiTuc(); 

        if (typeof window != 'undefined') {
            window.addEventListener('resize', reRenderTiTuc);
        }

        // Đã loại bỏ logic setViecLamHapDan, setViecLamLuongCao vì đã set bằng mock data
        // setViecLamHapDan(data?.ViecLamHapDan)
        // setViecLamLuongCao(data?.ViecLamThuongHieu)

        return () => {
            window.removeEventListener('resize', reRenderTiTuc);
        };
    }, []); // Chỉ chạy 1 lần khi mount


    return (
        <>
            {/* <Head> đã bị loại bỏ. Bạn có thể thêm thẻ <link> vào public/index.html */}
            <div className="container_Trangchu">
                <div className="wrapper">
                    <div className="wrapper_child">
                        <Banner />
                        <JobListing data={viecLamHapDan ? { ViecLamHapDan: viecLamHapDan } : { ViecLamHapDan: [] }} changeChooseAuto={(e) => {
                            // Logic đã bị loại bỏ
                        }} />
                    </div>
                    <div className="wrapper_child">
                        <div className="banner_taocv">
                            <div className="box_banner">
                                <div className="box_describe">
                                    <h2 className="text_cvonl ffffff font28_700">Tạo CV online {!isExperiment() && "hoặc sử dụng CV có sẵn "}để tìm việc làm</h2>
                                    <p className="ffffff font16_500 text_des_cv">Job247 hiện có 3500+ mẫu CV chuyên nghiệp, độc đáo cùng 5 ngôn ngữ Anh, Việt, Hàn, Trung, Nhật phù hợp với mọi ngành nghề</p>
                                    <div className="dou_btn">
                                        <button className='create_cvo'>
                                            <a
                                                href={linkPageCv()} // Dùng hàm stub
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                <span className="ffffff" style={{ fontSize: '16px' }}>Tạo CV online</span>
                                                <div className="img_cr_cv">
                                                    <span
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {/* SVG đã được nhúng từ code gốc */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="121" height="120" viewBox="0 0 121 120">
                                                            <image width="121" height="120" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB4CAYAAADWpl3sAAADWElEQVR4nO3a7U0bQRSF4XNdgdOBO8CuIKQDqCBQQewKLCpIqACoAKcCOxWEVIDTgTu40axmrDX42xLx3HMeCYlfsDuv7u5414YTufslgPTzGUAfQPfUvymYAXgB8AfAxMwWpyzJUZHdvQdgDOBKUT/EBMCTmU2O+WcHRc5xH/LkysebAxgdGruzZ9yuu38H8KrA/1Uasmd3n+aB28vOSXb3fp7eftilq9MiT/XjrqPfGjkHnuq+e9Z+mNlo2wFuvFy7+w2A3wp89obu/rDtINdOsia4Shsn+l3kfEPXBNfpdt09el3kqXbQ1UqbsYGZzdsnsHJPdvehAletmz8JrVhOcvosnD8H6zJdv5XLdnuShwocxrh9Is0ka4pDui6PP8sk60VDPF/LGZVJ1o46pk/pNWUnX6oVOKZ0hW4u13rxEFf6IkcTWVMcV/M6MkW+YF+JwJoB7mhXHd9e3wyReqUXToocnyIzUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkeObK3JwZtZEnrMvRHQp8l/2RQhshhx5xr4SgTVX6RT5hX0lAvuVTq1jZgsAE/bVCKrpWnbXP9lXI6BJHuBl5FR8wb4qwTyV02ki5+L37KsSyNzMlrdgK7+4exfAK4Au+woFcN2OvHzilaf5jn11Api1A6M9yYW7TwFcsq9UpdKgDtKjzPbhr3t2fa1NWLVu3wbGusj5sv1Foatz9/YyXby7XBfu3gcw1UasCo9mdrvpQDe+ajSzF010FUbbAmPbJBfu3gPwDKDPtnpnbpHvwTsfSe/80kC6kZvZQB+vzsos76L3euewc5Lb8lSPAdxEWa3KzPP0HvR6+KDIRY79DcAVgF7M9TwraWLvD41bHBW5Le/CU+yLfN9W9NOke23a9Kaf9D44PcE6fvML4B/plLAWlfOlkgAAAABJRU5ErkJggg==" />
                                                            <image id="Icon" x="38" y="38" width="46" height="45" xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAtCAYAAADRLVmZAAACa0lEQVRogdXZPYgUMRjG8X9WEbHQSjjB1u6Ijdr6NYgIYmOlcKAoh9pYeGgpfqCFWIieh4dXWFiIgmgnwcJSxGK0VDsr0eIQC0Eiuc2ue3I7+87cm+zuU+7k3fkRMpNMYkgQZ/064A5wAvgJzBSlWdC8kzo8op8Ch/+7dLYozX2t+6jCK9CdqOFbGn/Sk6sV6JBZZ/0ZjRtpww8J2qjgteGfhO1WjdeGXwC+CtuuCq8KL0rzGdgDfBGWNManeo9vBV4D24Qltd82SeC08ZsjflJYUguvPca7KUrzDdgNvBWW1Bo2yeC08T+AA8AbYYkYn2yo9MZZvwF4AewXlgwcNkl7vJOiNL/i5PRSWDKw57PAaeN/A0eBx8KSSnw2OP/wU4B0idsXnxUeUpTmD3AKuCcsWRGf5eHsF2f9TeCisPmyB3YJ7qwPPXAF2JIT3iBdvHHWh5ntw4iDe7OEXwvsGB2TKGHML2Z/OJVybVzh68cV/qBVY9E/KpkDLreK0oSV2+wYocNbxXcnIGf9BDCRGXI8fqdK0kUzzJnTWX8SmBcuO5ahGcZahTb6HPCwKZphwJ31l4C7wuYroskNd9ZfB24Im/dFk/HTLdznNnBeWFKJJgfcWb8mrr2nhSUD0aSGR/Qj4JiwRIQm8YZQ2Ct/AhwRlojRJNyCC9sRz4CDwpJaaBIdpWwEngN7hSW10SQ4StkEvAJ2CUvCJHS6LpoE7/FbNdBhf2W6CZoE8J3CdgE9FbcqGkUb/j4HmgTwGeBjxXUVNAmOUr4D+/rg1dCkWGTFDf2Af9fz87xWT3eScuYMnbIdWIyHWnoB/gK9VNwfi/aSrQAAAABJRU5ErkJggg==" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </a>
                                        </button>
                                        {!isExperiment() && <button className="upload_cvo">
                                            <a style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }} href={`${checkLogin(2) ? '/ung-vien/tai-len-ho-so' : '/dang-ky-ung-vien'}`}> {/* Dùng hàm stub */}
                                                <span className="ffffff" style={{ fontSize: '16px' }}>Upload CV ngay</span>
                                                <div className="img_upload">
                                                    <span
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {/* SVG đã được nhúng từ code gốc */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={121} height={120} viewBox="0 0 121 120">
                                                            <image width={121} height={120} xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB4CAYAAADWpl3sAAADWElEQVR4nO3a7U0bQRSF4XNdgdOBO8CuIKQDqCBQQewKLCpIqACoAKcCOxWEVIDTgTu40axmrDX42xLx3HMeCYlfsDuv7u5414YTufslgPTzGUAfQPfUvymYAXgB8AfAxMwWpyzJUZHdvQdgDOBKUT/EBMCTmU2O+WcHRc5xH/LkysebAxgdGruzZ9yuu38H8KrA/1Uasmd3n+aB28vOSXb3fp7eftilq9MiT/XjrqPfGjkHnuq+e9Z+mNlo2wFuvFy7+w2A3wp89obu/rDtINdOsia4Shsn+l3kfEPXBNfpdt09el3kqXbQ1UqbsYGZzdsnsHJPdvehAletmz8JrVhOcvosnD8H6zJdv5XLdnuShwocxrh9Is0ka4pDui6PP8sk60VDPF/LGZVJ1o46pk/pNWUnX6oVOKZ0hW4u13rxEFf6IkcTWVMcV/M6MkW+YF+JwJoB7mhXHd9e3wyReqUXToocnyIzUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkQkoMgFFJqDIBBSZgCITUGQCikxAkeObK3JwZtZEnrMvRHQp8l/2RQhshhx5xr4SgTVX6RT5hX0lAvuVTq1jZgsAE/bVCKrpWnbXP9lXI6BJHuBl5FR8wb4qwTyV02ki5+L37KsSyNzMlrdgK7+4exfAK4Au+woFcN2OvHzilaf5jn11Api1A6M9yYW7TwFcsq9UpdKgDtKjzPbhr3t2fa1NWLVu3wbGusj5sv1Foatz9/YyXby7XBfu3gcw1UasCo9mdrvpQDe+ajSzF010FUbbAmPbJBfu3gPwDKDPtnpnbpHvwTsfSe/80kC6kZvZQB+vzsos76L3euewc5Lb8lSPAdxEWa3KzPP0HvR6+KDIRY79DcAVgF7M9TwraWLvD41bHBW5Le/CU+yLfN9W9NOke23a9Kaf9D44PcE6fvML4B/plLAWlfOlkgAAAABJRU5ErkJggg==" />
                                                            <g>
                                                                <image id="BG-1" x={38} y={84} width={46} height={9} xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAJCAYAAABNEB65AAAAcUlEQVQ4je3UoQqDUACF4W/irEurwoJpYFld9Wl9hFv3Cks3CL7B6spEcLAkWPQK+5/g44Rz+LT1EQ3uqHBBiQIn2/bCGz06RDwQcjwncIp9hzvj9uOLWcLouaosXdt8f/ja7RoeE3AsLY53eN3djxMG2ooUSnkBuLkAAAAASUVORK5CYII=" />
                                                                <image id="Icon" x={38} y={28} width={45} height={46} xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAuCAYAAAC8jpA0AAACWUlEQVRoge3Zv4+MQRjA8e+zIblSJBp/w2WpJDQuOBGSqzyhEImWRqEgEYloKGgU6K5AsyJycZFInFJcgzk6CocGBeJHQnhlNu/IK/bdd2beuYni/Za7z+58Mrv77rvvCokrBv3dwBVgPXAbOChqPqZcJSm6GPRngBvA6srNi8DOlPBk6BqwKyk8CboB7EoGb432BLuSwFuhA8Gu1vBodCTY1QoehW4JdkXDg9GJwK4oeBA6MdgVDPdGrxDYFQT3Qq8w2OUN7zUNZALbNgF3i0F/TdPg2J3OCK72FNgmat7VDdTudCD4ernYuC4A7z2eaxJYKAb9dUHoQPAte/oJ/GyYW7LvWeCTx3OOhf+DDgTfAfaJmibwMFHzqIR/aQP/Cx0Ivg/sFTXffcAV+EPArvMtFv4HHXG2NiNqvoaAK/AFQIEfMfBeBPhJeTz9HAOuwOeB/cCvUHivGPSnA8DPgOlkv0DU3Cw/xIXH+GR5HJ+wO33SE/wC2DXu+BmTqLkGHPF86Eb7trToCY/hN8B2UfM6Jdglai4BxzzHhzt9sWHoLTAlal6mIY5O1JwHTjWMLQNzPVFzFThRM2S/wXaImucrCXaJmjPAuZq73av9YXj0EDVnR8DtN9ceUbOUA+wSNceByyPAU27zepVhCz8A3APsp3qrqFnMCa50GDhqD3PALLC5+mqnvFjzGNgwZuSQqJlNsVbj+fT/WIfOVYfOVYfOVYfOVYfOVYfOVYfOVUr0q4b7l1MtlBJ9Gqi7HjJXXkZLUur/xtcCW4BVlZvtr/kHosbngkxzwG/B1OWe8JmQDAAAAABJRU5ErkJggg==" />
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </a>
                                        </button>}
                                    </div>
                                </div>
                                <div className="img_cv">
                                    <img src="/images/cvo.jpg" alt="ảnh CV" loading='lazy' decoding='async' />
                                    <div className="img_up">
                                        <img src="/images/up.jpg" alt="up" loading='lazy' decoding='async' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <ViecLamLuongCao data={viecLamLuongCao ? { ViecLamThuongHieu: viecLamLuongCao } : { ViecLamThuongHieu: [] }} changeChooseAuto={(e) => {
                            // Logic đã bị loại bỏ
                        }} /> */}
                    </div>
                    <div className="wrapper_child">
                        <div className="box_wrap bg_fff">
                            <div className="wrapper_company pt60">
                                <div className="tt_job_outstanding">
                                    <h2>
                                        <span className="F8971C">NGÀNH NGHỀ</span><span> NỔI BẬT</span>
                                    </h2>
                                </div>
                                <div className="list_box_job_outstanding">
                                    {/* Các link đã được gán href="#" hoặc link stub */}
                                    <a href={nganhNgheHandle(9)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_hd img70">
                                                <img src="/images/kinh-doanh.jpg" alt="Kinh doanh" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Kinh doanh</h3>
                                            <p className="">{countNganhNgheNoiBat(9)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(13)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_IT img70">
                                                <img src="/images/it-phan-mem.jpg" alt="IT Phần Mềm" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">IT phần mềm</h3>
                                            <p className="">{countNganhNgheNoiBat(13)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(2)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_HCVP">
                                                <img src="/images/hanh-chinh-van-phong.jpg" alt="Hành chính văn phòng" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Hành chính văn phòng</h3>
                                            <p className="">{countNganhNgheNoiBat(2)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(14)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_mkt img70">
                                                <img src="/images/marketing.jpg" alt="Marketing" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Marketing</h3>
                                            <p className="">{countNganhNgheNoiBat(14)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(33)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_bds img70">
                                                <img src="/images/bat-dong-san.jpg" alt="Bất động sản" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Bất động sản</h3>
                                            <p className="">{countNganhNgheNoiBat(33)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(27)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_ns img70">
                                                <img src="/images/nhan-su.jpg" alt="Nhân sự" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Nhân sự</h3>
                                            <p className="">{countNganhNgheNoiBat(27)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(66)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_bh">
                                                <img src="/images/bao-hiem.jpg" alt="Bảo hiểm" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Bảo hiểm</h3>
                                            <p className="">{countNganhNgheNoiBat(66)} việc làm</p>
                                        </div>
                                    </a>
                                    <a href={nganhNgheHandle(10)} className="item_outstanding">
                                        <div className="e_job">
                                            <div className="box_img img_e_banhang img70">
                                                <img src="/images/ban-hang.jpg" alt="Bán hàng" loading='lazy' decoding='async' />
                                            </div>
                                        </div>
                                        <div className="tt_e_job">
                                            <h3 className="job_o">Bán hàng</h3>
                                            <p className="">{countNganhNgheNoiBat(10)} việc làm</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper_child">
                        <div className="box_wrap">
                            <div className="wrapper_company pt64">
                                <div className="job_hapdan">
                                    <h2 id='camnangtimviec'>
                                        <span className="F8971C">CẨM NANG</span><span> TÌM VIỆC</span>
                                    </h2>
                                </div>
                                <div className="list_news">
                                    <div className="show_com_onl show_left"
                                        onClick={handlePrevTinTuc}
                                    >
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <svg width="40" height="40" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
                                                <path d="M12.9187 14.5059C12.7616 14.3717 12.6733 14.1897 12.6733 14C12.6733 13.8103 12.7616 13.6283 12.9187 13.4941L16.7614 10.2126C16.9141 10.0777 16.9985 9.89694 16.9966 9.70932C16.9947 9.52171 16.9066 9.34224 16.7512 9.20958C16.5958 9.07691 16.3856 9.00166 16.1658 9.00003C15.9461 8.9984 15.7344 9.07052 15.5763 9.20086L11.7362 12.4823C11.2648 12.8849 11 13.4308 11 14C11 14.5692 11.2648 15.1151 11.7362 15.5177L15.5797 18.7991C15.7377 18.9295 15.9494 19.0016 16.1692 19C16.3889 18.9983 16.5991 18.9231 16.7545 18.7904C16.9099 18.6578 16.9981 18.4783 17 18.2907C17.0019 18.1031 16.9174 17.9223 16.7647 17.7874L12.9187 14.5059Z" fill="#3582CD" />
                                            </svg>
                                        </span>
                                    </div>
                                    {/* <div className="many_news">
                                        {
                                            rdTinTucNoiBat?.map((item, i) => (
                                                <div key={i} >
                                                    <News_box info={item} />
                                                </div>
                                            ))
                                        }
                                    </div> */}
                                    <div className="show_com_onl show_right"
                                        onClick={handleNextTinTuc}
                                    >
                                        <span
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <svg width="40" height="40" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
                                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#3582CD" />
                                                <path d="M16.2651 12.4687L12.4255 9.18492C12.2662 9.06164 12.0576 8.99552 11.8429 9.00024C11.6281 9.00495 11.4238 9.08015 11.2721 9.21027C11.1204 9.34038 11.0329 9.51543 11.0279 9.69919C11.0228 9.88295 11.1005 10.0613 11.2449 10.1974L15.082 13.4812C15.2388 13.6155 15.327 13.7976 15.327 13.9875C15.327 14.1774 15.2388 14.3595 15.082 14.4937L11.2449 17.7776C11.088 17.9119 10.9999 18.0941 11 18.2841C11.0001 18.474 11.0883 18.6561 11.2453 18.7904C11.4023 18.9247 11.6152 19.0001 11.8372 19C12.0591 18.9999 12.2719 18.9244 12.4288 18.7901L16.2651 15.5062C16.7356 15.1034 17 14.5571 17 13.9875C17 13.4179 16.7356 12.8716 16.2651 12.4687Z" fill="#3582CD" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal
                open={openModalCheckAuth}
                footer={
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={denyAuth}>
                            Để sau
                        </Button>
                        <Button type='primary' onClick={acceptAuth}>
                            Xác thực ngay
                        </Button>
                    </div>
                }
                closable={false}
                maskClosable={false}
                width={300}
            >
                <div style={{ textAlign: 'center' }}>
                    <div>Bạn chưa xác thực tài khoản</div>
                    <div>Xác thực OTP ngay?</div>
                </div>
            </Modal>
        </ >
    )
}

export default Body