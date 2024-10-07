import { create } from "zustand";
import zukeeper from "zukeeper";

export const appStore = create(
  zukeeper((set) => ({
    editorOpts: {
      openBackdrop: false,
      theme: "",
      searchItemClick: false,
      searchLine: null,
      tourDemo: false,
    },
    updateEditorOpts: ({
      openBackdrop,
      theme,
      searchItemClick,
      searchLine,
      tourDemo,
    }) =>
      set((state) => ({
        editorOpts: {
          ...state.editorOpts,
          openBackdrop,
          theme,
          searchItemClick,
          searchLine,
          tourDemo,
        },
      })),

    menuPopperOpts: {
      openTopBarMenuOne: false,
      openTopBarMenuTwo: false,
      openOptBarMenuOne: false,
      openOptBarMenuTwo: false,
    },
    updateMenuPopperOpts: ({
      openTopBarMenuOne,
      openTopBarMenuTwo,
      openOptBarMenuOne,
      openOptBarMenuTwo,
    }) =>
      set((state) => ({
        menuPopperOpts: {
          ...state.menuPopperOpts,
          openTopBarMenuOne,
          openTopBarMenuTwo,
          openOptBarMenuOne,
          openOptBarMenuTwo,
        },
      })),

    optionBar: {
      activeOpt: 0,
    },
    updateActiveOptBar: ({ activeOpt }) =>
      set((state) => ({
        optionBar: { ...state.optionBar, activeOpt },
      })),

    activeFile: {
      value: null,
      ext: "",
      language: "",
      languageName: "",
    },
    updateActiveFile: ({ value, ext, language, languageName }) =>
      set((state) => ({
        activeFile: { ...state.activeFile, value, ext, language, languageName },
      })),

    previewTab: {
      open: false,
      renderContent: "",
    },
    updatePreviewTab: ({ open, renderContent }) =>
      set((state) => ({
        previewTab: { ...state.previewTab, open, renderContent },
      })),

    terminal: {
      open: false,
    },
    updateTerminal: ({ open }) =>
      set((state) => ({
        terminal: { ...state.previewTab, open },
      })),

    dialogBox: {
      open: false,
      initiator: null,
      param: null,
    },
    updateDialogBox: ({ open, initiator, param }) =>
      set((state) => ({
        dialogBox: { ...state.dialogBox, open, initiator, param },
      })),
  }))
);
