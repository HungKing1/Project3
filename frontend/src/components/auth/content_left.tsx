import React from 'react';
import styles from './content_left.module.scss';

const ContentLeft = () => {
  return (
    <div style={{ width: '100%' }}>
      <div className={styles.content_left}>
        <div className={styles.wrapper_img}>
          {/* Ảnh PC */}
          <img
            src="/images/authorization/img_right.png"
            alt="Ảnh minh hoạ"
            className={styles.logo_pc}
            style={{ objectFit: 'contain', width: '377px', height: '124px' }}
          />

          {/* Ảnh Tablet */}
          <img
            src="/images/authorization/logo_tablet.png"
            alt="Ảnh minh hoạ"
            className={styles.logo_tablet}
            style={{ width: '377px', height: '124px' }}
          />
        </div>

        <p className={styles.title}>Tìm việc nhanh, tuyển dụng hiệu quả</p>
      </div>

      {/* Ảnh dưới cho PC */}
      <div className={styles.img_bot_pc}>
        <img
          src="/images/authorization/img_bot_left.svg"
          alt="Ảnh minh hoạ"
          className={styles.images_bot}
          style={{ width: '606px', height: '354px' }}
        />
      </div>

      {/* Ảnh dưới cho Tablet */}
      <div className={styles.img_bot_tablet}>
        <img
          src="/images/authorization/bg_login_tablet.png"
          alt="Ảnh minh hoạ"
          className={styles.images_bot}
          style={{ width: '290px', height: '166px' }}
        />
      </div>
    </div>
  );
};

export default ContentLeft;
