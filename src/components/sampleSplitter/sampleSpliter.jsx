import React, { useState } from 'react';
import './sampleSplitter.css';

const SampleSplitter = ({
  id = 'drag-bar',
  isDragging,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={`styles.sampleDragBar 
                  ${(isDragging || isFocused) ? 'dragging' : ''}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}

export default SampleSplitter;
