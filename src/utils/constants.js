export const optionBarMenuOptOne = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Terminal",
  "Help",
];
export const optionBarMenuOptTwo = {
  File: [
    [
      ["New Text File", "Ctrl + K N"],
      ["New File...", "Ctrl+Alt+Windows+N"],
      ["New Window", "Ctrl+K Shift+N"],
    ],
    [["Open File...", "Ctrl+O"]],
    [
      ["Save", "Ctrl+S"],
      ["Save As...", "Ctrl+Shift+S"],
    ],
    [["Auto Save"]],
    [["Close Editor", "Ctrl+F4"]],
    [["Confirm Before Close"]],
  ],
  Edit: [
    [
      ["Undo", "Ctrl+Z"],
      ["Redo", "Ctrl+Y"],
    ],
    [["Cut"], ["Copy"], ["Paste"]],
    [
      ["Find", "Ctrl+F"],
      ["Replace", "Ctrl+H"],
    ],
    [
      ["Find in Files", "Ctrl+Shift+F"],
      ["Replace in Files", "Ctrl+Shift+H"],
    ],
    [
      ["Toggle Line Comment", "Ctrl+/"],
      ["Toggle Block Comment", "Shift+Alt+A"],
    ],
  ],
  Selection: [
    [
      ["Select All", "Ctrl+A"],
      ["Expand Selection", "Shift+Alt+RIghtArrow"],
      ["Shrink Selection", "Shift+Alt+LeftArrow"],
    ],
    [
      ["Copy Line Up", "Shift+Alt+UpArrow"],
      ["Copy Line Down", "Shift+Alt+DownArrow"],
      ["Move Line Up", "Alt+UpArrow"],
      ["Move Line Down", "Alt+DownArrow"],
      ["Duplicate Selection"],
    ],
    [
      ["Add Cursor Above", "Ctrl+Alt+UpArrow"],
      ["Add Cursor Below", "Ctrl+Alt+DownArrow"],
      ["Add Cursors to Line Ends", "Shift+Alt+I"],
      ["Add Next Occurence", "Ctrl+D"],
      ["Add Previous Occurence"],
      ["Select All Occurences", "Ctrl+Shift+L"],
    ],
  ],
  View: [
    [["Command Palette...", "Ctrl+Shift+P"], ["Open View..."]],
    [["Appearance"], ["Editor Layout"]],
    [
      ["Explorer", "Ctrl+Shift+E"],
      ["Search", "Ctrl+Shift+F"],
    ],
    [
      ["Problems", "Ctrl+Shift+M"],
      ["Output", "Ctrl+Shift+U"],
    ],
    [["Word Wrap", "Alt+Z"]],
  ],
  Go: [
    [
      ["Back", "Alt+LeftArrow"],
      ["Forward", "Alt+RightArrow"],
      ["Last Edit Location", "Ctrl+K Ctrl+Q"],
    ],
    [
      ["Go to File...", "Ctrl P"],
      ["Go to Symbol in Workspace...", "Ctrl+T"],
    ],
    [
      ["Next Problem", "F8"],
      ["Previous Problem", "Shift+F8"],
    ],
  ],
  Terminal: [[["New Terminal"]]],
  Help: [[["Show All Commands"]], [["About"]]],
};

export const topBarMenuOptOne = [
  "Documentation",
  "Editor",
  "Version: 1.0.0",
  "Sign In",
];
export const topBarMenuOptTwo = [
  [
    ["User Preferences", "Ctrl ,"],
    ["Color Theme"],
    ["Command Palette", "Ctrl K"],
    ["Keyboard Shortcut"],
  ],
  [
    ["Toggle Sidebar", "Ctrl B"],
    ["Toggle Tasks and Terminals", "Ctrl J"],
  ],
];

export const menuSpecials = {
  menuTwoWithExpand: ["Appearance", "Editor Layout"],

  menuTwoCheckIcon: [
    "Auto Save",
    // "Confirm Before Close"
  ],

  menuTwoDisabled: [
    "New Text File",
    "New File...",
    "Back",
    "Forward",
    "Last Edit Location",
    "Go to File...",
    "Go to Symbol in Workspace...",
    "Next Problem",
    "Previous Problem",
    "Command Palette...",
    "Open View...",
    "Appearance",
    "Editor Layout",
    "Explorer",
    "Search",
    "Problems",
    "Output",
    "Word Wrap",
    "Select All",
    "Expand Selection",
    "Shrink Selection",
    "Copy Line Up",
    "Copy Line Down",
    "Move Line Up",
    "Move Line Down",
    "Duplicate Selection",
    "Add Cursor Above",
    "Add Cursor Below",
    "Add Cursors to Line Ends",
    "Add Previous Occurence",
    "Add Next Occurence",
    "Select All Occurences",
    "Undo",
    "Redo",
    "Cut",
    "Copy",
    "Paste",
    "Find",
    "Replace",
    "Replace in Files",
    "Toggle Line Comment",
    "Toggle Block Comment",
    "New Window",
    "Save",
    "Save As...",
    "Open File...",
    "Close Editor",
    "Confirm Before Close",
    "Show All Commands",
    "User Preferences",
    "Command Palette",
    "Keyboard Shortcut",
    "Toggle Sidebar",
    "Toggle Tasks and Terminals",
  ],
  menuOneDisabled: ["Sign In"],
};

export const PREVIEWTAB_DEMO = `<!DOCTYPE html>
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
      background: linear-gradient(135deg, rgba(255, 0, 102, 0.571), rgba(255, 255, 153, 0.664), #1E1E1E, #0D0D0D);
    }
    .container {
      text-align: center;
      padding: 40px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 90%; /* Changed from 100% to 90% for better responsiveness */
      margin: 20px; /* Added margin for spacing on small screens */
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
    .action {
      font-size: 13px;
      color: rgba(166, 7, 7, 0.712);
    }
    /* Media queries for responsiveness */
    @media (max-width: 600px) {
      .container {
        padding: 20px;
      }
      h1 {
        font-size: 24px;
      }
      p {
        font-size: 14px;
      }
      .action {
        font-size: 12px;
      }
    }
    @media (max-width: 400px) {
      .container {
        padding: 15px;
      }
      h1 {
        font-size: 20px;
      }
      p {
        font-size: 12px;
      }
      .action {
        font-size: 11px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Render One of Your HTML Files Here</h1>
    <p>You are currently rendering an empty .html file</p>
    <p class="action">Please select or upload an HTML file to render its content on this page.</p>
  </div>
</body>
</html>
`;
