import React from "react";

export default function TitleAndIcon(props) {
  return (
    <div className="title-with-icon-container">
      <img src="/icon.png" alt="Sidebar Icon" className="sidebar-icon-login" />
      <div className="title-login">Solar Schedule</div>
    </div>
  );
}
