import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function extractContent(html) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');
    return parsed.body.textContent || "";
}

function Editor({content, setContent}) {
    
        return (
            <div className="App">
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    // onChange={ ( event ) => {
                    //     console.log( event );
                    // } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                        const data = editor.getData();
                        console.log( event, editor, data );
                        const textContent = extractContent(data);
                        setContent(textContent);
                        console.log(content)
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    
}

export default Editor;
