import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import Pica from 'pica';
import 'react-quill/dist/quill.snow.css'
import './style.css';

Quill.register('modules/imageResize', ImageResize);

const pica = Pica();

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const MAX_WIDTH = 600; 
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      pica
        .resize(img, canvas)
        .then((resizedCanvas) => pica.toBlob(resizedCanvas, 'image/jpeg', 0.90))
        .then((blob) => {
          const resizedReader = new FileReader();
          resizedReader.onload = (e) => resolve(e.target.result);
          resizedReader.readAsDataURL(blob);
        })
        .catch(reject);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

const Editor = ({ onChange, placeholder, description }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
    onChange(html);
    console.log("html", html);
  }, [onChange]);

  useEffect(() => {
    if (description) {
      setEditorHtml(description);
    }
  }, [description]);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const resizedImage = await resizeImage(file);
          const range = quillRef.current.getEditor().getSelection();
          quillRef.current.getEditor().insertEmbed(range.index, 'image', resizedImage);
        } catch (error) {
          console.error('Image resize error:', error);
        }
      }
    };
  }, []);

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      value={editorHtml}
      onChange={handleChange}
      modules={{
        ...Editor.modules,
        toolbar: {
          container: Editor.modules.toolbar,
          handlers: {
            image: handleImageUpload,
          },
        },
      }}
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
