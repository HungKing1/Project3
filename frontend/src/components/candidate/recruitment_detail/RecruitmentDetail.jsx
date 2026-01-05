/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';

// --- GIẢ LẬP CÁC COMPONENT CON ---
const VideoPlayer = ({ url }) => url ? <div className={s.videoPlaceholder}>Video Player: {url}</div> : null;

const SignInModal = ({ isOpenSignIn, handleCancelSignIn }) => {
    if (!isOpenSignIn) return null;
    return (
        <div className={s.modalOverlay} onClick={handleCancelSignIn}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3>Đăng nhập</h3>
                <p>Vui lòng đăng nhập để thực hiện chức năng này.</p>
                <button className={s.modalBtn} onClick={handleCancelSignIn}>Đóng</button>
            </div>
        </div>
    );
};

const ModalReport = ({ isOpen, onOk, onClose, inputText, onInput, targetName }) => {
    if (!isOpen) return null;
    return (
        <div className={s.modalOverlay}>
            <div className={s.modalContent}>
                <h3>Báo xấu {targetName}</h3>
                <textarea
                    className={s.textarea}
                    value={inputText}
                    onChange={(e) => onInput(e.target.value)}
                    placeholder="Nhập lý do báo xấu..."
                />
                <div className={s.modalActions}>
                    <button className={s.btnCancel} onClick={onClose}>Hủy</button>
                    <button className={s.btnOk} onClick={onOk}>Gửi báo cáo</button>
                </div>
            </div>
        </div>
    );
};
// --- KẾT THÚC GIẢ LẬP ---

// --- HÀM GIẢ LẬP (Stubs) ---
const checkLogin = (type) => true; // Giả lập đã đăng nhập UV
const checkNtd = () => true; // Giả lập là UV
// ---

const RecruitmentDetail = ({ recruitmentInfo, handleLuuTin, handleUngTuyenNgay, isApply, isSave }) => {
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isModalReportOpen, setIsModalReportOpen] = useState(false);
    const [reportContent, setReportContent] = useState("");
    const [isLoadingApply, setIsLoadingApply] = useState(false); // State loading giả lập

    const handleCancelSignIn = () => setIsOpenSignIn(false);

    const handleBaoXau = () => {
        if (checkLogin(2)) {
            setIsModalReportOpen(true);
        } else {
            if (window.confirm('Để báo xấu tin, hãy đăng nhập ứng viên. Đăng nhập ngay?')) {
                window.location.href = '/dang-nhap-ung-vien';
            }
        }
    };

    const handleBaoXauOk = () => {
        if (reportContent.trim()) {
            alert('Cảm ơn phản hồi của bạn! (Mock)');
            setReportContent('');
            setIsModalReportOpen(false);
        } else {
            alert('Vui lòng nhập lý do báo xấu');
        }
    };

    const onApplyClick = () => {
        setIsLoadingApply(true);
        setTimeout(() => {
            setIsLoadingApply(false);
            handleUngTuyenNgay();
        }, 1000); // Giả lập delay call API
    };

    if (!recruitmentInfo) return null;

    return (
        <>
            <div className={s.job_detail_box}>
                {/* <VideoPlayer url={recruitmentInfo?.video} /> */}

                <div className={s.main_content}>
                    <div className={s.header_section}>
                        <h2 className={s.section_title}>Chi tiết tin tuyển dụng</h2>
                    </div>

                    <div className={s.info_section}>
                        {recruitmentInfo?.moTaCongViec && (
                            <div className={s.info_block}>
                                <h3 className={s.sub_title}>Mô tả công việc</h3>
                                <div className={s.html_content} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.moTaCongViec }} />
                            </div>
                        )}
                        
                        {recruitmentInfo?.yeuCauUngVien && recruitmentInfo.yeuCauUngVien !== 'Xem chi tiết tin' && (
                            <div className={s.info_block}>
                                <h3 className={s.sub_title}>Yêu cầu ứng viên</h3>
                                <div className={s.html_content} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.yeuCauUngVien }} />
                            </div>
                        )}

                        {recruitmentInfo?.quyenLoi && recruitmentInfo.quyenLoi !== 'Xem chi tiết tin' && (
                            <div className={s.info_block}>
                                <h3 className={s.sub_title}>Quyền lợi</h3>
                                <div className={s.html_content} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.quyenLoi }} />
                            </div>
                        )}

                        {recruitmentInfo?.diaDiemTuyenDung && recruitmentInfo.diaDiemTuyenDung !== 'Xem chi tiết tin' && (
                            <div className={s.info_block}>
                                <h3 className={s.sub_title}>Địa điểm làm việc</h3>
                                <div className={s.html_content} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.diaDiemTuyenDung }} />
                            </div>
                        )}

                         {recruitmentInfo?.yeuCauHoSo && recruitmentInfo.yeuCauHoSo !== 'Xem chi tiết tin' && (
                            <div className={s.info_block}>
                                <h3 className={s.sub_title}>Yêu cầu hồ sơ</h3>
                                <div className={s.html_content} dangerouslySetInnerHTML={{ __html: recruitmentInfo?.yeuCauHoSo }} />
                            </div>
                        )}
                    </div>
                </div>

                {checkNtd() && (
                    <div className={s.action_section}>
                        <p className={s.note_text}>
                            Ứng viên nộp hồ sơ trực tuyến bằng cách bấm <strong>Ứng tuyển ngay</strong> dưới đây.
                        </p>
                        <div className={s.button_group}>
                            {!isApply ? (
                                <button className={`${s.btn} ${s.btn_primary}`} onClick={onApplyClick} disabled={isLoadingApply}>
                                    {isLoadingApply ? 'Đang xử lý...' : 'Ứng tuyển ngay'}
                                </button>
                            ) : (
                                <button className={`${s.btn} ${s.btn_disabled}`} disabled>
                                    Đã ứng tuyển
                                </button>
                            )}

                            <button className={`${s.btn} ${s.btn_outline} ${isSave ? s.active : ''}`} onClick={handleLuuTin}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill={isSave ? "#3582CD" : "none"} stroke={isSave ? "#3582CD" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span>{isSave ? 'Đã lưu' : 'Lưu tin'}</span>
                            </button>

                            {checkLogin(2) && (
                                <button className={`${s.btn} ${s.btn_danger_outline}`} onClick={handleBaoXau}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                        <line x1="4" y1="22" x2="4" y2="15"></line>
                                    </svg>
                                    <span>Báo xấu</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}

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
    );
};

export default RecruitmentDetail;