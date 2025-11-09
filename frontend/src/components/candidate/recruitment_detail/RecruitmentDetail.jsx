/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss'; // Giả định file CSS này tồn tại

// --- GIẢ LẬP CÁC COMPONENT CON ---
const VideoPlayer = ({ url }) => url ? <div>Video Player cho: {url}</div> : null;
const SignInModal = ({ isOpenSignIn, handleCancelSignIn }) => {
    return isOpenSignIn ? (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
          <h2>Đăng nhập (Mẫu)</h2>
          <p>Đây là modal đăng nhập mẫu.</p>
          <button onClick={handleCancelSignIn}>Đóng</button>
        </div>
      </div>
    ) : null;
};
const ModalReport = ({ isOpen, onOk, onClose, inputText, onInput, targetName }) => {
    return isOpen ? (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: 20, zIndex: 1001, border: '1px solid black' }}>
            <h2>Báo xấu {targetName}</h2>
            <textarea 
                value={inputText}
                onChange={(e) => onInput(e.target.value)}
                placeholder="Nhập lý do..."
                style={{ width: '100%', minHeight: '80px' }}
            />
            <button onClick={onOk}>Gửi</button>
            <button onClick={onClose}>Hủy</button>
        </div>
    ) : null;
};
const ProgressLine = ({ percent, title }) => (
    <div style={{ margin: '5px 0' }}>
        <span>{title}</span>
        <div style={{ background: '#eee', width: '100%', height: '10px', borderRadius: '5px' }}>
            <div style={{ background: 'blue', width: `${percent}%`, height: '100%', borderRadius: '5px' }}></div>
        </div>
    </div>
);
// --- KẾT THÚC GIẢ LẬP COMPONENT ---

// --- HÀM GIẢ LẬP (Stubs) ---
const checkLogin = (type) => true; // Giả lập đã đăng nhập UV
const checkNtd = () => true; // Giả lập là UV (để hiển thị nút)
// ---

const RecruitmentDetail = ({ recruitmentInfo, fitJobLevel, handleLuuTin, handleUngTuyenNgay, isApply, isSave }) => {
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isModalReportOpen, setIsModalReportOpen] = useState(false);
    const [reportContent, setReportContent] = useState("");
    
    // (Logic tính toán biểu đồ (groupCircle) đã bị loại bỏ)

    const handleCancelSignIn = () => {
        setIsOpenSignIn(false);
    };

    const handleBaoXau = async () => {
        if (checkLogin(2)) { // Giả lập là UV
            setIsModalReportOpen(true);
        } else {
            if (confirm('Để báo xấu tin, hãy đăng nhập ứng viên, đăng nhập ngay?')) {
                window.location.href = '/dang-nhap-ung-vien';
            }
        }
    };

    const handleBaoXauOk = async () => {
        if (reportContent) {
            // const result = await POST(...) // Logic API đã bị loại bỏ
            alert('Phản hồi của bạn đã được ghi nhận! (Mock)');
            setReportContent('');
            setIsModalReportOpen(false);
        } else {
            alert('Vui lòng nhập lý do báo xấu');
        }
    };

    const handleBaoXauCancel = () => {
        setReportContent('');
        setIsModalReportOpen(false);
    };

    if (!recruitmentInfo) return null; // Tránh lỗi

    return (
        <>
            <div className={s.job_detail_box_3}>
                {/* <VideoPlayer url={recruitmentInfo?.video} /> */}

                <div className={s.job_detail_content_1}>
                    <div className={s.job_header}>
                        <h2 className={s.text}>Chi tiết tin tuyển dụng</h2>
                    </div>
                    {recruitmentInfo?.moTaCongViec && <div className={s.job_content}>
                        <h3 className={s.job_title}>Mô tả công việc</h3>    
                        <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.moTaCongViec }}></pre>
                    </div>}
                    {recruitmentInfo?.yeuCauUngVien && recruitmentInfo?.yeuCauUngVien != 'Xem chi tiết tin' && <div className={s.job_content}>
                        <h3 className={s.job_title}>Yêu cầu ứng viên</h3>
                        <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.yeuCauUngVien }}></pre>
                    </div>}
                    {recruitmentInfo?.quyenLoi && recruitmentInfo?.quyenLoi != 'Xem chi tiết tin' && <div className={s.job_content}>
                        <h3 className={s.job_title}>Quyền lợi</h3>
                        <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.quyenLoi }}></pre>
                    </div>}
                    {recruitmentInfo?.diaDiemTuyenDung && recruitmentInfo?.diaDiemTuyenDung != 'Xem chi tiết tin' && <div className={s.job_content}>
                        <h3 className={s.job_title}>Địa điểm làm việc</h3>
                        <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.diaDiemTuyenDung }}></pre>
                    </div>}
                    {recruitmentInfo?.yeuCauHoSo && recruitmentInfo?.yeuCauHoSo != 'Xem chi tiết tin' && <div className={s.job_content}>
                        <h3 className={s.job_title}>Yêu cầu hồ sơ</h3>
                        <pre className={s.job_body} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.yeuCauHoSo }}></pre>
                    </div>}
                </div>

                {checkNtd() &&<div className={s.job_detail_content_2}>
                    <span className={s.title}>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm <strong>Ứng tuyển ngay</strong> dưới đây.</span>
                    <div className={s.groupButton}>
                        {!isApply ?
                            <button className={s.button_blue} onClick={handleUngTuyenNgay}><span>Ứng tuyển ngay</span></button>
                            : <button className={s.button_blue}><span>Bạn đã ứng tuyển công việc này</span></button>
                        }
                        {!isSave ? <button className={s.button} onClick={handleLuuTin}>
                            <div className={s.div}>
                                <div className={s.icon}>
                                    <img // <Image> đã được thay bằng <img>
                                        src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.svg"
                                        width={16}
                                        height={16}
                                        style={{ height: "16px", width: "16px" }}
                                        alt="logo luu tin"
                                    />
                                </div>
                                <div className={s.content}>Lưu tin</div>
                            </div>
                        </button> : <button className={s.button}>
                            <div className={s.div}>
                                <div className={s.icon}>
                                    <img // <Image> đã được thay bằng <img>
                                        src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/heart.svg"
                                        width={16}
                                        height={16}
                                        style={{ height: "16px", width: "16px" }}
                                        alt="logo luu tin"
                                    />
                                </div>
                                <div className={s.content}>Đã lưu</div>
                            </div>
                        </button>}
                        {
                            checkLogin(2) &&
                            <button className={s.button_red} onClick={handleBaoXau}>
                                <div className={s.div}>
                                    <div className={s.icon}>
                                        <img // <Image> đã được thay bằng <img>
                                            src="/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/flag-solid.svg"
                                            width={16}
                                            height={16}
                                            style={{ height: "16px", width: "16px" }}
                                            alt="logo bao xau"
                                        />
                                    </div>
                                    <div className={s.content}>Báo xấu</div>
                                </div>
                            </button>
                        }
                    </div>
                </div>}

                {/* (Phần báo cáo và mức độ phù hợp đã bị comment trong code gốc) */}
                <SignInModal isOpenSignIn={isOpenSignIn} handleCancelSignIn={handleCancelSignIn} />
            </div>

            <ModalReport
                isOpen={isModalReportOpen}
                onOk={handleBaoXauOk}
                onClose={handleBaoXauCancel}
                inputText={reportContent}
                onInput={setReportContent}
                targetName={'tin tuyển dụng'}
            />
        </>
    )
}

export default RecruitmentDetail