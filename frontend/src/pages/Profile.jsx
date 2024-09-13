import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getUserProfile(token).then((data) => {
        if (data.success) {
          setProfile(data.user);
        } else {
          setError(data.message);
        }
      });
    }
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex items-center mb-4">
        <img
          src={
            profile.profilePicture ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <ProfilePictureUpload
          userId={profile._id}
          onUpload={(url) => setProfile({ ...profile, profilePicture: url })}
        />
      </div>
      <p className="text-gray-600">
        <strong>Username:</strong> {profile.username}
      </p>
      <p className="text-gray-600">
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
}
