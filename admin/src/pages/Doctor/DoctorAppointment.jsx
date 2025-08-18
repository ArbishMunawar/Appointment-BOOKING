import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">Doctor Appointment</p>
      <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh] ">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1  px-6 py-3 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {[...appointments].reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 items-center px-6 py-3 border-b border-gray-300 hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
            </div>
            <div>
              <p className="text-xs inline border-primary px-2 rounded-full ">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>

            {item.cancelled ? (
              <p className="text-red-400 font-medium text-xs">Cancelled</p>
            ) : item.isCompleted ? (
              <p  className="text-green-500 font-medium text-xs">Completed</p>
            ) : (
              <div className="">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
