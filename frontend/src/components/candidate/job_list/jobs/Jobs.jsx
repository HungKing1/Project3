import React, { useContext, useState, useEffect, useRef } from 'react';
import { Popover } from 'antd';
import Pagination from '../../../Pagination';
import s from './styles.module.scss'; // Giả định file CSS này tồn tại
import { useNavigate } from 'react-router-dom';

// --- HÀM GIẢ LẬP (Stubs) ---
const city_array = [
  { cit_id: 0, cit_name: 'Toàn quốc', cit_parent: 0 },
  { cit_id: 1, cit_name: 'Hà Nội', cit_parent: 0 },
  { cit_id: 45, cit_name: 'Hồ Chí Minh', cit_parent: 0 },
];
const getMucLuong = (type, from, to, money) => {
  if (type === 1) return `${from / 1000000} - ${to / 1000000} triệu`;
  if (money > 0) return `${money / 1000000} triệu`;
  return "Thỏa thuận";
};
const getHanNop = (timestamp) => {
    const daysLeft = Math.round((timestamp - Date.now()/1000) / 86400);
    if (daysLeft <= 0) return "Đã hết hạn";
    return `Còn ${daysLeft} ngày`;
};
const getTimeCapNhat = (timestamp) => {
    const minutesLeft = Math.round((Date.now()/1000 - timestamp) / 60);
    if (minutesLeft < 60) return `${minutesLeft} phút trước`;
    return `${Math.round(minutesLeft / 60)} giờ trước`;
};
const handleImageSource = (src) => src || "/images/candidate/ava_default.jpg";
const createLinkTilte2 = (title) => title ? title.toLowerCase().replace(/ /g, '-') : 'mock-alias';
const checkLoginServerSide = () => false; // Giả lập chưa đăng nhập
// ---

const Jobs = ({
  pageSize,
  total,
  workInfo,
  totalPage,
  seeNow,
  newId,
  handleChatNgay,
  handleUngTuyenNgay,
  handleSeeNow,
  handleChangePage,
}) => {
  // (useContext đã bị loại bỏ)
  const [idHover, setIdHover] = useState(0);
  const [idSeeNow, setIdSeeNow] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverVisible1, setPopoverVisible1] = useState(false);
  const [totalPageCurrent, setTotalPageCurrent] = useState();
  const [changeId, setChangeId] = useState(0);
  const [copyData, setCopyData] = useState([]);
  // (useRouter đã bị loại bỏ)

  const handleSetIdHover = (id) => {
    setIdHover(id);
  };

  const handleSetIdSeeNow = (id) => {
    setIdSeeNow(id);
  };

  const handleXem = () => {
    console.log("Xem >>");
  };

  const handleTitleMouseEnter = () => {
    setPopoverVisible(true);
  };

  const handleTitleMouseLeave = () => {
    setPopoverVisible(false);
  };

  const handleTitleMouseEnter1 = () => {
    setPopoverVisible1(true);
  };

  const handleTitleMouseLeave1 = () => {
    setPopoverVisible1(false);
  };

  // Hàm này thêm thuộc tính 'isActive' để highlight tin đang chọn
  const addPropertyIsShow = (numberChoose) => {
    if (numberChoose == 0) {
      let copy = [...workInfo];
      copy.map((work) => {
        work.isActive = false;
      });
      setCopyData(copy);
    } else {
      let copy = [...workInfo];
      copy.map((work) => {
        if (work.new_id == numberChoose) {
          work.isActive = true;
        } else {
          work.isActive = false;
        }
      });
      setCopyData(copy);
    }
  };

  const handleFirstUT = (id) => {
    // Giả lập chưa đăng nhập
    const isLoggedIn = false; 
    if (isLoggedIn) {
      // Đã đăng nhập
    } else {
      // setCookie("urlUt", router.asPath) // Bị loại bỏ
      handleUngTuyenNgay(id); // Gọi hàm ứng tuyển (sẽ mở modal login)
    }
  };

  const listCityText = (listCity) => {
    const textCitys = [];
    if (listCity.includes(0)) return 'Toàn quốc';
    listCity.map((c) => {
      city_array.map((city) => {
        if (city.cit_id == c) {
          textCitys.push(city.cit_name);
        }
      });
    });
    return textCitys.join(', ');
  };

  useEffect(() => {
    setTotalPageCurrent(totalPage);
  }, [totalPage]);

  useEffect(() => {
    // console.log('newId', router.asPath); // Bị loại bỏ
    if (workInfo) {
      addPropertyIsShow(newId);
    }
  }, [newId, pageCurrent, workInfo]);


  const naviagte = useNavigate()
  return (
    <>
      <style>
        {`
            .custom-overlay-1 
            {
                .ant-popover-arrow::after {
                    background: #2767A5;
                }
                .ant-popover-content{
                    .ant-popover-inner {
                        display: flex;
                        width: 288px;
                        padding: 10px !important;
                        align-items: center;
                        box-sizing: border-box;
                        border-radius: 4px;
                        background: #2767A5;
                        .ant-popover-inner-content {
                            color: #FFF !important;
                            text-align: center;
                            font-family: Roboto;
                            font-size: 15px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: 135%;
                        }
                    }
                }
            }
          `}
      </style>
      <div
        className={s.job_detail_box_7}
        style={{
          width: idSeeNow ? `width: calc(100% - 574px)` : '100%',
          transition: 'all 0.3s'
        }}
      >
        <div className={s.list_suggest}>
          {copyData?.map((item, index) => (
            <div
              key={index}
              className={`${s.item}`}
              onMouseEnter={() => handleSetIdHover(item?.new_id)}
              onMouseLeave={() => handleSetIdHover(0)}
              style={{
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                border: item?.isActive ? '1px solid #3582CD' : ''
              }}
            >
              {item?.huyHieuTiaSet ? (
                <svg className={s.icon_flash} xmlns="http://www.w3.org/2000/svg" width="33" height="35" viewBox="0 0 33 35" fill="none">
                  {/* ... (path SVG) ... */}
                </svg>
              ) : null}

              <div className={s.content} style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <div className={s.contentLeft}>
                  <div className={s.image_logo}>
                    <a href={item?.usc_company ? `${createLinkTilte2(item?.usc_company.trim())}` : `#`} style={{ all: 'inherit', cursor: 'pointer' }}>
                      {/* <Image> đã được thay bằng <img> */}
                      <img src={handleImageSource(item?.usc_logo) || "/images/candidate/ava_default.jpg"} alt={"Ảnh avatar NTD"} width={90} height={90} style={{ width: "90px", height: "90px", borderRadius: "50%", border: "1px solid #3582cd80" }} />
                    </a>
                  </div>
                  <div className={s.detail}>
                    <span
                      className={`${s.detail_1} ${seeNow === true ? s.detail_1_plus : ""}`}
                      onMouseEnter={handleTitleMouseEnter}
                      onMouseLeave={handleTitleMouseLeave}
                      // onClick={() => window.location.href = `/${createLinkTilte2(item.new_alias)}-${item.new_id}`}
                      onClick={() => naviagte('/nhan-vien-kinh-doanh-viec-lam-mau-12345')}
                    >
                      <Popover
                        open={popoverVisible && idHover === item.new_id}
                        content={<span>{item?.new_title}</span>}
                        title=""
                        overlayClassName="custom-overlay-1"
                      >
                        <h3 data-id={`${item.new_id}`}>
                          {item?.new_title}
                        </h3>
                      </Popover>
                    </span>

                    <span
                      className={s.detail_2}
                      style={{ flex: 1 }}
                      onMouseEnter={handleTitleMouseEnter1}
                      onMouseLeave={handleTitleMouseLeave1}
                    >
                      <Popover
                        content={<span>{item?.usc_company}</span>}
                        title=""
                        overlayClassName="custom-overlay-1"
                      >
                        <a href={item?.usc_company ? `${createLinkTilte2(item?.usc_company.trim())}` : `#`} style={{ all: 'inherit' }}>
                          {item?.usc_company ? item.usc_company : 'Chưa cập nhật'}
                        </a>
                      </Popover>
                    </span>

                    <div className={s.list_tag}>
                      <div className={s.tag}>
                        <span className={s.text}>{listCityText(item?.new_city.split(',').map(Number))}</span>
                      </div>
                      <div className={s.tag}>
                        <span className={s.text}>{getMucLuong(item?.new_money_type, item?.new_money_from, item?.new_money_to, item?.new_money)}</span>
                      </div>
                      <div className={s.tag}>
                        <span className={s.text}>Cập nhật: {getTimeCapNhat(item?.new_update_time)}</span>
                      </div>
                      <div className={s.tag}>
                        <span className={s.text}>{getHanNop(item?.new_han_nop)?.includes('Còn') ? `${getHanNop(item?.new_han_nop)} ứng tuyển` : getHanNop(item?.new_han_nop)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={seeNow === true ? (window.innerWidth < 920 ? s.contentRight : s.contentRight_1) : s.contentRight}>
                  <button className={s.buttonSeeMore_1} onClick={() => { handleSeeNow(true, item?.new_id); handleSetIdSeeNow(item?.new_id); }}>Xem nhanh {`>>`}</button>
                  <button className={s.buttonSeeMore} onClick={() => { handleSeeNow(true, item?.new_id) }}>Xem {`>>`}</button>
                  <div className={s.groupBottom}>
                    {item?.checkUngTuyen ?
                      <button className={s.buttonBlue} style={{ whiteSpace: 'nowrap' }}>Đã ứng tuyển</button>
                      :
                      <button className={s.buttonBlue} onClick={() => {
                        handleFirstUT(item?.new_id);
                      }
                      }>Ứng tuyển</button>
                    }
                  </div>
                </div>
              </div>
              <div style={{
                display: item?.isActive ? 'flex' : 'none',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                right: '-12px',
              }}>
                <svg className={s.icon_see_now} style={{
                  display: 'flex'
                }} xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path d="M11.2111 5.60582C11.9482 5.97434 11.9482 7.02615 11.2111 7.39467L1.44721 12.2766C0.782313 12.6091 4.23659e-07 12.1256 4.56153e-07 11.3822L8.82948e-07 1.61828C9.15442e-07 0.874896 0.782314 0.3914 1.44722 0.723851L11.2111 5.60582Z" fill="#3582CD" />
                </svg>
              </div>
            </div>
          ))}
          {
            // <Pagination totalPage={totalPageCurrent} handleChangePage={handleChangePage} handleSeeNow={handleSeeNow} />
            <Pagination />
          }
        </div>
      </div>
    </>
  );
};

export default Jobs;