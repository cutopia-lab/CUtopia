import React from 'react';

import './Badge.css';
import updateOpacity from '../helpers/updateOpacity';
import colors from '../constants/colors';

const Badge = ({
  index, text, value, isGrade, color,
}) => {
  const badgeColor = isGrade ? colors.gradeColors[value] : colors.randomColors[index >= colors.randomColors.length ? (index % colors.randomColors.length) : index];
  return (
    <div
      className="badge"
      style={{
        backgroundColor: color || updateOpacity(badgeColor, isGrade ? 1 : 0.7),
      }}
    >
      <p className="badge-text">{text}</p>
      {Boolean(value) && <p className="badge-text-value">{`${value}`}</p> }
    </div>
  );
};

export default Badge;