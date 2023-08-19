import React from 'react';

const DetailsSectionContainer = ({ title, children, id }) => {
  return (
    <div className="details-section" id={id}>
      <p className="details-section-header">{title}</p>

      <div className="details-section-container">{children}</div>
    </div>
  );
};

export default DetailsSectionContainer;
