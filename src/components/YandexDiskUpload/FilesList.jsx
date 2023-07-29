import React from "react";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import { fileActions } from "../../store/index";
import styles from "./FilesList.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";
import deleteIcon from "../..//assets/delete.png";

const FilesList = ({ token }) => {
  const parent = useRef(null);
  const filesState = useSelector((state) => state.files);
  const dispatch = useDispatch();
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  const onDelete = (name, id) => {
    dispatch(fileActions.deleteFile(id));
    const file = filesState.find((file) => file.id === id);
    if (!file.errorMessage) {
      deleteRequest(name);
    }
  };
  function deleteRequest(name) {
    axios
      .delete("https://cloud-api.yandex.net/v1/disk/resources", {
        params: {
          path: name,
        },
        headers: {
          Authorization: "OAuth " + token,
        },
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <ul className={styles.list} ref={parent}>
      {filesState.length === 0 ? (
        <div className={styles.empty}>No files uploaded yet</div>
      ) : (
        filesState.length !== 0 &&
        filesState.map((file) => (
          <li className={styles.fileItem} key={file.id}>
            {file.errorMessage && (
              <div className={styles.error}>{file.errorMessage}</div>
            )}
            {!file.errorMessage && (
              <div className={styles.fileItem__info}>
                <div
                  className={`${styles.fileItem__info__text} ${styles.name}`}
                >
                  {file.name}
                </div>
                <div
                  className={`${styles.fileItem__info__text} ${styles.size}`}
                >
                  {file.size}
                </div>
              </div>
            )}
            {file.loading && !file.errorMessage && <LoadingSpinner />}
            {!file.loading && (
              <img
                src={deleteIcon}
                alt="delete icon"
                className={styles.delete}
                onClick={() => {
                  onDelete(file.name, file.id);
                }}
              />
            )}
          </li>
        ))
      )}
    </ul>
  );
};
FilesList.propTypes = {
  token: PropTypes.string,
};

export default FilesList;
