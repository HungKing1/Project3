import React, { useEffect, useState } from "react";

import ContactInformation from "../../components/candidate/candidate_profile/contact_info/ContactInformation";
import Slider from "../../components/candidate/candidate_profile/slider/Slider";
import DesiredJob from "../../components/candidate/candidate_profile/desired_job/DesiredJob";
import CareerObjective from "../../components/candidate/candidate_profile/career_objective.jsx/CareerObjective";
import PersonalSkill from "../../components/candidate/candidate_profile/personal_skill/PersonalSkill";
import CandidateDegree from "../../components/candidate/candidate_profile/degree/CandidateDegree";
import LanguageCertificate from "../../components/candidate/candidate_profile/languague_certificate/LanguageCertificate";
import WorkExperience from "../../components/candidate/candidate_profile/work_experience/WorkExperience";
// import NguoiThamChieu from "@/components/ung-vien/ho-so-xin-viec/nguoi-tham-chieu/NguoiThamChieu";


const CandidateProfile = () => {
  // --- 1. MOCK DATA (Dữ liệu mẫu để hiển thị giao diện) ---
  const mockData = {
    percentHoSo: 75,
    thongTinLienHe: {
      name: "Nguyễn Văn An",
      email: "nguyenvana@gmail.com",
      phone: "0987654321",
      address: "Hà Nội, Việt Nam",
      avatar: "/images/candidate/applicant1.png",
      dob: "01/01/1995",
      gender: 1, // 1: Nam, 2: Nữ
      marrital: 1 // 1: Độc thân
    },
    congViecMongMuon: {
        vi_tri: "Lập trình viên Frontend",
        muc_luong: "15 - 20 triệu",
        dia_diem: "Hà Nội",
        hinh_thuc: "Toàn thời gian"
    },
    muc_tieu_nghe_nghiep: "Mong muốn trở thành Senior React Developer trong 2 năm tới. Tìm kiếm môi trường làm việc năng động, chuyên nghiệp.",
    ki_nang_ban_than: [
        { id: 1, name: "ReactJS", rating: 5 },
        { id: 2, name: "NodeJS", rating: 3 },
        { id: 3, name: "Teamwork", rating: 4 }
    ], // Hoặc dạng string tùy component con của bạn xử lý
    hocVan: [ // Dữ liệu cho CandidateDegree
      {
        id: 1,
        school: "Đại học Bách Khoa Hà Nội",
        degree: "Cử nhân Công nghệ thông tin",
        from_date: "2013",
        to_date: "2018",
        loai_tot_nghiep: "Giỏi"
      }
    ],
    NgoaiNgu: [ // Dữ liệu cho LanguageCertificate
      { id: 1, language: "Tiếng Anh", level: "Trung cấp" },
      { id: 2, language: "Tiếng Nhật", level: "N3" }
    ],
    KinhNghiem: [ // Dữ liệu cho WorkExperience
      {
        id: 1,
        company: "Công ty ABC",
        position: "Frontend Developer",
        start_date: "01/2019",
        end_date: "Nay",
        description: "Phát triển giao diện website thương mại điện tử."
      }
    ],
    thamChieu: [ // Dữ liệu cho NguoiThamChieu
      {
        id: 1,
        name: "Trần Văn B",
        position: "Team Leader",
        company: "Công ty ABC",
        phone: "0912345678",
        email: "leader@abc.com"
      }
    ]
  };

  // --- 2. STATE & LOGIC ---
  // Giả lập changePercent nếu không dùng Context thật
  // const { changePercent } = useContext(NTD_UV_Context); 
  const changePercent = (percent) => {
    console.log("Cập nhật phần trăm hồ sơ:", percent);
  };

  const [link, setLink] = useState(1); // Quản lý tab đang hiển thị
  const [data, setData] = useState(null); // Dữ liệu hiển thị

  // Hàm giả lập lấy dữ liệu (thay thế API call)
  const getDetialCandidate = async () => {
    try {
        // Giả lập độ trễ mạng
        setTimeout(() => {
            setData(mockData);
            changePercent(mockData.percentHoSo.toString());
        }, 500);
    } catch (error) {
        console.error("Lỗi giả lập:", error);
    }
  };

  // Hàm làm mới dữ liệu (Gọi lại khi update component con thành công)
  const refreshDetailCandidate = async () => {
    console.log("Đang làm mới dữ liệu...");
    // Thực tế sẽ gọi API lại, ở đây ta set lại mockData
    await getDetialCandidate();
    alert("Cập nhật dữ liệu thành công (Mô phỏng)!");
  }

  useEffect(() => {
    getDetialCandidate();
  }, []);

  // --- 3. RENDER ---
  return (
    <>
        {/* <Intro /> */}
        
        {/* Slider điều hướng các mục hồ sơ */}
        <Slider setLink={setLink} link={link}></Slider>

        {/* Render nội dung theo tab được chọn (link) */}
        <div style={{ minHeight: '500px' }}> {/* Thêm minHeight để tránh giật layout khi load */}
            {link === 1 && (
            <ContactInformation 
                dataDetaiUser={data} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {link === 2 && (
            <DesiredJob 
                dataDetaiUser={data} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {link === 3 && (
            <CareerObjective 
                dataWorkJob={data?.muc_tieu_nghe_nghiep} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {link === 4 && (
            <PersonalSkill 
                dataKNBT={data?.ki_nang_ban_than} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {link === 5 && (
            <CandidateDegree 
                dataUser={data} 
                dataEducation={data?.hocVan} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {link === 6 && (
            <LanguageCertificate 
                dataLanguage={data?.NgoaiNgu} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {link === 7 && (
            <WorkExperience 
                dataExWork={data?.KinhNghiem} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )}

            {/* {link === 8 && (
            <NguoiThamChieu 
                dataReference={data?.thamChieu} 
                handleRefreshData={refreshDetailCandidate} 
            />
            )} */}
        </div>
    </>
  );
};

export default CandidateProfile;