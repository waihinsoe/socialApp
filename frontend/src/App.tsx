import { ChangeEvent, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState("");
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };
  const imageUpload = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    const response = await fetch("http://localhost:5000/assets", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      const imgUrl = result.data;
      setImage(imgUrl);
    }
  };
  return (
    <Layout>
      <input type="file" onChange={handleFileChange} />
      <button onClick={imageUpload}>send</button>
      <div>
        <img src={image} alt="" />
      </div>
    </Layout>
  );
}

export default App;
