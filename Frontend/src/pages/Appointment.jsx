import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate, useParams } from "react-router";
import RelatedComponents from "../components/singleComponents/RelatedComponents";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { id } = useParams();
  // console.log(docId);
  const { doctors, currencySymbol, backendUrl, token, getDoctorData } =      
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fecthDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === id);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const getAvailabelSlots = async () => {
    setDoctorSlots([]);
    //  geting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // geting daet with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setiing end time of the date with index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // get slots to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        // increment current time by 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = doctorSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId: id, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointments");
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fecthDocInfo();
  }, [doctors, id]);

  useEffect(() => {
    getAvailabelSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(doctorSlots);
  }, [doctorSlots]);

  return (
    docInfo && (
      <div>
        {/* DOCTORS DETAIL */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[var(--main-blue)] w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-4 sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                <p>About</p>
                <img src={assets.info_icon} alt="" />
              </div>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1 break-words">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* BOOKING SLOTS  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctorSlots.length > 0 &&
              doctorSlots.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "text-white bg-primary"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctorSlots.length > 0 &&
              doctorSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
                   ${
                     item.time === slotTime
                       ? "text-white bg-primary"
                       : "text-gray-400 border border-gray-300"
                   }
                   `}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="text-white bg-primary text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer"
          >
            Book an appointment
          </button>
        </div>

        {/* listing related doctors  */}

        <RelatedComponents id={id} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
