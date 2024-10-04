"use client";

import React, { createRef, useEffect, useState } from "react";
import "./splitView.css";
import { appStore } from "@/store/appStore";

const MIN_WIDTH = 75;
const DEFAULT_LEFT_WIDTH = 800;
const MAX_LEFT_WIDTH = 1000;

const LeftPane = ({ children, leftWidth, openPreviewTab }) => {
  const leftRef = createRef();

  useEffect(() => {
    if (leftRef.current) {
      const width =
        leftWidth >= MAX_LEFT_WIDTH
          ? MAX_LEFT_WIDTH
          : leftWidth <= MIN_WIDTH
          ? MIN_WIDTH
          : leftWidth;
          
      if(openPreviewTab) {
        leftRef.current.style.width = `${width}px`;
      } else {
        leftRef.current.style.width = '100%'
      }
    }
  }, [leftWidth, openPreviewTab]);

  return (
    <div ref={leftRef} style={{ height: "100%" }}>
      {children}
    </div>
  );
};

const RightPane = ({ children, leftWidth, openPreviewTab }) => {
  const rightRef = createRef();

  useEffect(() => {
    if (rightRef.current) {
      rightRef.current.style.width = `calc(100% - 4px - ${leftWidth}px)`;
    }
  }, [leftWidth, openPreviewTab]);

  return (
    <div ref={rightRef} style={{ height: "100%", minWidth: "250px" }}>
      {children}
    </div>
  );
};

export const SplitView = ({ left, right, className }) => {
  const [leftWidth, setLeftWidth] = useState(DEFAULT_LEFT_WIDTH);
  const [dragging, setDragging] = useState(false);
  const splitPaneRef = createRef();

  const { open: openPreviewTab } = appStore((state) => state.previewTab);
  

  const onMouseDown = (e) => {
    setDragging(true);
  };

  const onMouseMove = (e) => {
    if (dragging && splitPaneRef.current) {
      const splitPaneWidth = splitPaneRef.current.clientWidth;
      let newLeftWidth = e.clientX;

      if (newLeftWidth < MIN_WIDTH) {
        newLeftWidth = MIN_WIDTH;
      } else if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
        newLeftWidth = splitPaneWidth - MIN_WIDTH;
      }

      setLeftWidth(newLeftWidth);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div className={`splitView ${className ?? ""}`} ref={splitPaneRef}>
      <LeftPane leftWidth={leftWidth} openPreviewTab={openPreviewTab}>{left}</LeftPane>
      {openPreviewTab && (
        <>
          <div
            className="divider-hitbox"
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
          >
            <div className="divider" />
          </div>
          <RightPane leftWidth={leftWidth} openPreviewTab={openPreviewTab}>{right}</RightPane>
        </>
      )}
    </div>
  );
};
