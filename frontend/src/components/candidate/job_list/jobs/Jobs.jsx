import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import Pagination from '../../../Pagination';
import s from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const Jobs = ({
  page,
  jobCardList,
  setPage,
  totalPage,
  seeNow,
  newId,
  handleUngTuyenNgay,
  handleSeeNow,
}) => {
  const [idHover, setIdHover] = useState(0);
  const [idSeeNow, setIdSeeNow] = useState(0);
  const navigate = useNavigate();

  const handleSetIdHover = (id) => setIdHover(id);
  const handleSetIdSeeNow = (id) => setIdSeeNow(id);

  const handleFirstUT = (id) => {
     handleUngTuyenNgay(id);
  };

  useEffect(() => {
    if (newId) {
      setIdSeeNow(newId);
    } else {
      setIdSeeNow(0);
    }
  }, [newId]);


  return (
    <>
      <style>
        {`
            .custom-popover .ant-popover-inner {
                background-color: #3582CD;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .custom-popover .ant-popover-arrow::after {
                 background-color: #3582CD !important;
            }
            .custom-popover .ant-popover-inner-content {
                color: #fff;
                font-weight: 500;
                text-align: center;
                padding: 8px 12px;
                font-size: 13px;
            }
        `}
      </style>

      <div
        className={s.job_list_container}
        style={{
          width: seeNow && idSeeNow ? 'calc(100% - 580px)' : '100%',
        }}
      >
        <div className={s.list_suggest}>
          {jobCardList?.map((item, index) => (
            <div
              key={index}
              className={`${s.job_card} ${idSeeNow === item?.id ? s.active : ''}`}
              onMouseEnter={() => handleSetIdHover(item?.id)}
              onMouseLeave={() => handleSetIdHover(0)}
            >
              <div className={s.active_bar}></div>

              <div className={s.card_content}>
                {/* Left Section */}
                <div className={s.info_section}>
                  <div className={s.logo_wrapper}>
                     <img
                        src={item?.logo || "/images/candidate/applicant.png"}
                        alt="Logo công ty"
                        className={s.company_logo}
                        onError={(e) => {e.target.src = "/images/candidate/applicant.png"}}
                     />
                  </div>

                  <div className={s.details_wrapper}>
                    {/* Job Title */}
                    <Popover
                        content={item?.title}
                        overlayClassName="custom-popover"
                        trigger="hover"
                        mouseEnterDelay={0.5}
                    >
                        <h3
                            className={s.job_title}
                            onClick={() => navigate(`/get-job-detail/${item.id}`)}
                        >
                            {item?.title}
                        </h3>
                    </Popover>

                    {/* Company Name */}
                    <Popover
                        content={item?.employerName}
                        overlayClassName="custom-popover"
                        trigger="hover"
                         mouseEnterDelay={0.5}
                    >
                        <p className={s.company_name}>
                             {item?.employerName || 'Đang cập nhật'}
                        </p>
                    </Popover>

                    {/* Tags */}
                    <div className={s.tags_list}>
                      {item?.salaryName && <span className={s.tag_item}>{item?.salaryName}</span>}
                      {item?.cityName && <span className={s.tag_item}>{item?.cityName}</span>}
                      {item?.districtName && <span className={s.tag_item}>{item?.districtName}</span>}
                      {item?.experienceYearName && <span className={s.tag_item}>{item?.experienceYearName}</span>}
                      {item?.workTypeName && <span className={s.tag_item}>{item?.workTypeName}</span>}
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className={`${s.action_section} ${seeNow && idSeeNow ? s.see_now_mode : ''}`}>
                  <div className={s.action_buttons}>
                      <button
                        className={`${s.btn} ${s.btn_primary}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/get-job-detail/${item.id}`);
                        }}
                      >
                        Chi tiết
                      </button>
                  </div>

                  <div className={s.apply_button_wrapper}>
                     {item?.applied ? (
                        <span className={s.applied_text}>Đã ứng tuyển</span>
                     ) : (
                        <button
                            className={`${s.btn} ${s.btn_apply}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFirstUT(item?.id);
                            }}
                        >
                            Ứng tuyển ngay
                        </button>
                     )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className={s.pagination_wrapper}>
             <Pagination page={page} setPage={setPage} totalPage={totalPage}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;