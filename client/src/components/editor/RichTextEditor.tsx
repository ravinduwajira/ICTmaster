import React, { useCallback, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  FileText,
  AlertCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Upload,
  Youtube as YoutubeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
  Table as TableIcon,
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  Eye,
  Code2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

// Custom Quiz Block Extension
const QuizBlock = {
  name: 'quizBlock',
  group: 'block',
  content: 'block*',
  defining: true,
  
  addAttributes() {
    return {
      quizId: {
        default: null,
      },
      question: {
        default: '',
      },
      options: {
        default: [],
      },
      correctAnswer: {
        default: 0,
      },
      explanation: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-quiz-block]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-quiz-block': '', ...HTMLAttributes }, 0];
  },

  addCommands() {
    return {
      insertQuizBlock: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
};

// Custom Callout Extension
const Callout = {
  name: 'callout',
  group: 'block',
  content: 'block*',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-callout]',
        getAttrs: (element) => ({
          type: element.getAttribute('data-callout-type'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-callout': '',
        'data-callout-type': HTMLAttributes.type,
        class: `callout callout-${HTMLAttributes.type}`,
        ...HTMLAttributes,
      },
      0,
    ];
  },

  addCommands() {
    return {
      insertCallout: (type) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { type },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Enter your note here...' }],
            },
          ],
        });
      },
    };
  },
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your lesson content...',
  className = '',
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal form states
  const [imageForm, setImageForm] = useState({ url: '', alt: '', caption: '' });
  const [videoForm, setVideoForm] = useState({ url: '', width: 640, height: 480 });
  const [linkForm, setLinkForm] = useState({ url: '', text: '' });
  const [pdfForm, setPdfForm] = useState({ url: '', name: '', description: '' });
  const [quizForm, setQuizForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'editor-video',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Callout,
      QuizBlock,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  const insertImage = useCallback(() => {
    if (imageForm.url) {
      editor?.chain().focus().setImage({ 
        src: imageForm.url, 
        alt: imageForm.alt,
        title: imageForm.caption 
      }).run();
      setImageForm({ url: '', alt: '', caption: '' });
      setShowImageModal(false);
    }
  }, [editor, imageForm]);

  const insertVideo = useCallback(() => {
    if (videoForm.url) {
      editor?.chain().focus().setYoutubeVideo({
        src: videoForm.url,
        width: videoForm.width,
        height: videoForm.height,
      }).run();
      setVideoForm({ url: '', width: 640, height: 480 });
      setShowVideoModal(false);
    }
  }, [editor, videoForm]);

  const insertLink = useCallback(() => {
    if (linkForm.url) {
      if (linkForm.text) {
        editor?.chain().focus().insertContent(`<a href="${linkForm.url}">${linkForm.text}</a>`).run();
      } else {
        editor?.chain().focus().setLink({ href: linkForm.url }).run();
      }
      setLinkForm({ url: '', text: '' });
      setShowLinkModal(false);
    }
  }, [editor, linkForm]);

  const insertPdf = useCallback(() => {
    if (pdfForm.url) {
      const pdfHtml = `
        <div class="pdf-embed" data-pdf-url="${pdfForm.url}">
          <div class="pdf-preview">
            <div class="pdf-icon">📄</div>
            <div class="pdf-info">
              <h4>${pdfForm.name || 'PDF Document'}</h4>
              <p>${pdfForm.description || 'Click to view PDF'}</p>
              <a href="${pdfForm.url}" target="_blank" class="pdf-link">Open PDF</a>
            </div>
          </div>
        </div>
      `;
      editor?.chain().focus().insertContent(pdfHtml).run();
      setPdfForm({ url: '', name: '', description: '' });
      setShowPdfModal(false);
    }
  }, [editor, pdfForm]);

  const insertQuiz = useCallback(() => {
    if (quizForm.question && quizForm.options.every(opt => opt.trim())) {
      const quizId = `quiz_${Date.now()}`;
      const quizHtml = `
        <div class="quiz-block" data-quiz-id="${quizId}">
          <div class="quiz-header">
            <h4>📝 Quick Quiz</h4>
          </div>
          <div class="quiz-question">
            <p><strong>${quizForm.question}</strong></p>
          </div>
          <div class="quiz-options">
            ${quizForm.options.map((option, index) => `
              <div class="quiz-option ${index === quizForm.correctAnswer ? 'correct' : ''}">
                <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
                <span class="option-text">${option}</span>
                ${index === quizForm.correctAnswer ? '<span class="correct-indicator">✓</span>' : ''}
              </div>
            `).join('')}
          </div>
          ${quizForm.explanation ? `
            <div class="quiz-explanation">
              <p><strong>Explanation:</strong> ${quizForm.explanation}</p>
            </div>
          ` : ''}
        </div>
      `;
      editor?.chain().focus().insertContent(quizHtml).run();
      setQuizForm({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
      });
      setShowQuizModal(false);
    }
  }, [editor, quizForm]);

  const insertCallout = useCallback((type: string) => {
    const calloutIcons = {
      info: '💡',
      warning: '⚠️',
      tip: '💡',
      note: '📝',
      success: '✅',
      error: '❌',
    };

    const calloutHtml = `
      <div class="callout callout-${type}" data-callout-type="${type}">
        <div class="callout-header">
          <span class="callout-icon">${calloutIcons[type as keyof typeof calloutIcons] || '📝'}</span>
          <span class="callout-title">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </div>
        <div class="callout-content">
          <p>Enter your ${type} content here...</p>
        </div>
      </div>
    `;
    editor?.chain().focus().insertContent(calloutHtml).run();
  }, [editor]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For demo purposes, we'll create a mock URL
      const mockUrl = URL.createObjectURL(file);
      
      if (file.type.startsWith('image/')) {
        setImageForm(prev => ({ ...prev, url: mockUrl, alt: file.name }));
        setShowImageModal(true);
      } else if (file.type === 'application/pdf') {
        setPdfForm(prev => ({ ...prev, url: mockUrl, name: file.name }));
        setShowPdfModal(true);
      }
    }
  }, []);

  if (!editor) {
    return null;
  }

  const ToolbarButton: React.FC<{
    onClick: () => void;
    isActive?: boolean;
    icon: React.ReactNode;
    title: string;
    disabled?: boolean;
  }> = ({ onClick, isActive, icon, title, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md transition-colors
        ${isActive 
          ? 'bg-primary-100 text-primary-700' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {icon}
    </button>
  );

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-3">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              icon={<Bold className="w-4 h-4" />}
              title="Bold"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              icon={<Italic className="w-4 h-4" />}
              title="Italic"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              icon={<Strikethrough className="w-4 h-4" />}
              title="Strikethrough"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive('code')}
              icon={<Code className="w-4 h-4" />}
              title="Inline Code"
            />
          </div>

          {/* Headings */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              icon={<Heading1 className="w-4 h-4" />}
              title="Heading 1"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              icon={<Heading2 className="w-4 h-4" />}
              title="Heading 2"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              icon={<Heading3 className="w-4 h-4" />}
              title="Heading 3"
            />
          </div>

          {/* Lists */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              icon={<List className="w-4 h-4" />}
              title="Bullet List"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              icon={<ListOrdered className="w-4 h-4" />}
              title="Numbered List"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              icon={<Quote className="w-4 h-4" />}
              title="Quote"
            />
          </div>

          {/* Alignment */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              icon={<AlignLeft className="w-4 h-4" />}
              title="Align Left"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              icon={<AlignCenter className="w-4 h-4" />}
              title="Align Center"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              icon={<AlignRight className="w-4 h-4" />}
              title="Align Right"
            />
          </div>

          {/* Media */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => setShowImageModal(true)}
              icon={<ImageIcon className="w-4 h-4" />}
              title="Insert Image"
            />
            <ToolbarButton
              onClick={() => setShowVideoModal(true)}
              icon={<YoutubeIcon className="w-4 h-4" />}
              title="Insert Video"
            />
            <ToolbarButton
              onClick={() => setShowPdfModal(true)}
              icon={<FileText className="w-4 h-4" />}
              title="Insert PDF"
            />
            <ToolbarButton
              onClick={() => fileInputRef.current?.click()}
              icon={<Upload className="w-4 h-4" />}
              title="Upload File"
            />
          </div>

          {/* Interactive */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => setShowLinkModal(true)}
              icon={<LinkIcon className="w-4 h-4" />}
              title="Insert Link"
            />
            <ToolbarButton
              onClick={() => setShowQuizModal(true)}
              icon={<HelpCircle className="w-4 h-4" />}
              title="Insert Quiz"
            />
          </div>

          {/* Callouts */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <div className="relative group">
              <ToolbarButton
                onClick={() => insertCallout('info')}
                icon={<Info className="w-4 h-4" />}
                title="Insert Callout"
              />
              <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => insertCallout('info')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Info className="w-4 h-4 mr-2 text-blue-500" />
                  Info
                </button>
                <button
                  onClick={() => insertCallout('warning')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                  Warning
                </button>
                <button
                  onClick={() => insertCallout('tip')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Lightbulb className="w-4 h-4 mr-2 text-green-500" />
                  Tip
                </button>
                <button
                  onClick={() => insertCallout('note')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  Note
                </button>
                <button
                  onClick={() => insertCallout('success')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Success
                </button>
                <button
                  onClick={() => insertCallout('error')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                  Error
                </button>
              </div>
            </div>
          </div>

          {/* Utilities */}
          <div className="flex">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              icon={<RotateCcw className="w-4 h-4" />}
              title="Undo"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              icon={<RotateCw className="w-4 h-4" />}
              title="Redo"
            />
            <ToolbarButton
              onClick={() => setIsPreview(!isPreview)}
              isActive={isPreview}
              icon={<Eye className="w-4 h-4" />}
              title="Preview"
            />
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        {isPreview ? (
          <div 
            className="prose prose-lg max-w-none p-4 min-h-[400px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Image Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title="Insert Image"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              value={imageForm.url}
              onChange={(e) => setImageForm(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={imageForm.alt}
              onChange={(e) => setImageForm(prev => ({ ...prev, alt: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe the image"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              value={imageForm.caption}
              onChange={(e) => setImageForm(prev => ({ ...prev, caption: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Image caption (optional)"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowImageModal(false)}>
              Cancel
            </Button>
            <Button onClick={insertImage} disabled={!imageForm.url}>
              Insert Image
            </Button>
          </div>
        </div>
      </Modal>

      {/* Video Modal */}
      <Modal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        title="Insert Video"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL *
            </label>
            <input
              type="url"
              value={videoForm.url}
              onChange={(e) => setVideoForm(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width
              </label>
              <input
                type="number"
                value={videoForm.width}
                onChange={(e) => setVideoForm(prev => ({ ...prev, width: parseInt(e.target.value) || 640 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <input
                type="number"
                value={videoForm.height}
                onChange={(e) => setVideoForm(prev => ({ ...prev, height: parseInt(e.target.value) || 480 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowVideoModal(false)}>
              Cancel
            </Button>
            <Button onClick={insertVideo} disabled={!videoForm.url}>
              Insert Video
            </Button>
          </div>
        </div>
      </Modal>

      {/* Link Modal */}
      <Modal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        title="Insert Link"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              type="url"
              value={linkForm.url}
              onChange={(e) => setLinkForm(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Text (optional)
            </label>
            <input
              type="text"
              value={linkForm.text}
              onChange={(e) => setLinkForm(prev => ({ ...prev, text: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Link text"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to use selected text or URL as link text
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowLinkModal(false)}>
              Cancel
            </Button>
            <Button onClick={insertLink} disabled={!linkForm.url}>
              Insert Link
            </Button>
          </div>
        </div>
      </Modal>

      {/* PDF Modal */}
      <Modal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        title="Insert PDF"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF URL *
            </label>
            <input
              type="url"
              value={pdfForm.url}
              onChange={(e) => setPdfForm(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/document.pdf"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={pdfForm.name}
              onChange={(e) => setPdfForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Document name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={pdfForm.description}
              onChange={(e) => setPdfForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of the document"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowPdfModal(false)}>
              Cancel
            </Button>
            <Button onClick={insertPdf} disabled={!pdfForm.url}>
              Insert PDF
            </Button>
          </div>
        </div>
      </Modal>

      {/* Quiz Modal */}
      <Modal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        title="Insert Quiz Block"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <textarea
              value={quizForm.question}
              onChange={(e) => setQuizForm(prev => ({ ...prev, question: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your quiz question here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options *
            </label>
            <div className="space-y-3">
              {quizForm.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={quizForm.correctAnswer === index}
                    onChange={() => setQuizForm(prev => ({ ...prev, correctAnswer: index }))}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="font-medium text-gray-700 w-6">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...quizForm.options];
                      newOptions[index] = e.target.value;
                      setQuizForm(prev => ({ ...prev, options: newOptions }));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Select the radio button next to the correct answer
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation (optional)
            </label>
            <textarea
              value={quizForm.explanation}
              onChange={(e) => setQuizForm(prev => ({ ...prev, explanation: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Explain why this is the correct answer..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowQuizModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={insertQuiz} 
              disabled={!quizForm.question || quizForm.options.some(opt => !opt.trim())}
            >
              Insert Quiz
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};