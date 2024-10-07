"use client";

import React, { useEffect, useState } from "react";
import "./previewTab.css";
import { appStore } from "@/store/appStore";
import CloseIcon from "@mui/icons-material/Close";
import { PREVIEWTAB_DEMO } from "@/utils/constants";



const PreviewTab = () => {
  const previewTab = appStore((state) => state.previewTab);
  const updatePreviewTab = appStore((state) => state.updatePreviewTab);

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (!previewTab.open) return;

    const str = previewTab.renderContent;
    const removedSpaces = str.replace(/\s+/g, '');

    if (removedSpaces) {
      setHtmlContent(previewTab.renderContent);
    } else {
      setHtmlContent('')
    }
  }, [previewTab]);

  const closePreviewTab = () => { 
    updatePreviewTab({
        open: false,
        renderContent: ''
      });
  }

  return (
    <div className="previewTabCont">
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
          srcDoc={htmlContent || PREVIEWTAB_DEMO}
          title="HTML Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default PreviewTab;
