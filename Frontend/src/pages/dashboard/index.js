import React from 'react';
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';
import 'pages/dashboard/index.css';
export default function App() {
  function renderCell() {
    const list = [];

    const displayList = list.slice(0, 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li key="more">
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }
  return (
    <div className="container">
      <div className="calendar-wrapper">
        <Calendar bordered renderCell={renderCell} />
      </div>
    </div>
  );
}
