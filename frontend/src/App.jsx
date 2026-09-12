import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import LessonPage from './pages/LessonPage'
import NotFoundPage from './pages/NotFoundPage'
import ProgressPage from './pages/ProgressPage'
import MemoryPage from './pages/MemoryPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="niveau/:levelId" element={<LevelPage />} />
        <Route path="niveau/:levelId/lecon/:lessonSlug" element={<LessonPage />} />
        <Route path="progression" element={<ProgressPage />} />
        <Route path="cartes-memoire" element={<Navigate to="/cartes-memoire/6e" replace />} />
        <Route path="cartes-memoire/:levelId" element={<MemoryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="accueil" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
