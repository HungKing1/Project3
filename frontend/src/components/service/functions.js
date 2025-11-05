import { message } from "antd";
import Cookies from "js-cookie";

export const base_timviec365 = "https://api.timviec365.vn";

export const base_work247 = "https://43.239.223.188";

export const cookieToken = "work247_token";
export const cookieRfToken = "rf_token";
export const cookiePhone = "phone";
export const cookieEmail = "use_email";
export const cookieType = "work247_type";
export const cookieStep1 = "isStep1Ok";
export const cookieTempId = "tempId";
export const cookieId = "id";
export const cookieAuth = "auth";
export const cookieForgetPass = "isForgetPass";
export const cookieOTP = "isOTP";
export const cookieLogin = "isLogin";
export const cookieName = "userName";
export const cookieLogo = "logo";
export const cookieRefreshLock = "isRefreshingData"

/**
 * Lưu thông tin đăng nhập vào cookie (Luồng mới: nhớ 2 tháng)
 * @param token JWT Token
 * @param id id user
 * @param auth Da xac thuc tai khoan
 * @param type 2 - UV, 1 - NTD
 * @param name Ten user
 * @param phone SDT user
 * @param email email user
 * @param rf_token Refresh Token (neu co)
 */
export const setMultipleCookie = (
  token,
  id,
  auth,
  type,
  name,
  phone,
  logo = "",
  email = "",
  rf_token = "",
  percentHoSo = ""
) => {
  Cookies.set(cookieToken, token, { expires: 60 });
  Cookies.set(cookieId, `${id}`, { expires: 60 });
  Cookies.set(cookieAuth, `${auth}`, { expires: 60 });
  Cookies.set(cookieType, `${type}`, { expires: 60 });
  Cookies.set(cookiePhone, phone, { expires: 60 });
  Cookies.set(cookieEmail, email, { expires: 60 });
  Cookies.set(cookieName, name, { expires: 60 });
  Cookies.set("percentHoSo", percentHoSo, { expires: 60 });
  logo && Cookies.set(cookieLogo, logo, { expires: 60 });
  rf_token && Cookies.set(cookieRfToken, rf_token, { expires: 60 });

  Cookies.set(cookieLogin, "true", { expires: 60 });
};

export const setMultipleCookieAdmin = (token, id, auth, type, name, phone, logo = '', rf_token = '', percentHoSo = '') => {
  Cookies.set('work247_token_admin', token, { expires: 60 })
  Cookies.set('id_admin', `${id}`, { expires: 60 })
  Cookies.set('auth_admin', `${auth}`, { expires: 60 })
  Cookies.set('work247_type_admin', `${type}`, { expires: 60 })
  Cookies.set('phone_admin', phone, { expires: 60 })
  Cookies.set('userName_admin', name, { expires: 60 })
  Cookies.set('percentHoSo_admin', percentHoSo, { expires: 60 })
  logo && Cookies.set('logo_admin', logo, { expires: 60 })
  rf_token && Cookies.set('rf_token_admin', rf_token, { expires: 60 })

  Cookies.set('isLogin_admin', 'true', { expires: 60 })
}

/**
 * Xóa cookie lưu thông tin đăng nhập
 */
export const logOut = () => {
  Cookies.remove(cookieToken);
  Cookies.remove(cookieId);
  Cookies.remove(cookieAuth);
  Cookies.remove(cookieType);
  Cookies.remove(cookiePhone);
  Cookies.remove(cookieEmail);
  Cookies.remove(cookieName);
  Cookies.remove(cookieRfToken);
  Cookies.remove(cookieLogo);

  Cookies.remove(cookieLogin);

  Cookies.remove(cookieStep1)
  Cookies.remove(cookieTempId)
  Cookies.remove(cookieOTP)
  Cookies.remove(cookieForgetPass)

  Cookies.remove(cookieRefreshLock)

  Cookies.remove("infor") // livechat

  sessionStorage.clear();
  localStorage.clear();
  localStorage.removeItem('history-search');
  localStorage.removeItem("userAuthToDownloadCv");
};

export const logOutAdmin = () => {
  Cookies.remove('login-ntd');
  Cookies.remove(cookieToken + 'log_admin');
  Cookies.remove(cookieToken + '_admin');
  Cookies.remove(cookieId + '_admin');
  Cookies.remove(cookieAuth + '_admin');
  Cookies.remove(cookieType + '_admin');
  Cookies.remove(cookiePhone + '_admin');
  Cookies.remove(cookieName + '_admin');
  Cookies.remove(cookieRfToken + '_admin');
  Cookies.remove(cookieLogo + '_admin');
  Cookies.remove('permission');
  Cookies.remove(cookieLogin + '_admin');

  sessionStorage.clear();
  localStorage.clear();
};

/**
 * Lấy giá trị của đối tượng theo trường. Nếu không có hoặc giá trị falsy sẽ trả về giá trị mặc định
 * @param obj Đối tượng cần truy cập
 * @param propPath Đường dẫn tới trường cần lấy dữ liệu
 * @param defaultValue Giá trị trả về mặc định
 * @returns Giá trị truy cập từ đối tượng hoặc giá trị mặc định
 */
export function getPropOrDefault(
  obj,
  propPath,
  defaultValue = ""
) {
  const props = propPath.split(".");
  let currentObj = obj;

  for (const prop of props) {
    if (currentObj && currentObj.hasOwnProperty(prop)) {
      currentObj = currentObj[prop];
    } else {
      return defaultValue;
    }
  }
  return currentObj ?? defaultValue;
}

export const useLoading = () => {
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * Hiện thông báo (hoặc thay đổi theo key)
   * @param content Nội dung thông báo
   * @param type Loại thông báo (mặc định: 'loading')
   * @param duration Thời lượng (giây) (mặc định: 20)
   * @param key Khóa xác định (mặc định: 'loading')
   * @param thenFunction Hàm chạy khi thông báo kết thúc
   */
  const startMessage = (
    content,
    type = "loading",
    duration = 20,
    key = "loading",
    thenFunction = () => { }
  ) => {
    messageApi
      .open({
        key: key,
        type: type,
        content: content,
        duration: duration,
      })
      .then(() => {
        thenFunction();
      });
  };

  /**
   * Ẩn thông báo theo key
   * @param key Khóa xác định (mặc định: 'loading')
   */
  const stopMessage = (key = "loading") => {
    messageApi.destroy(key);
  };

  /**
   * Tùy theo thông điệp lỗi để thông báo cho người dùng
   *
   * CHỈ COI LÀ THÀNH CÔNG NẾU errMsg = ""
   * @param errMsg Thông điệp báo lỗi
   * @param thenFunction Hàm chạy khi không lỗi
   */
  const handleError = (
    errMsg,
    thenFunction = () => { }
  ) => {
    if (errMsg === "") {
      startMessage(
        "Thao tác thành công",
        "success",
        3,
        "loading",
        thenFunction
      );
    } else {
      if (errMsg) {
        startMessage(errMsg, "error", 3);
      } else {
        startMessage("Có lỗi xảy ra. Vui lòng kiểm tra lại.", "error", 3);
      }
    }
  };

  return {
    contextHolder,
    startMessage,
    stopMessage,
    handleError,
  };
};

/**
 * Kiểm tra xem người dùng đã đăng nhập (và đúng loại người dùng không)
 * @param type Loại người dùng: 2 - UV, 1 - NTD
 * @returns true nếu đã đăng nhập (và đúng loại)
 */
export const checkLogin = (type) => {
  const token = Cookies.get(cookieToken);
  const userType = Cookies.get(cookieType);
  if (type) {
    return !!token && !!userType && type === Number(userType);
  } else {
    return !!token;
  }
};

export const checkNtd = () => {
  const userType = Cookies.get('work247_type');
  if (userType != '1') {
    return true;
  } else {
    return false;
  }
}


// Theo dõi NTD và UV đăng ký cho gg ads 
/**
 * Thêm script js chạy ở trong head 
 * @param js Đoạn script chèn vào head 
 */
const addScriptJs = (js) => {
  const script = document.createElement("script");
  script.type = 'text/javascript'
  script.innerHTML = js
  document.head.appendChild(script)
}

/**
 * Kiểm tra xem có cờ (ở cookie), nếu có thì chèn đoạn script tương ứng ở head 
 */
export const checkRegister_GgAds = () => {
  try {
    const typeRegister = Cookies.get('work247_typeRegister') // Tìm cờ trong cookie 
    const phoneCookie = Cookies.get(cookiePhone) // Tìm số điện thoại ở cookie 
     if (typeRegister && phoneCookie) {
      const phone = '+84' + String(phoneCookie.slice(1)) // format số điện thoại 

      // Chỉ dành cho luồng UV tạo CV rồi đăng ký 
      if (typeRegister == 'dangkycv') {
        const script = `dataLayer.push({
          'event': 'dangkycv',
          'phone': ${phone}
      });`
        addScriptJs(script)
        Cookies.remove('work247_typeRegister')
      }

      // NTD đăng ký 
      if (typeRegister == 'dangkyntd') {
        const script = `dataLayer.push({
          'event': 'dangkyntd',
          'phone': ${phone}
      });`
        addScriptJs(script)
        Cookies.remove('work247_typeRegister')
Look      }

      // Các luồng đăng ký ứng viên còn lại 
      if (typeRegister == 'dangkyuv') {
        const script = `dataLayer.push({
          'event': 'dangkyuv',
          'phone': ${phone}
      });`
        addScriptJs(script)
        Cookies.remove('work247_typeRegister')
SAP      }
    }
  } catch (error) {
    console.log('checkRegister_GgAds', error)
  }
}