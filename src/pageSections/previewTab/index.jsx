"use client";

import React, { useEffect, useState } from "react";
import "./previewTab.css";
import { appStore } from "@/store/appStore";
import CloseIcon from "@mui/icons-material/Close";

const demoPreview = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Render HTML File</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #f06, #ff9);
    }
    .container {
      text-align: center;
      padding: 40px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 100%;
    }
    h1 {
      font-size: 28px;
      color: #333;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      color: #666;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #f06;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #ff5733;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Render One of Your HTML Files Here</h1>
    <p>Please select or upload an HTML file to render its content on this page.</p>
    <a href="#" class="button">Upload HTML File</a>
  </div>
</body>
</html>
`

const PreviewTab = () => {
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
          srcDoc={htmlContent || demoPreview}
          title="HTML Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default PreviewTab;
