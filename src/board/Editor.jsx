import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// function extractContent(html) {
//     const parser = new DOMParser();
//     const parsed = parser.parseFromString(html, "text/html");
//     return parsed.body.textContent || "";
// }

function Editor({ content, setContent }) {
    return (
        <div className="editor">
            <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {}}
                onBlur={(event, editor) => {
                    const data = editor.getData();

                    setContent(data);
                }}
                onFocus={(event, editor) => {}}
            />
        </div>
    );
}

export default Editor;
