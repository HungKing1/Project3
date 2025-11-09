/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import s from './styles.module.scss';
// import ContentEditable from 'react-contenteditable'; // Bị comment trong code gốc

// --- IMPORT CÁC COMPONENT CON (THEO YÊU CẦU) ---
import DetailInfo from '../../../components/candidate/job_detail_infor/DetailInfo';
import RecruitmentDetail from '../../../components/candidate/recruitment_detail/RecruitmentDetail';
import Header from '../../../components/candidate/header/Header';
import SearchJobBar from '../../../components/candidate/job_list/search_job_bar/SearchJobBar';
// ---

// --- GIẢ LẬP CÁC COMPONENT KHÁC ---
const Footer = () => <div style={{ background: '#f0f0f0', padding: 20, textAlign: 'center', marginTop: 20 }}>Đây là Footer (Mẫu)</div>;
const SuggestWork = () => <div style={{ background: '#f9f9f9', padding: 15, margin: '20px 0' }}>Đây là Việc làm gợi ý (Mẫu)</div>;
const RateStar = () => <div style={{ background: '#f9f9f9', padding: 15, margin: '20px 0' }}>Đây là Đánh giá (Mẫu)</div>;
const JobGuide = () => <div style={{ background: '#f9f9f9', padding: 15, margin: '20px 0' }}>Đây là Cẩm nang (Mẫu)</div>;
const BoxChat = () => null;
const Login = ({ isOpenSignIn, handleCancelSignIn }) => {
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
const Comment = () => <div style={{ background: '#f9f9f9', padding: 15, margin: '20px 0' }}>Đây là Bình luận (Mẫu)</div>;
const ModalLock = () => null;
// --- KẾT THÚC GIẢ LẬP COMPONENT ---

// --- DỮ LIỆU MẪU (Mock Data) & HÀM GIẢ LẬP (Stubs) ---
const mockSeo = {
  seo_tt: 'Chi tiết tin Tuyển dụng (Mẫu)',
  seo_des: 'Mô tả chi tiết tin tuyển dụng mẫu.',
  seo_canonical: 'https://job247.vn/tin-tuyen-dung/mock-tin-tuyen-dung-123',
  schema: { "@context": "https://schema.org", "@type": "ItemPage" },
  schemaAgent: { "@context": "https://schema.org", "@type": "EmploymentAgency" },
  schemaJobPost: { "@context": "https://schema.org", "@type": "JobPosting" },
};

const mockData = {
  new_id: 123,
  new_title: "Nhân Viên Kinh Doanh (Việc Làm Mẫu)",
  new_cap_bac: 2,
  new_hinh_thuc: 1,
  new_gioi_tinh: 0,
  new_exp: 2,
  new_bang_cap: 3,
  new_money_type: 1,
  new_money_from: 20000000,
  new_money_to: 30000000,
  new_money: 0,
  new_so_luong: 5,
  new_thuviec: "2 tháng",
  new_hoahong: "5% doanh số",
  new_han_nop: Date.now() / 1000 + 1000000,
  new_update_time: Date.now() / 1000 - 50000,
  apply: false,
  SaveNew: false,
  new_mota: "<p>Mô tả công việc: <b>Tìm kiếm</b> khách hàng, <b>chăm sóc</b> khách hàng cũ...</p>",
  new_yeucau: "<p>Yêu cầu: Tốt nghiệp đại học, có 1 năm kinh nghiệm...</p>",
  new_quyenloi: "<p>Quyền lợi: Lương tháng 13, BHXH, du lịch...</p>",
  new_addr: "Tầng 5, Tòa nhà ABC, 123 Đường Cầu Giấy, Hà Nội",
  new_ho_so: "<p>Hồ sơ bao gồm CV, đơn xin việc...</p>",
  arrNganhNghe: [{ cat_name: "Kinh doanh" }, { cat_name: "Bán hàng" }],
  new_city: ["Hà Nội", "Hồ Chí Minh"],
  rateInfo: [{ star: 5, count: 10 }, { star: 4, count: 5 }],
  workInfo: [], // Việc làm gợi ý
  Blog: [], // Cẩm nang
  fitJobLevel: null, // Để hiển thị box đăng nhập
  usc_logo: "/images/company-logo-mock.png",
  usc_company: "Công Ty TNHH Mẫu",
  usc_size: "100-300 nhân viên",
  usc_address: "Tầng 5, Tòa nhà ABC, 123 Đường Cầu Giấy, Hà Nội",
  placeholderLetter: "Viết thư giới thiệu...",
  new_cat_id: '9', // Mock category ID
};

const getJob = () => [{ value: 1, label: "Kế toán" }, { value: 2, label: "IT" }];
const getAllCity = () => [{ value: 1, label: "Hà Nội" }, { value: 45, label: "Hồ Chí Minh" }];
const getJobName = (id) => "Việc Làm Mẫu";
const getKinhNghiem = (id) => "1 năm";
const getMucLuong = (type, from, to, money) => "20 - 30 triệu";
const getQuyMo = (size) => size || "N/A";
const handleImageSource = (src) => src || "/images/candidate/ava_default.jpg";
// --- KẾT THÚC Mock Data & Stubs ---



const JobDetail = () => {
  // Sử dụng mock data thay vì props
  const data = mockData;
  const id = mockData.new_id;
  const seo = mockSeo;

  const [seo_tt, setSeo_tt] = useState(seo?.seo_tt);
  const [seo_des, setSeo_des] = useState(seo?.seo_des);
  const [seo_canonical, setSeo_canonical] = useState(seo?.seo_canonical);
  const [schema, setSchema] = useState(seo?.schema || {});
  const [schemaAgent, setSchemaAgent] = useState(seo?.schemaAgent || {});
  const [schemaJobPost, setSchemaJobPost] = useState(seo?.schemaJobPost || {});

  const [actionType, setActionType] = useState(0); // 1 - save | 2 - apply
  const [idNew, setIdNew] = useState(id);
  // (useRouter đã bị loại bỏ)
  const [isLogin, setIsLogin] = useState(false);
  const [type, setType] = useState(false);
  
  const [detailInfo, setDetailInfo] = useState({
    title: data?.new_title,
    cap_bac: data?.new_cap_bac,
    hinh_thuc_lam_viec: data?.new_hinh_thuc,
    gioi_tinh: data?.new_gioi_tinh,
    kinh_nghiem: data?.new_exp,
    bang_cap: data?.new_bang_cap,
    new_money_type: data?.new_money_type,
    new_money_from: data?.new_money_from,
    new_money_to: data?.new_money_to,
    new_money: data?.new_money,
    so_luong_can_tuyen: data?.new_so_luong,
    thoi_gian_thu_viec: data?.new_thuviec,
    hoa_hong: data?.new_hoahong,
    han_nop_ho_so: data?.new_han_nop,
    new_update_time: data?.new_update_time,
    apply: data?.apply,
    saveNew: data?.SaveNew,
  });
  const [recruitmentInfo, setRecruitmentInfo] = useState({
    moTaCongViec: data?.new_mota,
    yeuCauUngVien: data?.new_yeucau,
    quyenLoi: data?.new_quyenloi,
    diaDiemTuyenDung: data?.new_addr,
    yeuCauHoSo: data?.new_ho_so,
  });

  const [listJob, setListJob] = useState([{ value: 0, label: 'Tất cả ngành nghề' }, ...getJob()]);
  const [listDistrict, setListDisTrict] = useState([{ value: 0, label: 'Toàn quốc' }, ...getAllCity()]);
  const [chiTietCongViec, setChiTietCongViec] = useState(data?.arrNganhNghe);
  const [diaDiemLamViec, setDiaDiemLamViec] = useState(data?.new_city);
  const [fitJobLevel, setFitJobLevel] = useState(data?.fitJobLevel); // Mock là null
  const [rateYourself, setRateYourself] = useState(null);
  const [rateInfo, setRateInfo] = useState(data?.rateInfo);
  const [rateMedium, setRateMedium] = useState('');
  const [workInfo, setWorkInfo] = useState(data?.workInfo);
  const [listGuide, setListGuide] = useState(data?.Blog);
  const [letter, setLetter] = useState(null);
  const [isOpenLetter, setIsOpenLetter] = useState(false);
  const [increasing, setIncreasing] = useState(true);
  const [openModelLogin, setOpenModelLogin] = useState(false);
  const [isApply, setIsApply] = useState(data?.apply);
  const [isSave, setIsSave] = useState(data?.SaveNew);
  const [contentApply, setContentApply] = useState('');

  // --- HÀM GIẢ LẬP (STUBS) ---
  const handleSearch = (inputKey, distric, job) => {
    alert(`Tìm kiếm với: ${inputKey}, ${distric}, ${job} (Logic đã bị loại bỏ)`);
    // (Logic router.push đã bị loại bỏ)
  };

  const handleUngTuyenNgay = async (id) => {
    // setIsOpenLetter(true); // Logic gốc là không làm gì
  };

  const handleCloseLetter = () => {
    setIsOpenLetter(false);
  };

  const handleChatNgay = () => {
    console.log("Chat ngay thành công");
  };

  const handleLuuTin = async () => {
    // Giả lập chưa đăng nhập
    const isLoggedIn = false; // Thay đổi thành true để test
    if (!isLoggedIn) {
        // setOpenModelLogin(true); // Logic gốc
        alert("Yêu cầu đăng nhập! (Logic đã bị loại bỏ)");
        return;
    }
    
    // (Logic API đã bị loại bỏ)
    alert('Lưu tin thành công! (Mock)');
    setIsSave(true);
  };

  const handleTaoCvAI = () => {
    console.log("Tạo CV WorkAI");
  };

  const handleGuiThuUngTuyen = async (id) => {
    // (Logic API đã bị loại bỏ)
    alert('Ứng tuyển thành công! (Mock)');
    setIsOpenLetter(false);
    setIsApply(true);
  };

  const navigateToAbout = (route) => {
    // router.push(route); // Bị loại bỏ
    window.location.href = route; // Thay thế bằng
  };

  const checkLoginToOpenModelApply = () => {
    setActionType(2);
    setIdNew(data?.new_id);

    // Giả lập chưa đăng nhập
    const isLoggedIn = false;
    const userType = '1'; // Giả lập là NTD

    if (!isLoggedIn || userType == '1') {
      setOpenModelLogin(true);
    } else {
      setIsOpenLetter(true);
    }
  };
  // --- KẾT THÚC HÀM GIẢ LẬP ---

  useEffect(() => {
    let rate = (rateInfo?.reduce((acc, obj) => acc + (obj.star * obj.count), 0) / rateInfo?.reduce((acc, obj) => acc + obj.count, 0)).toFixed(1);
    if (rate === "NaN") rate = "0.0"; // Tránh NaN
    if (rate.indexOf('.') === -1) {
      rate += '.0';
    }
    setRateMedium(rate);
    
    // Logic (getCookie) đã bị loại bỏ
    // setIsLogin(getCookie("isLogin") == "true"); 

    // Logic SEO (window.location) đã bị loại bỏ
  }, []);

  useEffect(() => {
    if (isLogin == true) {
      setFitJobLevel(data?.fitJobLevel);
    } else {
      setFitJobLevel(null);
    }
  }, [isLogin]);


  return (
    <>
      {/* <Head> đã bị loại bỏ */}
      <ModalLock />
      <Header />
      {/* <div className={s.position_chat}><BoxChat /></div> */}

      <SearchJobBar listDistrict={listDistrict} listJob={listJob} onClickSearch={handleSearch} />

      <div className={s.body}>
        <div className={s.router}>
          <div className={s.textBlue} onClick={() => navigateToAbout("/")}>Trang chủ</div>
          <div className={s.path}><div><span>›</span></div></div>
          <div className={s.textBlue} onClick={() => navigateToAbout("/tin-tuyen-dung")}>Việc làm {getJobName(data?.new_cat_id)}</div>
          <div className={s.path}><div><span>›</span></div></div>
          <div className={s.text} onClick={() => navigateToAbout("#")}>{data?.new_title}</div>
        </div>

        <div className={s.job_detail_body}>
          <div className={s.grid_collum_1}>
            <DetailInfo 
              detailInfo={detailInfo} 
              isApply={isApply} 
              handleUngTuyenNgay={checkLoginToOpenModelApply} 
              handleLuuTin={handleLuuTin} 
              handleChatNgay={handleChatNgay} 
              isSave={isSave} 
            />
          </div>

          <div className={s.grid_collum_2}>
            <div className={s.job_detail_box_1}>
              <div className={s.job_detail_content_1}>
                <div>
                  <img // <Image> đã được thay bằng <img>
                    src={data?.usc_logo ? handleImageSource(data?.usc_logo) : "/images/candidate/ava_default.jpg"} 
                    alt={"avatar ntd"} 
                    width={60} 
                    height={60} 
                    style={{ height: "60px", width: "60px", borderRadius: "100%", objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/candidate/ava_default.jpg"
                    }}
                  />
                </div>
                <div className={s.content}>
                  <h2 className={s.text}>{data?.usc_company}</h2>
                </div>
              </div>

              <div className={s.job_detail_content_2}>
                <div className={s.item_1}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                     {/* ... (path SVG) ... */}
                     <path d="M6.00017 1.33325C4.2535 1.33325 2.8335 2.75325 2.8335 4.49991C2.8335 6.21325 4.1735 7.59991 5.92017 7.65991C5.9735 7.65325 6.02684 7.65325 6.06684 7.65991C6.08017 7.65991 6.08684 7.65991 6.10017 7.65991C6.10684 7.65991 6.10684 7.65991 6.1135 7.65991C7.82017 7.59991 9.16017 6.21325 9.16684 4.49991C9.16684 2.75325 7.74684 1.33325 6.00017 1.33325Z" fill="#7F878F" />
                     <path d="M9.38664 9.43342C7.52664 8.19342 4.49331 8.19342 2.61997 9.43342C1.77331 10.0001 1.30664 10.7668 1.30664 11.5868C1.30664 12.4068 1.77331 13.1668 2.61331 13.7268C3.54664 14.3534 4.77331 14.6668 5.99997 14.6668C7.22664 14.6668 8.45331 14.3534 9.38664 13.7268C10.2266 13.1601 10.6933 12.4001 10.6933 11.5734C10.6866 10.7534 10.2266 9.99342 9.38664 9.43342Z" fill="#7F878F" />
                     <path d="M13.3268 4.89332C13.4334 6.18666 12.5134 7.31999 11.2401 7.47332C11.2334 7.47332 11.2334 7.47332 11.2268 7.47332H11.2068C11.1668 7.47332 11.1268 7.47332 11.0934 7.48666C10.4468 7.51999 9.8534 7.31332 9.40674 6.93332C10.0934 6.31999 10.4868 5.39999 10.4068 4.39999C10.3601 3.85999 10.1734 3.36666 9.8934 2.94666C10.1468 2.81999 10.4401 2.73999 10.7401 2.71332C12.0468 2.59999 13.2134 3.57332 13.3268 4.89332Z" fill="#7F878F" />
                     <path d="M14.66 11.0599C14.6067 11.7066 14.1933 12.2666 13.5 12.6466C12.8333 13.0132 11.9933 13.1866 11.16 13.1666C11.64 12.7332 11.92 12.1932 11.9733 11.6199C12.04 10.7932 11.6467 9.99994 10.86 9.36661C10.4133 9.01327 9.89333 8.73327 9.32666 8.52661C10.8 8.09994 12.6533 8.38661 13.7933 9.30661C14.4067 9.79994 14.72 10.4199 14.66 11.0599Z" fill="#7F878F" />
                  </svg>
                  <div className={s.text}>Quy mô:</div>
                </div>
                <div className={s.item_2}>{getQuyMo(data?.usc_size)}</div>
              </div>

              <div className={s.job_detail_content_3}>
                <div className={s.item_1}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                     <path d="M13.7468 5.63342C13.0468 2.55342 10.3601 1.16675 8.00006 1.16675C8.00006 1.16675 8.00006 1.16675 7.9934 1.16675C5.64006 1.16675 2.94673 2.54675 2.24673 5.62675C1.46673 9.06675 3.5734 11.9801 5.48006 13.8134C6.18673 14.4934 7.0934 14.8334 8.00006 14.8334C8.90673 14.8334 9.8134 14.4934 10.5134 13.8134C12.4201 11.9801 14.5268 9.07342 13.7468 5.63342ZM8.00006 8.97342C6.84006 8.97342 5.90006 8.03342 5.90006 6.87342C5.90006 5.71342 6.84006 4.77342 8.00006 4.77342C9.16006 4.77342 10.1001 5.71342 10.1001 6.87342C10.1001 8.03342 9.16006 8.97342 8.00006 8.97342Z" fill="#7F878F" />
                  </svg>
                  <div className={s.text}>Địa điểm:</div>
                </div>
                <div className={s.item_2}>{data?.usc_address}</div>
              </div>

              <div className={s.job_detail_content_4}>
                <a href={`/${data?.usc_alias}`} className={s.link}>Xem trang công ty</a>
              </div>
            </div>

            <div className={s.job_detail_box_2}>
              <div className={s.job_detail_content}>
                <h2 className={s.title}>Chi tiết công việc</h2>
                <div>
                  <div className={s.list_tag}>
                    {chiTietCongViec?.map((item, index) => (
                      <div key={index + 1} className={s.tag}>
                        <span className={s.text}>{item?.cat_name}</span>
                      </div>
                    ))}
                    <span className={s.text}>{chiTietCongViec && chiTietCongViec.filter((item) => !!item).length === 0 ? 'Tất cả ngành nghề' : ''}</span>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className={s.job_detail_content}>
                <h2 className={s.title}>Địa điểm làm việc</h2>
                <div>
                  <div className={s.list_tag}>
                    {diaDiemLamViec?.map((item, index) => (
                      <div key={index + 1} className={s.tag}>
                        <span className={s.text}>{item}</span>
                      </div>
                    ))}
                    <span className={s.text}>{diaDiemLamViec?.length == 0 ? 'Toàn quốc' : ''}</span>
                  </div>
                </div>
              </div>

              <div className={s.job_detail_content}>
                <h2 className={s.title}>Địa điểm tuyển dụng</h2>
                <div className={s.list_tag}>
                  <div className={s.tag}>
                    <span className={s.text}> {data?.new_addr}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* (Box Tạo CV AI đã bị comment trong code gốc) */}
          </div>

          <div className={s.grid_collum_1}>
            <RecruitmentDetail 
              recruitmentInfo={recruitmentInfo} 
              isApply={isApply} 
              isSave={isSave} 
              fitJobLevel={fitJobLevel} 
              handleLuuTin={handleLuuTin} 
              handleUngTuyenNgay={checkLoginToOpenModelApply} 
            />
          </div>

          <div className={s.job_detail_box_4}>
            <div className={s.header}>
              <span>Chia sẻ tin tuyển dụng</span>
            </div>
            <a className={s.facebook} href={"https://www.facebook.com"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
                 <g clipPath="url(#clip0_1590_38075)">
                   <path d="M9.29429 10.9025L9.80622 7.65275H6.65274V5.54043C6.65274 4.65183 7.09299 3.78354 8.5008 3.78354H9.95468V1.01619C9.10801 0.881299 8.25249 0.808322 7.39503 0.797852C4.79955 0.797852 3.10507 2.35671 3.10507 5.17483V7.65275H0.228027V10.9025H3.10507V18.7628H6.65274V10.9025H9.29429Z" fill="#7F878F" />
                 </g>
                 <defs>
                   <clipPath id="clip0_1590_38075">
                     <rect width="10" height="19" fill="white" transform="translate(0 0.5)" />
                   </clipPath>
                 </defs>
              </svg>
            </a>
            <a className={s.twitter} href={"https://twitter.com"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                 <g clipPath="url(#clip0_1590_38078)">
                   <path d="M15.9288 2.29435C15.4113 2.50666 14.8672 2.6545 14.3099 2.73421C14.5705 2.69165 14.9538 2.24469 15.1064 2.06378C15.3382 1.7909 15.5148 1.47938 15.6274 1.14504C15.6274 1.12021 15.6534 1.08474 15.6274 1.067C15.6143 1.06017 15.5995 1.05659 15.5846 1.05659C15.5696 1.05659 15.5549 1.06017 15.5418 1.067C14.9367 1.37931 14.2928 1.61767 13.6252 1.77646C13.6019 1.78323 13.5771 1.78384 13.5535 1.77821C13.5299 1.77259 13.5084 1.76094 13.4912 1.74453C13.4392 1.68555 13.3833 1.62986 13.3237 1.57781C13.0514 1.34527 12.7425 1.15494 12.4082 1.01379C11.957 0.837346 11.4696 0.76093 10.9828 0.790317C10.5105 0.818748 10.0494 0.939493 9.62819 1.14504C9.21337 1.36175 8.84879 1.65616 8.55637 2.01057C8.24878 2.37536 8.0267 2.7987 7.90509 3.25211C7.80481 3.68341 7.79344 4.12917 7.8716 4.5646C7.8716 4.63909 7.8716 4.64973 7.80461 4.63909C5.15112 4.26663 2.97399 3.36917 1.19507 1.44301C1.11691 1.35788 1.07598 1.35788 1.01271 1.44301C0.238619 2.56395 0.614499 4.33758 1.58211 5.21375C1.71237 5.33081 1.84635 5.44432 1.98777 5.55074C1.54412 5.52072 1.11131 5.40612 0.714982 5.21375C0.64055 5.16763 0.599613 5.19246 0.595891 5.2776C0.585341 5.39563 0.585341 5.5143 0.595891 5.63233C0.673544 6.19797 0.907417 6.73381 1.27359 7.18504C1.63977 7.63628 2.12511 7.98673 2.67998 8.20054C2.81525 8.25576 2.95619 8.29737 3.10052 8.32469C2.68982 8.40176 2.26859 8.41375 1.85379 8.36017C1.76447 8.34243 1.73098 8.38855 1.76447 8.47013C2.31154 9.88904 3.49873 10.3218 4.36958 10.563C4.48867 10.5808 4.60776 10.5808 4.74174 10.6091C4.74174 10.6091 4.74174 10.6091 4.71941 10.6304C4.46262 11.0774 3.4243 11.3789 2.94794 11.535C2.07845 11.8326 1.15142 11.9464 0.231175 11.8684C0.0860336 11.8471 0.0525391 11.8507 0.0153232 11.8684C-0.0218927 11.8861 0.0153232 11.9252 0.0562607 11.9606C0.24234 12.0777 0.42842 12.1806 0.621942 12.2799C1.19806 12.5794 1.80713 12.8173 2.43808 12.9893C5.70563 13.8478 9.38256 13.2164 11.8351 10.8929C13.7629 9.06962 14.4402 6.55461 14.4402 4.03606C14.4402 3.94028 14.563 3.88353 14.6337 3.83386C15.1214 3.47165 15.5514 3.04389 15.9102 2.56395C15.9724 2.4924 16.0042 2.40132 15.9996 2.30854C15.9996 2.25534 15.9996 2.26598 15.9288 2.29435Z" fill="#7F878F" />
                 </g>
                 <defs>
                   <clipPath id="clip0_1590_38078">
                     <rect width="16" height="13" fill="white" transform="translate(0 0.5)" />
                   </clipPath>
                 </defs>
              </svg>
            </a>
            <a className={s.instagram} href={"https://www.instagram.com"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                 <g clipPath="url(#clip0_1590_38081)">
                   <path d="M4.27512 15.3558V5.33137H0.845235V15.3558H4.27512ZM2.56089 3.96294C3.75672 3.96294 4.50119 3.19318 4.50119 2.2312C4.47881 1.2473 3.75672 0.499023 2.58363 0.499023C1.40975 0.499023 0.643066 1.2473 0.643066 2.23111C0.643066 3.19309 1.38728 3.96285 2.53842 3.96285L2.56089 3.96294ZM6.17361 15.3558H9.60323V9.75832C9.60323 9.45911 9.62561 9.15912 9.71622 8.94542C9.96405 8.34657 10.5284 7.72668 11.4761 7.72668C12.7169 7.72668 13.2135 8.64586 13.2135 9.9936V15.3558H16.6431V9.60811C16.6431 6.52916 14.9512 5.09636 12.6947 5.09636C10.8446 5.09636 10.0321 6.10087 9.58067 6.78505H9.6035V5.33172H6.17379C6.21856 6.27213 6.17361 15.3558 6.17361 15.3558Z" fill="#7F878F" />
                 </g>
                 <defs>
                   <clipPath id="clip0_1590_38081">
                     <rect width="17" height="15" fill="white" transform="translate(0.5 0.5)" />
                   </clipPath>
                 </defs>
              </svg>
            </a>
            <a className={s.linked} href={"#"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.8832 9.11621C12.7582 10.9912 12.7582 14.0245 10.8832 15.8912C9.00821 17.7579 5.97487 17.7662 4.10821 15.8912C2.24154 14.0162 2.23321 10.9829 4.10821 9.11621" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.8248 11.1754C6.8748 9.22539 6.8748 6.05873 8.8248 4.10039C10.7748 2.14206 13.9415 2.15039 15.8998 4.10039C17.8581 6.05039 17.8498 9.21706 15.8998 11.1754" stroke="#292D32" strokeWidth="1.s" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* (Các box Comment, RateStar, SuggestWork, JobGuide đã bị comment trong code gốc) */}
        </div>
      </div>

      {/* Modal Thư ứng tuyển */}
      <div>
        <div className={isOpenLetter ? s.modal_mask : s.displayNone}></div>
        <div className={isOpenLetter ? s.modal_wrap : s.displayNone}>
          <div className={s.modal_rate}>
            <div className={s.modal_content}>
              <div className={s.title}>
                <span>Bạn có muốn viết thư giới thiệu cho nhà tuyển dụng không ?</span>
                <svg onClick={handleCloseLetter} style={{ zIndex: "1", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" fill="none">
                  <rect width="1.43075" height="29.3304" rx="0.715376" transform="matrix(0.715183 0.698937 -0.715183 0.698937 20.9766 0)" fill="#474747" />
                  <rect width="1.43075" height="29.3304" rx="0.715376" transform="matrix(-0.715183 0.698937 -0.715183 -0.698937 22 21)" fill="#474747" />
                </svg>
              </div>
              <div className={s.letter_body}>
                <span className={s.letter_body_title}>THƯ GIỚI THIỆU</span>
                <textarea 
                  name="content" 
                  className={s.letter_body_content} 
                  placeholder={data?.placeholderLetter}
                  onChange={(e) => setContentApply(e.target.value)}
                ></textarea>
              </div>

              <div style={{ width: "469px", marginTop: "135px", display: "flex", justifyContent: "center" }} className={s.groupDiv}>
                <div className={s.groupButton}>
                  <button onClick={handleCloseLetter} className={s.cancelButton}>Hủy</button>
                  <button onClick={() => handleGuiThuUngTuyen(data.new_id)} className={s.button_ung_tuyen}>Ứng tuyển</button>
                </div>
              </div>

              <div className={s.textThank}>Thanks for watching!</div>
              <img // <Image> đã được thay bằng <img>
                src={"/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/letter.png"} 
                alt={"letter envelope"} 
                height={700} 
                width={700} 
                className={s.imageLetter}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Login
        isOpenSignIn={openModelLogin}
        handleCancelSignIn={() => setOpenModelLogin(false)}
        successType={actionType}
        idNew={idNew}
      />

      {/* <Footer /> */}
    </>
  );
};

export default JobDetail;