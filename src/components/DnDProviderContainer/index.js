import React from 'react';

// react-dnd
import { DndProvider } from 'react-dnd';

// dnd backend
import { HTML5Backend } from 'react-dnd-html5-backend';

const DnDProviderContainer = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DnDProviderContainer;
