/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import styles from "./YandexDiskUpload.module.css";
import PropTypes from "prop-types";

const FileUpload = ({ token, onFileUpload, onError, onLoadingFinished }) => {
  const [drag, setDrag] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState("");
  const dragStartHandler = (event) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    setDrag(false);
  };
  const dropHandler = (event) => {
    event.preventDefault();
    setDrag(false);
    uploadHandler(event.dataTransfer.files);
  };
  const uploadHandler = (files) => {
    if (Object.keys(files).length > 102) {
      alert("You can only upload a maximum of 100 files");
      return;
    }
    for (let dir in files) {
      if (dir.length === 1) {
        const file = files[dir];
        const formData = new FormData();
        const size = file.size / 1000;
        const fileSize = () => {
          if (size > 1000) {
            return (size / 1000).toFixed(2) + " MB";
          } else {
            return Math.ceil(size) + " KB";
          }
        };
        const id = Math.random().toString();
        onFileUpload({
          id: id,
          name: file.name,
          size: fileSize(),
          loading: true,
          hasError: false,
        });
        formData.append("file", file);
        axios
          .get("https://cloud-api.yandex.net/v1/disk/resources/upload", {
            params: {
              path: file.name,
              url: "https://http://localhost:5173/",
            },
            headers: {
              Authorization: "OAuth " + token,
            },
          })
          .then((result) => {
            axios
              .put(result.data.href, formData)
              .then((data) => {
                console.log(data);
                onLoadingFinished(id);
              })
              .catch((error) => {
                onError(id);
              });
          })
          .catch(() => {
            onError(id);
          });
      }
    }
  };

  return (
    <div className={styles.content__upload}>
      <div
        className={`${styles["drag-area"]} ${drag ? styles.drag : ""}`}
        onDragStart={(e) => {
          dragStartHandler(e);
        }}
        onDragLeave={(e) => {
          dragLeaveHandler(e);
        }}
        onDragOver={(e) => {
          dragStartHandler(e);
        }}
        onDrop={(e) => {
          dropHandler(e);
        }}
      >
        <div>Drag&Drop files here</div>
        <div>or</div>
        <div className={styles.upload__button}>
          {" "}
          <input
            type="file"
            onChange={(e) => {
              uploadHandler(event.target.files);
            }}
            value={file}
            multiple="multiple"
          />
          <button>Choose file</button>
        </div>
      </div>
    </div>
  );
};
FileUpload.propTypes = {
  token: PropTypes.string,
  onFileUpload: PropTypes.func,
  onError: PropTypes.func,
  onLoadingFinished: PropTypes.func,
};

export default FileUpload;
