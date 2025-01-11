import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function Editor({ data, onChange }) {
  const uploadAdapter = (loader) => ({
    upload: () =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        loader.file.then((file) => {
          formData.append('upload', file);
          axios
            .post('/upload-endpoint', formData)
            .then((res) => resolve({ default: res.data.url }))
            .catch(reject);
        });
      }),
  });

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data} // 초기 데이터 전달
      config={{
        toolbar: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'link',
          'bulletedList',
          'numberedList',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'horizontalLine',
          'specialCharacters',
        ],
        image: {
          toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
        },
        ckfinder: {
          uploadUrl: '/your-image-upload-endpoint',
        },
      }}
      onChange={(event, editor) => {
        const value = editor.getData();
        onChange(value); // 부모 컴포넌트로 데이터 전달
      }}
    />
  );
}

export default Editor;