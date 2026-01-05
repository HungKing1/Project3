import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { Table } from "antd";
import Pagination from "../../Pagination"; // Đảm bảo đường dẫn đúng
import { callApi } from "../../../utils/apiClient"; // Đảm bảo đường dẫn đúng
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // Nếu bạn dùng react-router-dom để chuyển trang

const AppliedJobs = () => {
  const [data, setData] = useState([]); // Dữ liệu gốc từ API
  const [displayData, setDisplayData] = useState([]); // Dữ liệu hiển thị theo trang
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(10); // Số lượng item mỗi trang
  const [loading, setLoading] = useState(false);

  // Hàm format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Hàm dịch trạng thái
  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return <span style={{ color: "#faad14" }}>Đang chờ duyệt</span>;
      case "APPROVED":
        return <span style={{ color: "#52c41a" }}>Đã duyệt</span>;
      case "REJECTED":
        return <span style={{ color: "#ff4d4f" }}>Bị từ chối</span>;
      default:
        return status;
    }
  };

  const getAppliedJobs = async () => {
    setLoading(true);
    try {
      // Gọi API thực tế
      const res = await callApi(`/candidate/applied-job?page=${page}&pageSize=${perPage}`, "GET");
      
      if (res && res.success) {
        // Map dữ liệu từ API sang cấu trúc của Table
        const mappedData = res.data.content.map((item, index) => ({
          key: item.applicationId, // Dùng applicationId làm key duy nhất
          stt: index + 1,
          position: item.jobTitle,
          company: item.companyName,
          // API không trả về deadline và ngày phỏng vấn, để placeholder hoặc logic khác
          deadline: "---", 
          date: formatDate(item.appliedAt),
          statusRaw: item.status, // Lưu trạng thái gốc để xử lý logic nếu cần
          status: getStatusText(item.status),
          link: `/get-job-detail/${item.jobId}`, // Giả định đường dẫn
          linkcpn: `/company-detail/${item.employerId}`, // Giả định đường dẫn
          date_interview: "---"
        }));

        setData(mappedData);
        setPage(res.data.currentPage)
        setTotalPage(res.data.totalPages)
      } else {
        toast.error(res?.message || "Lỗi tải dữ liệu");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, [page]);


  const unapplyJob = async (id, name) => {
    if (window.confirm(`Bạn có muốn hủy ứng tuyển vị trí ${name}?`)) {
      try {
        // GỌI API HỦY Ở ĐÂY (VÍ DỤ)
        // const res = await callApi(`/candidate/unapply/${id}`, "DELETE"); 
        
        // Giả lập thành công:
        toast.success(`Đã hủy ứng tuyển ${name}`);
        
        // Cập nhật lại state local
        const newData = data.filter((item) => item.key !== id);
        setData(newData);
        setTotalPage(Math.ceil(newData.length / perPage));
        
        // Nếu trang hiện tại trống sau khi xóa, lùi về trang trước
        if (page > 1 && newData.slice((page - 1) * perPage, page * perPage).length === 0) {
            setPage(page - 1);
        }

      } catch (error) {
        toast.error("Có lỗi xảy ra khi hủy ứng tuyển");
      }
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 60,
      render: (text, record, index) => (page - 1) * perPage + index + 1, // Tính STT chính xác theo trang
    },
    {
      title: "Vị trí công việc",
      key: "position",
      align: "left", // Canh trái cho tên công việc dễ đọc hơn
      render: (record) => (
        <a href={record.link} style={{ textDecoration: "none" }}>
          <div style={{ color: "#4C5BD7", fontWeight: 500 }}>{record.position}</div>
        </a>
      ),
    },
    {
      title: "Công ty",
      key: "company",
      align: "left",
      width: 250,
      render: (record) => (
        <div>
          <div style={{ color: "#333", fontWeight: "500" }}>{record.company}</div>
          <a href={record.linkcpn} style={{ textDecoration: "none" }}>
            <span style={{ color: "#4C5BD7", fontStyle: "italic", fontSize: "12px" }}>
              (xem chi tiết)
            </span>
          </a>
        </div>
      ),
    },
    {
      title: "Ngày nộp",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 120,
    },
    {
        // Giữ cột này nếu bạn muốn hiển thị placeholder, hoặc xóa đi
      title: "Hẹn phỏng vấn",
      dataIndex: "date_interview",
      key: "date_interview",
      align: "center",
      width: 140,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 150,
    },
    {
      title: "Xóa",
      key: "action",
      align: "center",
      width: 80,
      render: (record) => (
        <div
          style={{ color: "#FF0707", cursor: "pointer", display: 'flex', justifyContent: 'center' }}
          onClick={() => unapplyJob(record.key, record.position)}
          title="Hủy ứng tuyển"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="24"
            viewBox="0 0 19 24"
            fill="none"
          >
            <path
              d="M17.75 3.78571H13.25V2.55357C13.25 2.00893 13.0525 1.4866 12.7008 1.10148C12.3492 0.716358 11.8723 0.5 11.375 0.5H7.625C7.12772 0.5 6.65081 0.716358 6.29917 1.10148C5.94754 1.4866 5.75 2.00893 5.75 2.55357V3.78571H1.25C1.05109 3.78571 0.860322 3.87226 0.71967 4.02631C0.579018 4.18035 0.5 4.38929 0.5 4.60714C0.5 4.825 0.579018 5.03393 0.71967 5.18798C0.860322 5.34203 1.05109 5.42857 1.25 5.42857H2.04688L2.9375 21.0829C3.00406 22.4614 3.96875 23.5 5.1875 23.5H13.8125C15.0373 23.5 15.9828 22.4845 16.0625 21.0871L16.9531 5.42857H17.75C17.9489 5.42857 18.1397 5.34203 18.2803 5.18798C18.421 5.03393 18.5 4.825 18.5 4.60714C18.5 4.38929 18.421 4.18035 18.2803 4.02631C18.1397 3.87226 17.9489 3.78571 17.75 3.78571ZM6.52672 20.2143H6.5C6.30563 20.2144 6.11881 20.1319 5.9789 19.9841C5.83899 19.8364 5.75692 19.6349 5.75 19.4221L5.375 7.92212C5.36791 7.70426 5.44014 7.49225 5.57578 7.33271C5.71142 7.17318 5.89937 7.07919 6.09828 7.07143C6.29719 7.06367 6.49077 7.14277 6.63644 7.29133C6.7821 7.43989 6.86791 7.64574 6.875 7.86359L7.25 19.3636C7.25357 19.4715 7.23769 19.5791 7.20326 19.6802C7.16884 19.7814 7.11654 19.8741 7.04937 19.9531C6.98219 20.0322 6.90146 20.0959 6.81178 20.1407C6.7221 20.1855 6.62523 20.2105 6.52672 20.2143ZM10.25 19.3929C10.25 19.6107 10.171 19.8196 10.0303 19.9737C9.88968 20.1277 9.69891 20.2143 9.5 20.2143C9.30109 20.2143 9.11032 20.1277 8.96967 19.9737C8.82902 19.8196 8.75 19.6107 8.75 19.3929V7.89286C8.75 7.675 8.82902 7.46607 8.96967 7.31202C9.11032 7.15797 9.30109 7.07143 9.5 7.07143C9.69891 7.07143 9.88968 7.15797 10.0303 7.31202C10.171 7.46607 10.25 7.675 10.25 7.89286V19.3929ZM11.75 3.78571H7.25V2.55357C7.24943 2.49946 7.25875 2.44578 7.27739 2.39567C7.29604 2.34556 7.32364 2.30004 7.35857 2.26177C7.39351 2.22351 7.43507 2.19328 7.48083 2.17286C7.52658 2.15244 7.5756 2.14224 7.625 2.14286H11.375C11.4244 2.14224 11.4734 2.15244 11.5192 2.17286C11.5649 2.19328 11.6065 2.22351 11.6414 2.26177C11.6764 2.30004 11.704 2.34556 11.7226 2.39567C11.7413 2.44578 11.7506 2.49946 11.75 2.55357V3.78571ZM13.25 19.4221C13.2431 19.6349 13.161 19.8364 13.0211 19.9841C12.8812 20.1319 12.6944 20.2144 12.5 20.2143H12.4728C12.3743 20.2104 12.2775 20.1854 12.1879 20.1406C12.0983 20.0957 12.0176 20.032 11.9505 19.953C11.8833 19.874 11.8311 19.7813 11.7967 19.6801C11.7623 19.579 11.7464 19.4714 11.75 19.3636L12.125 7.86359C12.1285 7.75572 12.1514 7.64966 12.1923 7.55147C12.2332 7.45328 12.2914 7.36489 12.3636 7.29133C12.4357 7.21777 12.5203 7.16049 12.6127 7.12276C12.705 7.08503 12.8032 7.06759 12.9017 7.07143C13.0002 7.07527 13.097 7.10032 13.1867 7.14515C13.2763 7.18999 13.3571 7.25372 13.4242 7.33271C13.4914 7.41171 13.5437 7.50442 13.5781 7.60555C13.6126 7.70668 13.6285 7.81425 13.625 7.92212L13.25 19.4221Z"
              fill="#FF0707"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={s.container_table}>
        <div className={s.title}>
          <div className={s.label}>Việc làm đã ứng tuyển</div>
          {/* <span style={{ fontSize: '14px', fontWeight: 400 }}>({data.length} hồ sơ)</span> */}
        </div>
        
        <Table
          columns={columns}
          dataSource={data} 
          className={s.table_content}
          rowKey="key"
          pagination={false}
          scroll={{ x: 900 }}
          loading={loading}
          locale={{ emptyText: "Chưa có dữ liệu ứng tuyển" }}
        />
        
        {data.length > 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={totalPage}
          />
        )}
      </div>
    </>
  );
};

export default AppliedJobs;