import React from "react";
import $ from "jquery";

function Day({
  price,
  dayNumber,
  setClickCount,
  currentDate,
  currentMonth,
  dayElements,
  clickCount,
  openModal,
  storeBookingInfos,
  setStoreBookingInfos,
  getYear,
  calendarNumber,
  getMonthAndYear,
}) {
  return (
    <>
      <div
        ref={(element) => dayElements.current.push(element)}
        className={`day-container ${
          currentDate === dayNumber && calendarNumber === currentMonth
            ? "current-day"
            : ""
        } `}
        onClick={(e) => {
          // start date ve end date'nin seçilip seçilmediğini anlamayı sağlar ve butonlara class ekler
          if (clickCount.first !== 1) {
            setClickCount({ ...clickCount, first: 1 });
            // Seçilen günün öncesindeki günler disable ediliyor
            $(e.target).prevAll().addClass("disabled-day");
            $(e.target).prevAll().css("background-color", "#C0C0C0 !important");
            $(e.target).prevAll().css("cursor", "not-allowed");

            $(e.target).addClass("start-date-selected");
            // start date bilgileri alınıyor
            setStoreBookingInfos({
              ...storeBookingInfos,
              startDate: ` ${dayNumber} ${getMonthAndYear(
                getYear,
                calendarNumber
              )}`,
            });
          } else if (clickCount.first === 1) {
            setClickCount({ ...clickCount, second: 1 });
            // seçilen endDate den önceki günler kapatılıyor
            $(e.target)
              .prevAll()
              .css("background-color", "yellow")
              .not(".disabled-day");
            $(e.target).addClass("end-date-selected");
            $(".start-date-selected")
              .nextAll()
              .css("background-color", "yellow");

            // start dateden sonraki günlerin hepsini sarıya kaplar
            $(".start-date-selected")
              .parents(".calendar-container")
              .nextAll()
              .find(".day-container")
              .css("background-color", "yellow");

            // end date den sonraki alanlar sarı olmasın diye tekrar beyaza boyanıyors
            $(".end-date-selected")
              .nextAll()
              .attr("style", "background-color: white !important");

            // end dateden sonraki parentlara erişerek sarı olanları beyaz yapar
            $(".end-date-selected")
              .parents(".calendar-container")
              .nextAll()
              .find(".day-container")
              .attr("style", "background-color: white !important");
            // end date bilgileri alınıyor
            setStoreBookingInfos({
              ...storeBookingInfos,
              endDate: `${dayNumber} ${getMonthAndYear(
                getYear,
                calendarNumber
              )}`,
            });
            // end date seçildikten sonra modal açılıyor ve bilgiler gösteriliyor
            openModal();

            // Diğer takvimler arasında seçilen start ve end date arası günler kapatılıyor
          } else if (clickCount.first === 1 && clickCount.second === 1) {
            setClickCount({ ...clickCount, isDoubleClick: true });
          }
        }}
      >
        <span className={`day`}>{dayNumber}</span>
        <span className="price">{price} ₺</span>
      </div>
    </>
  );
}

export default Day;
