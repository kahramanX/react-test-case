import React from "react";
import Day from "./Day";

function Calendar({
  setStoreBookingInfos,
  storeBookingInfos,
  calendarNumber,
  currentMonth,
  setClickCount,
  currentDate,
  dayElements,
  clickCount,
  openModal,
  getYear,
  price,
}) {
  // Yıl ve ay bilgisini alarak takvimin başlığına yazılması sağlanıyor
  const getMonthAndYear = (year, month) => {
    return new Intl.DateTimeFormat("tr-TR", {
      month: "long",
      year: "numeric",
    }).format(new Date(year, month));
  };
  // Seçilen ay içindeki günleri bulan fonksiyon
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  return (
    <div className="calendar-container">
      <div className="month-name">
        {getMonthAndYear(getYear, calendarNumber)}
      </div>
      <div className="weekdays">
        {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Pzr"].map(
          (nameOfDay, index) => {
            return (
              <span key={index} className="week-name">
                {nameOfDay}
              </span>
            );
          }
        )}
      </div>

      <div className="days-of-month">
        {[...Array(daysInMonth(calendarNumber, getYear)).keys()].map(
          (dayNumber, index) => (
            <Day
              key={index}
              dayElements={dayElements}
              currentDate={currentDate}
              dayNumber={dayNumber + 1}
              currentMonth={currentMonth}
              setStoreBookingInfos={setStoreBookingInfos}
              storeBookingInfos={storeBookingInfos}
              setClickCount={setClickCount}
              price={price}
              clickCount={clickCount}
              openModal={openModal}
              getYear={getYear}
              calendarNumber={calendarNumber}
              getMonthAndYear={getMonthAndYear}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Calendar;
