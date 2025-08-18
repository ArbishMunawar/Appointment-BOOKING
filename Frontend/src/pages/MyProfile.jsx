import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import axios from 'axios'
const MyProfile = () => {
  const { user, setUser, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(true);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("phone", user.phone);
      formData.append("address", JSON.stringify(user.address));
      formData.append("gender", user.gender);
      formData.append("dob", user.dob);

      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    user && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : user.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12 "
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={user.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {user.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-0" />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{user.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52 "
                type="text"
                value={user.phone}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-blue-400">{user.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={user.address.line1}
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-50"
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={user.address.line2}
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {user.address.line1}
                <br />
                {user.address.line1}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={user.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{user.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={user.dob}
              />
            ) : (
              <p className="text-gray-400">{user.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary transition-all hover:text-white"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary transition-all hover:text-white"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
