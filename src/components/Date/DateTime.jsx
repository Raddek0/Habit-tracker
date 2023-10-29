import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-family: "Courier New";
`;

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dateTimeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDateTime = currentDateTime.toLocaleString(
    undefined,
    dateTimeOptions
  );

  return (
    <DateTimeWrapper>
      {currentDateTime && <p>{formattedDateTime}</p>}
    </DateTimeWrapper>
  );
};

export default DateTime;
