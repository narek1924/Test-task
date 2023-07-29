import { useReducer } from "react";
import FileUpload from "./FileUpload";
import FilesList from "./FilesList";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./YandexDiskUpload.module.css";

const filesReducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD_FILE":
      return [action.payload, ...state];
    case "DELETE_FILE": {
      const newState = [...state].filter((file) => {
        return file.id !== action.payload;
      });
      return newState;
    }
    case "LOADING_FINISHED": {
      const newState = [...state];
      const index = newState.findIndex((file) => file.id === action.payload);
      newState[index].loading = false;
      return newState;
    }
    case "HAS_ERROR": {
      const newState = [...state];
      const index = newState.findIndex((file) => file.id === action.payload);
      newState[index].hasError = true;
      newState[index].loading = false;
      return newState;
    }
    default:
      return state;
  }
};

const YandexDiskUpload = ({ token }) => {
  const [filesState, dispatch] = useReducer(filesReducerFunction, []);
  // const [files, setFiles] = useState([]);

  const onFileUpload = (file) => {
    dispatch({ type: "ADD_FILE", payload: file });
  };
  const onDelete = (name, id) => {
    dispatch({ type: "DELETE_FILE", payload: id });
    const file = filesState.find((file) => file.id === id);
    if (!file.hasError) {
      deleteRequest(name);
    }
  };
  const onLoadingFinished = (id) => {
    dispatch({ type: "LOADING_FINISHED", payload: id });
  };
  const onError = (id) => {
    dispatch({ type: "HAS_ERROR", payload: id });
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
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>Upload files to Yandex Disk</div>
      <hr className={styles.separator} />
      <div className={styles.content}>
        <FileUpload
          token={token}
          onFileUpload={onFileUpload}
          onError={onError}
          onLoadingFinished={onLoadingFinished}
        />
        <FilesList lists={filesState} onDelete={onDelete} />

        <div className={styles.content__files}></div>
      </div>
    </div>
  );
};
YandexDiskUpload.propTypes = {
  token: PropTypes.string,
};

export default YandexDiskUpload;
