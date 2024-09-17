export const optionBarMenuOptOne = [ 'File', 'Edit', 'Selection', 'View', 'Go', 'Terminal', 'Help']
export const optionBarMenuOptTwo = {
    File: [[['New Text File', 'Ctrl + K N'], ['New File...', 'Ctrl+Alt+Windows+N'], ['New Window', 'Ctrl+K Shift+N']], [['Open File...', 'Ctrl+O']], [['Save', 'Ctrl+S'], ['Save As...', 'Ctrl+Shift+S']], [['Auto Save']], [['Close Editor', 'Ctrl+F4']], [['Confirm Before Close']]],
    Edit: [[['Undo', 'Ctrl+Z'], ['Redo', 'Ctrl+Y']], [['Cut'], ['Copy'], ['Paste']], [['Find', 'Ctrl+F'], ['Replace', 'Ctrl+H']], [['Find in Files', 'Ctrl+Shift+F'], ['Replace in Files', 'Ctrl+Shift+H']], [['Toggle Line Comment', 'Ctrl+/'], ['Toggle Block Comment', 'Shift+Alt+A']]],
    Selection: [[['Select All', 'Ctrl+A'], ['Expand Selection', 'Shift+Alt+RIghtArrow'], ['Shrink Selection', 'Shift+Alt+LeftArrow']], [['Copy Line Up', 'Shift+Alt+UpArrow'], ['Copy Line Down', 'Shift+Alt+DownArrow'], ['Move Line Up', 'Alt+UpArrow'], ['Move Line Down', 'Alt+DownArrow'], ['Duplicate Selection']], [['Add Cursor Above', 'Ctrl+Alt+UpArrow' ], ['Add Cursor Below', 'Ctrl+Alt+DownArrow'], ['Add Cursors to Line Ends', 'Shift+Alt+I'], ['Add Next Occurence', 'Ctrl+D'], ['Add Previous Occurence'], ['Select All Occurences', 'Ctrl+Shift+L'] ]],
    View: [[['Command Palette...', 'Ctrl+Shift+P'], ['Open View...']], [['Appearance'], ['Editor Layout']], [['Explorer', 'Ctrl+Shift+E'], ['Search', 'Ctrl+Shift+F']], [['Problems', 'Ctrl+Shift+M'], ['Output', 'Ctrl+Shift+U']], [['Word Wrap', 'Alt+Z']]],
    Go: [[['Back', 'Alt+LeftArrow'], ['Forward', 'Alt+RightArrow'], ['Last Edit Location', 'Ctrl+K Ctrl+Q']], [['Go to File...', 'Ctrl P'], ['Go to Symbol in Workspace...', 'Ctrl+T']], [['Next Problem', 'F8'], ['Previous Problem', 'Shift+F8']] ],
    Terminal: [[['New Terminal']]],
    Help: [[['Show All Commands']], [['About']]],
}


export const topBarMenuOptOne = ["Documentation", "Editor", "Version: ", "Sign In"]
export const topBarMenuOptTwo = [[["User Preferences", "Ctrl ,"], ["Color Theme"], ["Command Palette", "Ctrl K"], ["Keyboard Shortcut"]], [["Toggle Sidebar", "Ctrl B"], ["Toggle Tasks and Terminals", "Ctrl J"]]]