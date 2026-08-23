import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { fileService } from '../services/api'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [status, setStatus] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null) // Added to reset file input UI

  const [formData, setFormData] = useState({
    f_file_type: '',
    f_path: '',
    f_url: '',
    f_web_service: '',
  })

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Ensure the file is an image
      if (!file.type.startsWith('image/')) {
        setStatus('Error: Please select a valid image file.')
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = '' // Clear invalid selection
        return
      }

      setStatus('')
      setSelectedFile(file)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      setStatus('Please select an image file first.')
      return
    }

    // Properly instantiate and populate a native browser FormData container
    const submissionData = new FormData()
    submissionData.append('file', selectedFile) // 'file' matches your backend multer configuration
    submissionData.append('f_web_service', formData.f_web_service)
    submissionData.append('f_file_type', formData.f_file_type)
    submissionData.append('f_path', formData.f_path)
    submissionData.append('f_url', formData.f_url)

    try {
      setStatus('Uploading image...')

      // Send the multi-part data payload via your api service
      await fileService.createFile(submissionData)

      setStatus('Image successfully uploaded and saved!')
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = '' // Clear input after success
      
      setFormData({
        f_file_type: '',
        f_path: '',
        f_url: '',
        f_web_service: '',
      })
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Unknown error occurred'
      setStatus(`Error: ${errorMessage}`)
    }
  }

  return (
    <div style={styles.window}>
      <div style={styles.titleBar}>
        <span>File Upload Manager</span>
      </div>
      <div style={styles.content}>
        <h2 style={styles.heading}>Upload Image to Public Storage</h2>
        <form onSubmit={handleUpload}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Web Service (f_web_service):</label>
            <input
              type="text"
              value={formData.f_web_service}
              onChange={(e) => setFormData({ ...formData, f_web_service: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>File Type (f_file_type):</label>
            <input
              type="text"
              value={formData.f_file_type}
              onChange={(e) => setFormData({ ...formData, f_file_type: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>File Path (f_path):</label>
            <input
              type="text"
              value={formData.f_path}
              onChange={(e) => setFormData({ ...formData, f_path: e.target.value })}
              style={styles.input}
              placeholder="e.g. /uploads/filename.ext"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>File URL (f_url):</label>
            <input
              type="text"
              value={formData.f_url}
              onChange={(e) => setFormData({ ...formData, f_url: e.target.value })}
              style={styles.input}
              placeholder="e.g. https://domain.com/uploads/..."
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Select Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              ref={fileInputRef} 
              style={styles.fileInput} 
              required 
            />
          </div>

          <button type="submit" style={styles.button}>Save File</button>
        </form>

        {status && <div style={styles.statusBar}>{status}</div>}
      </div>
    </div>
  )
}

// Windows Aero Theme Styling Object
const styles = {
  window: {
    background: 'linear-gradient(to bottom, rgba(240, 248, 255, 0.9), rgba(200, 220, 240, 0.85))',
    border: '1px solid rgba(120, 150, 190, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 50, 100, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    maxWidth: '440px',
    margin: '40px auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    overflow: 'hidden',
    backdropFilter: 'blur(6px)',
  },
  titleBar: {
    background: 'linear-gradient(to bottom, rgba(230, 242, 255, 0.9), rgba(170, 205, 240, 0.9))',
    borderBottom: '1px solid rgba(140, 175, 210, 0.8)',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a3b5c',
    textShadow: '0 1px 0 rgba(255, 255, 255, 0.6)',
  },
  content: {
    padding: '20px',
  },
  heading: {
    fontSize: '16px',
    color: '#1a3b5c',
    marginBottom: '16px',
    marginTop: '0',
    textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
  },
  fieldGroup: {
    marginBottom: '14px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#334455',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '6px 10px',
    borderRadius: '4px',
    border: '1px solid #9ab4d0',
    backgroundColor: '#ffffff',
    color: '#333333',
    boxShadow: 'inset 1px 2px rgba(0, 0, 0, 0.08)',
    boxSizing: 'border-box',
    outline: 'none',
  },
  fileInput: {
    fontSize: '12px',
    color: '#333333',
  },
  button: {
    background: 'linear-gradient(to bottom, #dff0fe 0%, #b8d9f8 50%, #9bc4ec 51%, #82b3e8 100%)',
    border: '1px solid #5a8bc5',
    borderRadius: '4px',
    color: '#112233',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    padding: '7px 16px',
    textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.1)',
    marginTop: '6px',
  },
  statusBar: {
    marginTop: '15px',
    padding: '8px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(150, 180, 210, 0.5)',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#224466',
  }
}