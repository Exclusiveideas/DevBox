import { loader } from "@monaco-editor/react";
import {
  getFileTree,
} from "../lib/my-modified-modules/litecode-ide-mod/dist/@litecode-ide/virtual-file-system.es";

export const editorThemes = ["vs", "vs-dark", "hc-black", "hc-light"];


export const editorFileExtensions = [
  "js", // JavaScript
  "ts", // TypeScript
  "py", // Python
  "java", // Java
  "cs", // C#
  "cpp", // C++
  "php", // PHP
  "go", // Go
  "rb", // Ruby
  "swift", // Swift
  "rs", // Rust
  "html", // HTML
  "css", // CSS
  "json", // JSON
  "yaml", // YAML
  "md", // Markdown
  "sql", // SQL
  "sh", // Shell scripting (bash)
  "xml", // XML
  "r", // R
  "coffee", // CoffeeScript
  "graphql", // GraphQL
  "less", // LESS (CSS Preprocessor)
  "scss", // SCSS (CSS Preprocessor)
  "tsx",
  "jsx",
  "json",
];

export const monacoThemes = {
  active4d: "Active4D",
  "all-hallows-eve": "All Hallows Eve",
  amy: "Amy",
  "birds-of-paradise": "Birds of Paradise",
  blackboard: "Blackboard",
  "brilliance-black": "Brilliance Black",
  "brilliance-dull": "Brilliance Dull",
  "chrome-devtools": "Chrome DevTools",
  "clouds-midnight": "Clouds Midnight",
  clouds: "Clouds",
  cobalt: "Cobalt",
  dawn: "Dawn",
  dreamweaver: "Dreamweaver",
  eiffel: "Eiffel",
  "espresso-libre": "Espresso Libre",
  github: "GitHub",
  idle: "IDLE",
  katzenmilch: "Katzenmilch",
  "kuroir-theme": "Kuroir Theme",
  lazy: "LAZY",
  "magicwb--amiga-": "MagicWB (Amiga)",
  "merbivore-soft": "Merbivore Soft",
  merbivore: "Merbivore",
  "monokai-bright": "Monokai Bright",
  monokai: "Monokai",
  "night-owl": "Night Owl",
  "oceanic-next": "Oceanic Next",
  "pastels-on-dark": "Pastels on Dark",
  "slush-and-poppies": "Slush and Poppies",
  "solarized-dark": "Solarized-dark",
  "solarized-light": "Solarized-light",
  spacecadet: "SpaceCadet",
  sunburst: "Sunburst",
  "textmate--mac-classic-": "Textmate (Mac Classic)",
  "tomorrow-night-blue": "Tomorrow-Night-Blue",
  "tomorrow-night-bright": "Tomorrow-Night-Bright",
  "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
  "tomorrow-night": "Tomorrow-Night",
  tomorrow: "Tomorrow",
  twilight: "Twilight",
  "upstream-sunburst": "Upstream Sunburst",
  "vibrant-ink": "Vibrant Ink",
  "xcode-default": "Xcode_default",
  zenburnesque: "Zenburnesque",
  iplastic: "iPlastic",
  idlefingers: "idleFingers",
  krtheme: "krTheme",
  monoindustrial: "monoindustrial",
};

export const defineTheme = (theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export const compileLanguageOptions = [
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
  },
  { id: 75, name: "C (Clang 7.0.1)", label: "C (Clang 7.0.1)", value: "c" },
  {
    id: 76,
    name: "C++ (Clang 7.0.1)",
    label: "C++ (Clang 7.0.1)",
    value: "cpp",
  },
  { id: 48, name: "C (GCC 7.4.0)", label: "C (GCC 7.4.0)", value: "c" },
  { id: 52, name: "C++ (GCC 7.4.0)", label: "C++ (GCC 7.4.0)", value: "cpp" },
  { id: 49, name: "C (GCC 8.3.0)", label: "C (GCC 8.3.0)", value: "c" },
  { id: 53, name: "C++ (GCC 8.3.0)", label: "C++ (GCC 8.3.0)", value: "cpp" },
  { id: 50, name: "C (GCC 9.2.0)", label: "C (GCC 9.2.0)", value: "c" },
  { id: 54, name: "C++ (GCC 9.2.0)", label: "C++ (GCC 9.2.0)", value: "cpp" },
  {
    id: 86,
    name: "Clojure (1.10.1)",
    label: "Clojure (1.10.1)",
    value: "clojure",
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
  },
  { id: 57, name: "Elixir (1.9.4)", label: "Elixir (1.9.4)", value: "elixir" },
  {
    id: 87,
    name: "F# (.NET Core SDK 3.1.202)",
    label: "F# (.NET Core SDK 3.1.202)",
    value: "fsharp",
  },
  { id: 60, name: "Go (1.13.5)", label: "Go (1.13.5)", value: "go" },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
  },
  {
    id: 78,
    name: "Kotlin (1.3.70)",
    label: "Kotlin (1.3.70)",
    value: "kotlin",
  },
  { id: 64, name: "Lua (5.3.5)", label: "Lua (5.3.5)", value: "lua" },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
    label: "Pascal (FPC 3.0.4)",
    value: "pascal",
  },
  { id: 85, name: "Perl (5.28.1)", label: "Perl (5.28.1)", value: "perl" },
  { id: 68, name: "PHP (7.4.1)", label: "PHP (7.4.1)", value: "php" },
  {
    id: 70,
    name: "Python (2.7.17)",
    label: "Python (2.7.17)",
    value: "python",
  },
  { id: 71, name: "Python (3.8.1)", label: "Python (3.8.1)", value: "python" },
  { id: 80, name: "R (4.0.0)", label: "R (4.0.0)", value: "r" },
  { id: 72, name: "Ruby (2.7.0)", label: "Ruby (2.7.0)", value: "ruby" },
  { id: 73, name: "Rust (1.40.0)", label: "Rust (1.40.0)", value: "rust" },
  { id: 81, name: "Scala (2.13.2)", label: "Scala (2.13.2)", value: "scala" },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
    label: "SQL (SQLite 3.27.2)",
    value: "sql",
  },
  { id: 83, name: "Swift (5.2.3)", label: "Swift (5.2.3)", value: "swift" },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
    label: "TypeScript (3.7.4)",
    value: "typescript",
  },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    label: "Visual Basic.Net (vbnc 0.0.0.5943)",
    value: "vbnet",
  },
];

export const editorFileLanguage = [
  { ext: "js", name: "JavaScript", value: "javascript" },
  { ext: "ts", name: "TypeScript", value: "typescript" },
  { ext: "py", name: "Python", value: "python" },
  { ext: "java", name: "Java", value: "java" },
  { ext: "cs", name: "C#", value: "csharp" },
  { ext: "cpp", name: "C++", value: "cpp" },
  { ext: "php", name: "PHP", value: "php" },
  { ext: "go", name: "Go", value: "go" },
  { ext: "rb", name: "Ruby", value: "ruby" },
  { ext: "swift", name: "Swift", value: "swift" },
  { ext: "rs", name: "Rust", value: "rust" },
  { ext: "html", name: "HTML", value: "html" },
  { ext: "css", name: "CSS", value: "css" },
  { ext: "json", name: "JSON", value: "json" },
  { ext: "yaml", name: "YAML", value: "yaml" },
  { ext: "md", name: "Markdown", value: "md" },
  { ext: "sql", name: "SQL", value: "sql" },
  { ext: "sh", name: "Shell scripting (bash)", value: "bash" },
  { ext: "xml", name: "XML", value: "xml" },
  { ext: "r", name: "R", value: "r" },
  { ext: "coffee", name: "CoffeeScript", value: "coffeescript" },
  { ext: "graphql", name: "GraphQL", value: "graphql" },
  { ext: "less", name: "LESS (CSS Preprocessor)", value: "less" },
  { ext: "scss", name: "SCSS (CSS Preprocessor)", value: "scss" },
  { ext: "jsx", name: "JSX (JavaScript XML)", value: "jsx" },
  { ext: "tsx", name: "TSX (TypeScript XML)", value: "tsx" },
];

export const getActiveFileProps = (id) => {
  const fileTree = getFileTree();
  let returnObj = {
    ext: '',
    languageName: '',
    language: ''
  }

  for (let key in fileTree) {
    if (fileTree[key]?.id == id) {
      const split = key.split(".");

      returnObj.ext = split[1];
    }
  }

  for(let i = 0; i < editorFileLanguage?.length; i++) {
    if(editorFileLanguage[i].ext == returnObj?.ext) {
      returnObj = {...returnObj, languageName: editorFileLanguage[i]?.name, language: editorFileLanguage[i]?.value}
    }
  }

  return returnObj
};
