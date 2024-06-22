// import FullCalendarApp from './Calendar';
import Canlender4 from './Calendar4';
//import './styles.css';
import './Calendar.css';
export default function Typohraphy() {
  const handleClick = () => {
    // today time now
    const today = new Date();

    // get the current month
    const month = today.getMonth() + 1;

    // get the current day
    const day = today.getDate();

    // get the current year
    const year = today.getFullYear();

    // back to today4
    const date = new Date(year, month, day);

    // set the date
    //setSelectedDate(date);
    console.log('Selected date:', date);
  };

  return (
    <div className="main-container">
      <h1>จองคิวรักษาสัตว์</h1>
      {/* <FullCalendarApp /> */}
      <Canlender4 />
      <button onClick={handleClick}>today</button>
    </div>
  );
}
