// import React from 'react';
import styled from 'styled-components';

const Dot = styled.p`
  cursor: pointer;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  display: inline-block;
  color: ${({ isActive }) => (isActive ? '#1f2937' : '#9ca3af')};
  transform: ${({ isActive }) => (isActive ? 'scale(1.5) scaleX(2.15)' : 'none')};
`;

const Indicator = ({ step, length, handleMoveTo }) => {
  return (
    <div className="indicator-container">
      {Array.from({ length }).map((_, index) => (
        <Dot
          key={index}
          isActive={index === step}
          onClick={() => handleMoveTo(index)}
        >
          •
        </Dot>
      ))}
    </div>
  );
};

export default Indicator;