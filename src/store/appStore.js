import { create } from 'zustand'

export const appStore = create((set) => ({
    editorOpts: {
        openBackdrop: false,
        theme: ''
    },
    updateEditorBackdrop: ({openBackdrop}) => set((state) => ({
        editorOpts: {...state.editorOpts, openBackdrop}
    })),
    updateEditorTheme: ({ theme }) => set((state) => ({
        editorOpts: {...state.editorOpts, theme}
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
}))