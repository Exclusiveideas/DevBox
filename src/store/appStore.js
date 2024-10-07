import { create } from 'zustand'
import zukeeper from 'zukeeper'

export const appStore = create(zukeeper((set) => ({
    editorOpts: {
        openBackdrop: false,
        theme: '',
        searchItemClick: false,
        searchLine: null,
        tourDemo: false,
    },
    updateEditorBackdrop: ({openBackdrop}) => set((state) => ({
        editorOpts: {...state.editorOpts, openBackdrop}
    })),
    updateEditorTheme: ({ theme }) => set((state) => ({
        editorOpts: {...state.editorOpts, theme}
    })),
    updateVfsSearch: ({ searchItemClick, searchLine }) => set((state) => ({
        editorOpts: {...state.editorOpts, searchItemClick, searchLine}
    })),
    updateTourDemo: ({ tourDemo }) => set((state) => ({
        editorOpts: {...state.editorOpts, tourDemo}
    })),
    menuPopperOpts: {
        openTopBarMenuOne: false,
        openTopBarMenuTwo: false,
        openOptBarMenuOne: false,
        openOptBarMenuTwo: false,
    },
    updateTopBarMenuOne: ({openTopBarMenuOne}) => set((state) => ({
        menuPopperOpts: {...state.menuPopperOpts, openTopBarMenuOne}
    })),
    updateTopBarMenuTwo: ({openTopBarMenuTwo}) => set((state) => ({
        menuPopperOpts: {...state.menuPopperOpts, openTopBarMenuTwo}
    })),
    updateOptBarMenuOne: ({openOptBarMenuOne}) => set((state) => ({
        menuPopperOpts: {...state.menuPopperOpts, openOptBarMenuOne}
    })),
    updateOptBarMenuTwo: ({openOptBarMenuTwo}) => set((state) => ({
        menuPopperOpts: {...state.menuPopperOpts, openOptBarMenuTwo}
    })),
    optionBar: {
        activeOpt: 0
    },
    updateActiveOptBar: ({activeOpt}) => set((state) => ({
        optionBar: {...state.optionBar, activeOpt}
    })),
    activeFile: {
        value: null,
        ext: '',
        language: '',
        languageName: ''
    },
    updateActiveFile: ({value, ext, language, languageName}) => set((state) => ({
        activeFile: {...state.activeFile, value, ext, language, languageName}
    })),
    previewTab: {
        open: false,
        renderContent: ''
    },
    updatePreviewTab: ({open, renderContent}) => set((state) => ({
        previewTab: {...state.previewTab, open, renderContent}
    })),
    terminal: {
        open: false,
    },
    updateTerminal: ({open}) => set((state) => ({
        terminal: {...state.previewTab, open}
    })),

    dialogBox: {
        open: false,
        initiator: null,
        param: null,
    },
    updateDialogBox: ({ open, initiator, param }) => set((state) => ({
        dialogBox: {...state.dialogBox, open, initiator, param}
    })),
})))