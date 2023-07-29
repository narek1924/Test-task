import React from "react";
import PropTypes from "prop-types";

import FileUpload from "./FileUpload";
import FilesList from "./FilesList";

import styles from "./YandexDiskUpload.module.css";

const YandexDiskUpload = ({ token }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Upload files to Yandex Disk</div>
      <hr className={styles.separator} />
      <div className={styles.content}>
        <FileUpload token={token} />
        <FilesList token={token} />
        <div className={styles.content__files}></div>
      </div>
    </div>
  );
};
YandexDiskUpload.propTypes = {
  token: PropTypes.string,
};

export default YandexDiskUpload;
