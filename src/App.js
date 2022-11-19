import Calendar from "./components/calendar/Calendar";
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "./assets/styles/app.scss";
import DateModal from "components/DateModal";

function App() {
  //Tekrar tekrar new Date yapmamak için oluşturuldu
  const [date] = useState(new Date());
  // Şuanki yılı tespit etmek için
  const [getYear, setGetYear] = useState(date.getFullYear());
  // Grid yapısını değiştiren state
  const [selectGridView, setSelectGridView] = useState("3");
  //Burada "Gösterim" seçildiğinde, seçilen uzunluk kadar takvim yaratmasını sağlar.
  const [numberOfCalendar, setNumberOfCalendar] = useState(
    Array.from({ length: selectGridView }, (_, i) => i + date.getMonth())
  );

  // Şuanki ayı tespit etmek için
  const [currentMonth] = useState(date.getMonth());
  //Fiyat bilgisi
  const [price] = useState(700);
  // Güncel günden önceki tüm günleri seçilemez yapmak için kullanılan state
  const dayElements = useRef([]);
  // Sonda açılan modal için bilgileri toplama amaçlı kullanılıyor
  const [storeBookingInfos, setStoreBookingInfos] = useState({
    startDate: null,
    endDate: null,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState({
    first: 0,
    second: 0,
    isDoubleClick: false,
  });

  useEffect(() => {
    // Bugünden önceki tüm günleri seçilemez yapmak için
    dayElements.current.forEach((dayEl) => {
      if (dayEl?.classList?.contains("current-day")) {
        $(dayEl).prevAll().css("background-color", "#C0C0C0");
        $(dayEl).prevAll().css("cursor", "not-allowed");
        $(dayEl).prevAll().addClass("disabled-day");
      }
    });
  }, []);

  // Gösterim seçimi her değiştiğinde takvimde değişiklik olması için
  useEffect(() => {
    setNumberOfCalendar(
      Array.from({ length: selectGridView }, (_, i) => i + date.getMonth())
    );
  }, [selectGridView]);

  function openModal() {
    setIsOpen(true);
  }

  const customStylesForModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div className="App">
        <div className="book-table">
          <div className="table-grid-select">
            Gösterim:
            <select
              onChange={(e) => {
                setSelectGridView(e.target.value);
              }}
            >
              <option value={1}>1</option>
              <option value={3} selected>
                3
              </option>
              <option value={6}>6</option>
              <option value={12}>12</option>
            </select>
          </div>
          <div className={`sorted-calendars`}>
            {numberOfCalendar.map((calendarNumber, index) => {
              return (
                <Calendar
                  key={index}
                  calendarNumber={calendarNumber}
                  currentDate={date.getDate()}
                  currentMonth={currentMonth}
                  setGetYear={setGetYear}
                  setClickCount={setClickCount}
                  clickCount={clickCount}
                  getYear={getYear}
                  price={price}
                  dayElements={dayElements}
                  openModal={openModal}
                  setStoreBookingInfos={setStoreBookingInfos}
                  storeBookingInfos={storeBookingInfos}
                />
              );
            })}
          </div>
        </div>
      </div>
      <DateModal
        modalIsOpen={modalIsOpen}
        customStylesForModal={customStylesForModal}
        storeBookingInfos={storeBookingInfos}
      />
    </>
  );
}

export default App;
