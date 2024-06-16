import React, { useState, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Ensure this is imported
import ImageResize from 'quill-image-resize-module-react';

import './style.css'

Quill.register('modules/imageResize', ImageResize);

const Editor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
    console.log(html);
  }, []);

  return (
    <ReactQuill
      theme="snow"
      value={editorHtml}
      onChange={handleChange}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds="#root"
      placeholder={placeholder}
      style={{ height: '400px' }}  // Optional: Adjust the height as needed
    />
  );
};

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default Editor;
