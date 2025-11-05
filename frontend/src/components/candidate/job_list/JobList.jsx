/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import s from "./styles.module.scss";

// --- GIẢ LẬP CÁC COMPONENT CON ---
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
const Footer = () => <div style={{ background: '#f0f0f0', padding: 20, textAlign: 'center', marginTop: 20 }}>Đây là Footer (Mẫu)</div>;
const Header = () => <div style={{ background: '#f0f0f0', padding: 20, textAlign: 'center', fontWeight: 'bold' }}>Đây là Header (Mẫu)</div>;
const ChiTietTinTuyenDung = ({ newsDetail, handleCloseSeeNow, handleLuuTin, handleUngTuyenNgay }) => (
  <div style={{ padding: 20, border: '1px solid #ccc', borderRadius: 5 }}>
    <button onClick={() => handleCloseSeeNow(false, 0)}>Đóng Chi Tiết</button>
    <h3>{newsDetail.new_title} (Chi tiết)</h3>
    <p>{newsDetail.usc_company}</p>
    <div dangerouslySetInnerHTML={{ __html: newsDetail.infoDetail[0].content }} />
    <button onClick={() => handleUngTuyenNgay(newsDetail.new_id)}>Ứng tuyển</button>
    <button onClick={() => handleLuuTin(newsDetail.new_id)}>Lưu tin</button>
  </div>
);
const Search = ({ total, listCity, listJob, listExp, listSalary, listLevel, listWorkForm, onClickSearch }) => (
  <div style={{ background: '#e9e9e9', padding: 15, margin: '20px 0', borderRadius: 8 }}>
    <p>Đây là thanh Search (Mẫu). Tổng: {total} tin.</p>
    <button onClick={() => onClickSearch('Keyword mẫu', 1, 0, 0, 0, 0, 0, 0)}>Tìm kiếm Mẫu</button>
  </div>
);
const TinTuyenDung = ({ workInfo, handleSeeNow, handleUngTuyenNgay }) => (
  <div>
    {workInfo.map(item => (
      <div key={item.new_id} data-id={item.new_id} style={{ border: '1px solid #eee', padding: 10, margin: '10px 0', borderRadius: 5 }}>
        <h4>{item.new_title}</h4>
        <p>{item.usc_company}</p>
        <button onClick={() => handleSeeNow(true, item.new_id)}>Xem ngay</button>
        <button onClick={() => handleUngTuyenNgay(item.new_id)}>Ứng tuyển</button>
      </div>
    ))}
  </div>
);
const TuKhoaLienQuan = () => <div style={{ padding: 20, background: '#f9f9f9', margin: '20px 0' }}>Đây là Từ khóa liên quan (Mẫu)</div>;
const ModalLock = () => null;
// --- KẾT THÚC GIẢ LẬP COMPONENT ---


// --- DỮ LIỆU MẪU (Mock Data) & HÀM GIẢ LẬP (Stubs) ---
const mockData = {
  data: [
    { 
      new_id: 1001, 
      new_title: 'Nhân Viên Kinh Doanh (Việc Làm Mẫu)', 
      new_alias: 'nhan-vien-kinh-doanh-viec-lam-mau', 
      new_money: 1, new_money_type: 1, new_money_from: 15000000, new_money_to: 20000000,
      new_city: '1,45', 
      new_qh_id: '10,120',
      new_addr: 'Số 123, Đường ABC, Quận Cầu Giấy, Hà Nội',
      new_han_nop: Date.now() / 1000 + 1000000, 
      new_create_time: Date.now() / 1000 - 50000,
      new_update_time: Date.now() / 1000 - 10000,
      new_cat_id: [9], 
      usc_logo: '/images/company-logo-mock.png', 
      usc_company: 'Công Ty TNHH Mẫu A',
      usc_phone: '0987654321',
      usc_mail: 'email@congtya.com',
      usc_alias: 'cong-ty-tnhh-mau-a',
      checkUngTuyen: false,
      checkLuuTin: false,
      infoDetail: [
        { title: 'Mô tả công việc', content: '<p>Mô tả chi tiết công việc mẫu...</p>' },
        { title: 'Yêu cầu công việc', content: '<p>Yêu cầu chi tiết công việc mẫu...</p>' }
      ]
    },
    { 
      new_id: 1002, 
      new_title: 'Lập Trình Viên ReactJS (Việc Làm Mẫu)', 
      new_alias: 'lap-trinh-vien-reactjs-viec-lam-mau', 
      new_money: 0, new_money_type: 0, new_money_from: 0, new_money_to: 0,
      new_city: '26', 
      new_qh_id: '150',
      new_addr: 'Số 456, Đường XYZ, Quận Hải Châu, Đà Nẵng',
      new_han_nop: Date.now() / 1000 + 2000000, 
      new_create_time: Date.now() / 1000 - 80000,
      new_update_time: Date.now() / 1000 - 20000,
      new_cat_id: [13], 
      usc_logo: '/images/company-logo-mock.png', 
      usc_company: 'Công Ty Cổ Phần Mẫu B',
      usc_phone: '0123456789',
      usc_mail: 'hr@congtyb.com',
      usc_alias: 'cong-ty-co-phan-mau-b',
      checkUngTuyen: true,
      checkLuuTin: false,
      infoDetail: [
        { title: 'Mô tả công việc', content: '<p>Mô tả chi tiết công việc IT...</p>' },
        { title: 'Yêu cầu công việc', content: '<p>Yêu cầu chi tiết công việc IT...</p>' }
      ]
    },
  ],
  listDistrict: [
    { value: 10, label: 'Quận Cầu Giấy' }
  ],
  total: 2,
  isCvExist: true,
  placeholderLetter: "Viết thư giới thiệu của bạn ở đây..."
};

const mockSeo = {
  seo_tt: 'Tuyển dụng, tìm việc làm hay (Mock Data)',
  seo_des: 'Tìm việc làm một cách nhanh chóng và hiệu quả (Mock Data).',
  seo_canonical: 'https://job247.vn/tin-tuyen-dung',
  schema: { "@context": "https://schema.org", "@type": "ItemPage" },
  allowIndex: true
};

const city_array = [
  { cit_id: 0, cit_name: 'Toàn quốc', cit_parent: 0 },
  { cit_id: 1, cit_name: 'Hà Nội', cit_parent: 0 },
  { cit_id: 45, cit_name: 'Hồ Chí Minh', cit_parent: 0 },
  { cit_id: 26, cit_name: 'Đà Nẵng', cit_parent: 0 },
  { cit_id: 10, cit_name: 'Quận Cầu Giấy', cit_parent: 1 },
  { cit_id: 120, cit_name: 'Quận 1', cit_parent: 45 },
  { cit_id: 150, cit_name: 'Quận Hải Châu', cit_parent: 26 },
];
const getDistrict = (cityId) => city_array.filter(c => c.cit_parent === cityId).map(c => ({ value: c.cit_id, label: c.cit_name }));
const getCityName = (id) => city_array.find(c => c.cit_id === id)?.cit_name || "";
const getDistrictName = (id) => city_array.find(c => c.cit_id === id)?.cit_name || "";
const getJob = () => [
  { value: 9, label: 'Kinh doanh' },
  { value: 13, label: 'IT Phần mềm' }
];
const getMucLuong = (type, from, to, money) => {
  if (type === 1) return `${from/1000000} - ${to/1000000} triệu`;
  if (money > 0) return `${money/1000000} triệu`;
  return "Thỏa thuận";
};
const getDate = (timestamp) => new Date(timestamp * 1000).toLocaleDateString('vi-VN');
const getKeyTag = () => [
  { key_id: 1, key_name: 'Việc làm IT', key_link: 'viec-lam-it' },
  { key_id: 2, key_name: 'Việc làm Kế toán', key_link: 'viec-lam-ke-toan' },
];
const listHinhThucFilter = [{ value: 0, label: 'Tất cả hình thức' }, { value: 1, label: 'Full-time' }];
const listHocVanFilter = [{ value: 0, label: 'Tất cả trình độ' }, { value: 1, label: 'Đại học' }];
const listKinhNghiemFilter = [{ value: 0, label: 'Tất cả kinh nghiệm' }, { value: 1, label: '1 năm' }];
const listMucLuongFilter = [{ value: 0, label: 'Tất cả mức lương' }, { value: 1, label: '10 - 15 triệu' }];
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
const createLinkTilte2 = (title) => title ? title.toLowerCase().replace(/ /g, '-') : 'mock-alias';
// --- KẾT THÚC Mock Data & Stubs ---


export default function JobList() {
  
  // Sử dụng mock data thay vì props
  const data = mockData;
  const seo = mockSeo;
  
  const totalItem = Math.ceil(data?.data?.length / 20);

  // (useContext và useRouter đã bị loại bỏ)

  const [total, setTotal] = useState(data?.total || 0);
  const [totalHuyHieu, setTotalHuyHieu] = useState(50); // Mock
  const [listCity, setListCity] = useState([
    { cit_id: 0, cit_name: "Toàn quốc" },
    ...city_array.filter((item) => item.cit_parent === 0)
  ]);
  const [nameCity, setNameCity] = useState("Hà Nội"); // Mock
  const [nameJob, setNameJob] = useState('Việc Làm Mẫu'); // Mock
  const [listDistrict, setListDistrict] = useState(data?.listDistrict);
  const [pageSize, setPageSize] = useState(20);
  const [listJob, setListJob] = useState([
    { value: 0, label: "Tất cả ngành nghề" },
    ...getJob()
  ]);
  const [isOpenLetter, setIsOpenLetter] = useState(false);
  const [workInfo, setWorkInfo] = useState(data?.data);
  const [totalPage, setTotalPage] = useState(totalItem);
  const [idNews, setIdNews] = useState(0);
  const [newsDetail, setNewsDetail] = useState(null); // Khởi tạo là null
  const [keyTag, setKeyTag] = useState(getKeyTag());
  const [seeNow, setSeeNow] = useState(false);
  const [choice, setChoice] = useState("1");
  const [loading, setLoading] = useState(false);

  const [openModelLogin, setOpenModelLogin] = useState(false);

  // form
  const [keySearch, setKeySearch] = useState("name");
  const [address, setAddress] = useState("address");
  
  const [idNew, setIdNew] = useState(0);
  const [contentApply, setContentApply] = useState('');

  const [actionType, setActionType] = useState(0); // 1 - save | 2 - apply

  const [listSelect, setListSelect] = useState([
    { value: "1", label: "Liên quan" },
    { value: "2", label: "Ngày đăng" },
    { value: "3", label: "Cập nhật gần nhất" },
    { value: "4", label: "Lương cao đến thấp" }
  ]);

  const [seo_tt, setSeo_tt] = useState(seo?.seo_tt);
  const [seo_des, setSeo_des] = useState(seo?.seo_des);
  const [seo_canonical, setSeo_canonical] = useState(seo?.seo_canonical);
  const [schema, setSchema] = useState(seo?.schema || {});

  const [openModalCheckAuth, setOpenModalCheckAuth] = useState(false);

  const [lastId, setLastId] = useState(0);
  const [isCvExist, setIsCvExist] = useState(data?.isCvExist);

  const denyAuth = () => {
    setOpenModalCheckAuth(false);
  };
  const acceptAuth = () => {
    setOpenModalCheckAuth(false);
    // router.push('/ma-otp'); // Bị loại bỏ
    alert("Chuyển đến trang OTP (Logic đã bị loại bỏ)");
  };

  const handleRadioChange = (value) => {
    if (value == 1) {
      setWorkInfo(data?.data);
    } else if (value == 2) {
      const dataFlowDate = [...data?.data].sort( // Clone mảng trước khi sort
        (a, b) => b.new_create_time - a.new_create_time
      );
      setWorkInfo(dataFlowDate);
    } else if (value == 3) {
      const dataFlowDate = [...data?.data].sort( // Clone mảng
        (a, b) => b.new_update_time - a.new_update_time
      );
      setWorkInfo(dataFlowDate);
    } else if (value == 4) {
      const dataFlowDate = [...data?.data].sort( // Clone mảng
        (a, b) => b.new_money - a.new_money
      );
      setWorkInfo(dataFlowDate);
    }
    setChoice(value);
  };

  const convertCityName = (cityNumber) => {
    if (cityNumber == 0) {
      setNameCity("");
    } else {
      const city = listCity.find((city) => city.cit_id == cityNumber);
      if (city) {
        setNameCity(city.cit_name);
      }
    }
  };

  const handleUngTuyenNgay = (id) => {
    setIdNew(id);
    setActionType(2);
    
    // Giả lập logic kiểm tra đăng nhập
    const isLoggedIn = false; // Thay đổi thành true để test
    const userType = '2'; // '1' = NTD, '2' = UV

    if (!isLoggedIn || userType == '1') {
      setOpenModelLogin(true);
    } else {
      if (isCvExist) {
        setIsOpenLetter(true);
      } else if (confirm('Bạn chưa hoàn thiện hồ sơ. Hoàn thiện ngay?')) {
        if (confirm('Tạo CV Online?')) {
          window.location.href = '/mau-cv-xin-viec';
        } else if (confirm('Đăng tải hồ sơ?')) {
          window.location.href = '/ung-vien/tai-len-ho-so';
        }
      }
    }
  };

  const handleGuiThuUngTuyen = async () => {
    // const response = await POST('candidate/ApplyJob', ... ) // Bị loại bỏ
    alert('Ứng tuyển thành công! (Mock)');
    setNewsDetail({ ...newsDetail, checkUngTuyen: true });
    setIsOpenLetter(false);
    setWorkInfo(workInfo.map((item) => {
      if (item?.new_id === idNew) {
        return { ...item, checkUngTuyen: true };
      } else {
        return item;
      }
    }));
  };

  const handleCloseLetter = () => {
    setIsOpenLetter(false);
  };

  const handleChatNgay = () => {
    console.log("Chat ngay thành công");
  };

  const handleLuuTin = async (id) => {
    // const response = await POST('candidate/SaveNew', { id_tin: id }) // Bị loại bỏ
    
    // Giả lập chưa đăng nhập
    const isLoggedIn = false; // Thay đổi thành true để test
    if (!isLoggedIn) {
        // window.location.href = '/dang-nhap-ung-vien' // Logic gốc
        alert("Chuyển đến trang đăng nhập UV! (Logic đã bị loại bỏ)");
        return;
    }

    // Giả lập đã đăng nhập
    setNewsDetail({ ...newsDetail, checkLuuTin: true });
    setWorkInfo(workInfo.map((item) => { // Cập nhật cả danh sách
      if (item?.new_id === id) {
        return { ...item, checkLuuTin: true };
      } else {
        return item;
      }
    }));
    alert('Lưu tin thành công! (Mock)');
  };

  const handleTaoCv = () => {
    console.log("Tạo CV ngay");
  };

  const handleSeeNow = (status, id) => {
    setIdNews(id);
    setSeeNow(status);
  };

  const handleSearch = (
    keyword, selectCity, selectDistrict, selectJob, 
    selectExp, selectSalary, selectLevel, selectWorkForm
  ) => {
    setNewsDetail(null);
    setSeeNow(false);
    setIdNews(0);
    
    // Logic router.push đã bị loại bỏ
    alert(`Đang tìm kiếm với: ${keyword}, City: ${selectCity}, Job: ${selectJob}... (Logic đã bị loại bỏ)`);
  };

  const handleChangeCity = (city) => {
    if (city > 0) {
      setListDistrict(getDistrict(city)); // Dùng hàm stub
    } else {
      setListDistrict([]);
    }
  };

  const handleChangePage = (page) => {
    // Logic router.push đã bị loại bỏ
    alert(`Chuyển đến trang ${page} (Logic đã bị loại bỏ)`);
  };

  const navigateToAbout = (route) => {
    window.location.href = route;
  };

  const listCityText = (listCity) => {
    const textCitys = [];
    listCity.map((c) => {
      city_array.map((city) => {
        if (city.cit_id == c) {
          textCitys.push(city.cit_name);
        }
      });
    });
    return textCitys.join(', '); // Nối mảng
  };

  const getDistrictText = (listDistrictNumber) => {
    const textDistricts = [];
    listDistrictNumber.map((num) => {
      textDistricts.push(getDistrictName(Number(num)));
    });
    return textDistricts.join(', '); // Nối mảng
  };

  // useEffect cho idNews (UI logic, giữ nguyên)
  useEffect(() => {
    if (idNews !== undefined) {
      if (idNews) {
        setLastId(idNews);
      }
      let item = workInfo?.find((item) => item.new_id === idNews);
      setNewsDetail(item || null);
    }
  }, [workInfo, idNews]);

  // useEffect cho scroll (UI logic, giữ nguyên)
  useEffect(() => {
    const elementToScroll = idNews 
      ? document.querySelector(`[data-id="${idNews}"]`)
      : document.querySelector(`[data-id="${lastId}"]`);

    if (elementToScroll) {
      elementToScroll.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [newsDetail, idNews, lastId]); // Đã thêm idNews và lastId vào dependencies

  // useEffect chính (Đơn giản hóa, loại bỏ URL parsing)
  useEffect(() => {
    convertCityName(1); // Hà Nội
    setNameJob("Việc Làm Mẫu");

    setWorkInfo(data?.data);
    setTotal(data?.total);
    setTotalPage(Math.round(data?.total / 20));
    // setTotalHuyHieu(mockTotalHuyHieu); // Dùng mock
    
    handleRadioChange(choice);
  }, [data]); // Chỉ phụ thuộc vào data (mock)


  return (
    <>
      {/* <Head> đã bị loại bỏ */}
      <ModalLock />
      <Spin size="large" spinning={loading}>
        <Header />

        {address && (
          <Search
            changeCity={handleChangeCity}
            keySearch={keySearch}
            address={address}
            onClickSearch={handleSearch}
            total={total}
            totalHuyHieu={totalHuyHieu}
            listCity={listCity}
            listDistrict={listDistrict}
            listJob={listJob}
            listExp={listKinhNghiemFilter}
            listSalary={listMucLuongFilter}
            listLevel={listHocVanFilter.filter((item) => item.value !== -1)}
            listWorkForm={listHinhThucFilter}
            setLoading={setLoading}
          />
        )}

        <div className={s.body}>
          <div className={s.router} style={{ marginTop: "15px" }}>
            <div className={s.textBlue} onClick={() => navigateToAbout("/")}>
              Trang chủ
            </div>
            <div className={s.path}>
              <div>
                <span>›</span>
              </div>
            </div>
            <div className={s.text}>
              Tuyển dụng, tìm việc làm{nameJob && ` ${nameJob}`}{nameCity && ` tại ${nameCity}`}
            </div>
          </div>
          <div className={s.header} style={{ marginTop: "unset" }}>
            <h1>Tuyển Dụng, Tìm Việc Làm{nameJob && ` ${nameJob}`}{nameCity && ` Tại ${nameCity}`}{!nameJob && !nameCity && ` Hấp Dẫn Nhất`}</h1>
          </div>

          <div className={s.box_news_1}>
            <h2 style={{
              color: "#474747",
              fontFamily: "Roboto",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              marginBottom: '20px'
            }}>Tin mới nhất:</h2>
            {!(data?.total > 0) && <div
              style={{
                textAlign: 'center',
                color: '#474747',
                opacity: "0.5",
                gridColumn: 1,
                fontFamily: "Roboto",
                margin:"10px 0 10px 16px",
              }}
            >Đang cập nhật</div>}
            <div className={s.grid_item_2}>
              <div
                className={
                  seeNow
                    ? (window.innerWidth < 920 ? s.grid_hide : s.grid_show)
                    : s.grid_hide
                }
              >
                {data?.total > 0 && (
                  <TinTuyenDung
                    pageSize={pageSize}
                    total={data?.total}
                    workInfo={workInfo}
                    totalPage={totalPage}
                    seeNow={seeNow}
                    newId={idNews}
                    handleChatNgay={handleChatNgay}
                    handleUngTuyenNgay={handleUngTuyenNgay}
                    handleSeeNow={handleSeeNow}
                    handleChangePage={handleChangePage}
                    newsDetail={newsDetail}
                  />
                )}

                <div className={s.grid_item_detail}>
                  {newsDetail && (
                    <ChiTietTinTuyenDung
                      newsDetail={newsDetail}
                      handleCloseSeeNow={handleSeeNow}
                      handleLuuTin={handleLuuTin}
                      handleChatNgay={handleChatNgay}
                      handleUngTuyenNgay={handleUngTuyenNgay}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={seeNow === false ? s.grid_item_1 : s.displayNone}>
              {/* Các component bị comment đã được giữ nguyên */}
            </div>
          </div>

          <div>
            <TuKhoaLienQuan keyTag={keyTag} />
          </div>

          <div className={s.box_news_2}>
            <div className={s.grid_item_2} style={{
              transition: 'all 0.5s'
            }}>
              {/* <Blog contentBlog={contentBlog} /> */}
            </div>
          </div>
        </div>

        {/* Modal Thư giới thiệu */}
        <div>
          <div className={isOpenLetter ? s.modal_mask : s.displayNone}></div>
          <div className={isOpenLetter ? s.modal_wrap : s.displayNone}>
            <div className={s.modal_rate}>
              <div className={s.modal_content}>
                <div className={s.title}>
                  <span>
                    Bạn có muốn viết thư giới thiệu cho nhà tuyển dụng không ?
                  </span>
                  <svg
                    onClick={handleCloseLetter}
                    style={{ zIndex: "1", cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <rect
                      width="1.43075"
                      height="29.3304"
                      rx="0.715376"
                      transform="matrix(0.715183 0.698937 -0.715183 0.698937 20.9766 0)"
                      fill="#474747"
                    />
                    <rect
                      width="1.43075"
                      height="29.3304"
                      rx="0.715376"
                      transform="matrix(-0.715183 0.698937 -0.715183 -0.698937 22 21)"
                      fill="#474747"
                    />
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

                <div
                  style={{
                    width: "469px",
                    marginTop: "135px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                  className={s.groupDiv}
                >
                  <div className={s.groupButton}>
                    <button
                      onClick={handleCloseLetter}
                      className={s.cancelButton}
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleGuiThuUngTuyen}
                      className={s.button_ung_tuyen}
                    >
                      Ứng tuyển
                    </button>
                  </div>
                </div>

                <div className={s.textThank}>Thanks for watching!</div>
                <img
                  src={
                    "/images/nha-tuyen-dung/chi-tiet-tin-tuyen-dung/letter.png"
                  }
                  alt={""}
                  height={700}
                  width={700}
                  className={s.imageLetter}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal chi tiết (Mobile) */}
        {newsDetail && (
          <div>
            <div className={seeNow ? s.modal_mask_1 : s.displayNone}></div>
            <div className={seeNow ? s.modal_wrap_1 : s.displayNone}>
              <div className={s.modal_see_more}>
                <div className={s.groupHeader}>
                  <div className={s.header}>
                    <span>{newsDetail?.new_title}</span>
                    <svg
                      onClick={() => {
                        {
                          handleSeeNow(false, 0);
                        }
                      }}
                      style={{
                        cursor: "pointer"
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect width="32" height="32" rx="16" fill="#F0F0F0" />
                      <path
                        d="M20.5281 22.7103L16 18.1822L11.4719 22.7103C11.2317 22.9505 10.9059 23.0855 10.5663 23.0855C10.2266 23.0855 9.90084 22.9505 9.66066 22.7103C9.42047 22.4702 9.28554 22.1444 9.28554 21.8047C9.28553 21.4651 9.42047 21.1393 9.66066 20.8991L14.1888 16.371L9.66065 11.8429C9.42047 11.6027 9.28553 11.2769 9.28553 10.9373C9.28553 10.5976 9.42047 10.2718 9.66065 10.0317C9.90084 9.79147 10.2266 9.65653 10.5663 9.65653C10.9059 9.65653 11.2317 9.79147 11.4719 10.0317L16 14.5598L20.5281 10.0317C20.7683 9.79147 21.0941 9.65653 21.4337 9.65653C21.7734 9.65653 22.0992 9.79147 22.3393 10.0317C22.5795 10.2718 22.7145 10.5976 22.7145 10.9373C22.7145 11.2769 22.5795 11.6027 22.3393 11.8429L17.8112 16.371L22.3393 20.8991C22.5795 21.1393 22.7145 21.4651 22.7145 21.8047C22.7145 22.1444 22.5795 22.4702 22.3393 22.7103C22.0992 22.9505 21.7734 23.0855 21.4337 23.0855C21.0941 23.0855 20.7683 22.9505 20.5281 22.7103Z"
                        fill="#8B8B8B"
                      />
                    </svg>
                  </div>

                  <div className={s.info}>
                    <div className={s.item_info}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                         {/* ... (path SVG) ... */}
                      </svg>
                      {getMucLuong(
                        newsDetail?.new_money_type,
                        newsDetail?.new_money_from,
                        newsDetail?.new_money_to,
                        newsDetail?.new_money
                      )}
                    </div>
                    <div className={s.item_info}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                         {/* ... (path SVG) ... */}
                      </svg>
                      {newsDetail?.new_city && listCityText(newsDetail?.new_city.split(',').map(Number))}
                    </div>
                    <div className={s.item_info}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                         {/* ... (path SVG) ... */}
                      </svg>
                      {getDate(newsDetail?.new_update_time)}
                    </div>
                  </div>

                  <div className={s.group_button_info}>
                    <div className={s.group_button}>
                      {newsDetail?.checkUngTuyen ?
                        <button className={s.buttonBlue}>
                          Đã ứng tuyển
                        </button>
                        :
                        <button
                          className={s.buttonBlue}
                          onClick={() => handleUngTuyenNgay(newsDetail?.new_id)}
                        >
                          Ứng tuyển
                        </button>
                      }
                      {newsDetail?.checkLuuTin ?
                        <div className={s.buttonSave}>
                          Đã lưu
                        </div>
                        :
                        <button className={s.buttonSave} onClick={() => handleLuuTin(newsDetail?.new_id)}>
                          Lưu tin
                        </button>
                      }
                    </div>
                    <span
                      className={s.chi_tiet_tin}
                      onClick={() =>
                        navigateToAbout(
                          `/${createLinkTilte2(newsDetail?.new_alias)}-${newsDetail?.new_id}`
                        )
                      }
                    >
                      Chi tiết tin đăng {`>`}
                    </span>
                  </div>
                </div>
                <div className={s.group_info_text}>
                  {newsDetail?.infoDetail?.map((item, index) => {
                    return (
                      <div key={index} className={s.item_info_text}>
                        <div className={s.title}>{item.title}</div>
                        {/* Thay <pre> bằng <div> để CSS xử lý xuống dòng */}
                        <div className={s.content} dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                    );
                  })}
                  <div className={s.item_info_text}>
                    <div className={s.title}>Thông tin liên hệ</div>
                    <div className={s.content}>
                      Tên người liên hệ: {newsDetail?.usc_company}
                    </div>
                    <div className={s.content}>
                      Địa chỉ liên hệ: {newsDetail?.new_addr}
                    </div>
                    <div className={s.content}>
                      Số điện thoại liên hệ:{" "}
                      {newsDetail?.usc_phone && newsDetail?.usc_phone !== ""
                        ? newsDetail?.usc_phone
                        : "Chưa cập nhật"}
                    </div>
                    <div className={s.content}>
                      Email liên hệ:{" "}
                      {newsDetail?.usc_mail && newsDetail?.usc_mail !== ""
                        ? newsDetail?.usc_mail
                        : "Chưa cập nhật"}
                    </div>
                  </div>

                  <div className={s.item_info_text}>
                    <div className={s.title}>Địa điểm làm việc</div>
                    <div className={s.group_content} style={{ flexDirection: 'column' }}>
                      <div className={s.city}>
                        Tỉnh thành:
                        <div className={s.tag}>
                          {newsDetail?.new_city && listCityText(newsDetail?.new_city.split(',').map(Number))}
                        </div>
                      </div>
                      <div className={s.district}>
                        Quận huyện:
                        <div className={s.tag}>
                          {newsDetail?.new_qh_id && getDistrictText(newsDetail?.new_qh_id.split(',').map(Number))}
                        </div>
                      </div>
                    </div>
                    <div className={s.content_1}>
                      <div className={s.text_1}>Địa chỉ chi tiết: {newsDetail?.new_addr}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Login
          isOpenSignIn={openModelLogin}
          handleCancelSignIn={() => setOpenModelLogin(false)}
          successType={actionType}
          idNew={idNew}
        />

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
            <div>Bạn cần phải xác thực số điện thoại để ứng tuyển</div>
            <div>Xác thực OTP ngay?</div>
          </div>
        </Modal>

        <Footer />
      </Spin>
    </>
  );
}