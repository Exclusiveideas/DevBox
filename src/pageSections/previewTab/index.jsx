"use client";

import React, { useEffect, useState } from "react";
import "./previewTab.css";
import { appStore } from "@/store/appStore";
import CloseIcon from "@mui/icons-material/Close";

const PreviewTab = ({ resizableWidth}) => {
  const previewTab = appStore((state) => state.previewTab);
  const updatePreviewTab = appStore((state) => state.updatePreviewTab);

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (!previewTab.open) return;

    setHtmlContent(previewTab.renderContent);
  }, [previewTab]);

  const closePreviewTab = () => {
    updatePreviewTab({
        open: false,
        renderContent: ''
      });
  }

  return (
    <div className="previewTabCont" style={{ width: resizableWidth}}>
      <div className="previewTopCont">
        <div className="titleWrapper">
          <p>Preview Tab</p>
          <CloseIcon
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={closePreviewTab}
          />
        </div>
      </div>
      <div className="previewRenderCont">
        <iframe
          srcDoc={htmlContent}
          title="HTML Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default PreviewTab;
