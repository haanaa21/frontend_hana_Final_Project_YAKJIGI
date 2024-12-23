import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from '../styles/mybasicboardlog/mybasicboardlogwrite.module.css';
function Editor(props) {
    return (
        <>
            <div className={styles.ckeditor}>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>처방 병원, 약국 등 메모 작성</p>"
                    onReady={(editor) => {
                        // 에디터 초기화 시 클래스 추가
                        const editableElement = editor.ui.view.editable.element;
                        if (editableElement) {
                            editableElement.classList.add(styles.ckEditorEditable);

                           // 이벤트 등록
                            editor.editing.view.document.on('focus', () => {
                                editableElement.classList.add(styles.ckEditorEditable);
                            });

                            editor.editing.view.document.on('blur', () => {
                                editableElement.classList.add(styles.ckEditorEditable);
                            });
                        }
                        }}
                        onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ data });
                }}
            />
        </div>
    </>
    );
}
export default Editor;