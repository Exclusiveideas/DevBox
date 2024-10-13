"use client";

import React, { createRef, useEffect, useState } from "react";
import "./splitView.css";

let MIN_WIDTH;
let MAX_RIGHT_WIDTH;


const RightPane = ({ children, rightWidth, openPreviewTab }) => {
  const rightRef = createRef();

  useEffect(() => {
    if (!rightRef.current || !MIN_WIDTH || !MAX_RIGHT_WIDTH) return;
    const width =
      (rightWidth <= MIN_WIDTH
        ? MIN_WIDTH
        : rightWidth);

    rightRef.current.style.width = `${width}px`;
  }, [rightWidth, openPreviewTab]);

  return (
    <div ref={rightRef} style={{ height: "100%" }}>
      {children}
    </div>
  );
};

export const SplitView = ({ right, className }) => {
  const [rightWidth, setRightWidth] = useState();
  const [dragging, setDragging] = useState(false);
  const splitPaneRef = createRef();

  useEffect(() => {
    if (!splitPaneRef.current) return;

    const splitPaneWidth = splitPaneRef.current?.clientWidth;

    setRightWidth(Math.floor((2 * splitPaneWidth) / 3));
    MIN_WIDTH = Math.floor(splitPaneWidth / 3);
    MAX_RIGHT_WIDTH = splitPaneWidth;

  }, [splitPaneRef.current]);

  const onMouseDown = (e) => {
    setDragging(true);
  };

  const onMouseMove = (e) => {
    if (dragging && splitPaneRef.current) {
      const splitPaneWidth = splitPaneRef.current.clientWidth;
      let newRightWidth = splitPaneWidth - e.clientX;

      if (newRightWidth < MIN_WIDTH) {
        newRightWidth = MIN_WIDTH;
      } else if (newRightWidth > splitPaneWidth - MIN_WIDTH) {
        newRightWidth = splitPaneWidth - MIN_WIDTH;
      }

      setRightWidth(newRightWidth);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    
    const handleMouseMoveGlobal = (event) => {
      if (dragging) {
        onMouseMove(event);
      }
    };

    const handleMouseUpGlobal = () => {
      if (dragging) {
        onMouseUp();
      }
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  });

  return (
    <div className={`splitView ${className ?? ""}`} ref={splitPaneRef}>
      <div
        className="divider-hitbox"
        onMouseDown={onMouseDown}
      >
        <div className="divider" />
      </div>
      <RightPane rightWidth={rightWidth}>
        {right}
      </RightPane>
    </div>
  );
};
