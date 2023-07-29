import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import PropTypes from "prop-types";
import styles from "./FilesList.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";
import deleteIcon from "../..//assets/delete.png";

const FilesList = ({ lists, onDelete }) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <ul className={styles.list} ref={parent}>
      {lists.length === 0 && (
        <div className={styles.empty}>No files uploaded yet</div>
      )}
      {lists.length !== 0 &&
        lists.map((file) => (
          <li className={styles.fileItem} key={file.id}>
            {file.hasError && (
              <div className={styles.error}>Uploading failed</div>
            )}
            {!file.hasError && (
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
            {file.loading && !file.hasError && <LoadingSpinner />}
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
        ))}
    </ul>
  );
};
FilesList.propTypes = {
  lists: PropTypes.array,
  onDelete: PropTypes.func,
};

export default FilesList;
