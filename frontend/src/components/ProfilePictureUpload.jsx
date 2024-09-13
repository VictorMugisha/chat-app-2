/* eslint-disable react/prop-types */
import { useState } from "react";
import { uploadProfilePicture } from "../services/api";
export default function ProfilePictureUpload({ userId, onUpload }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Implement file upload logic
      const response = await uploadProfilePicture(userId, formData);
      onUpload(response.data.url); // Handle the response as needed
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Upload Picture
      </button>
    </div>
  );
}
