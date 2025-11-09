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