# ZenFlow - Minimalist Kanban Board

A premium, minimalist Kanban board application built with React, Tailwind CSS, and smooth drag-and-drop functionality.

## 🎯 Features

- **Drag & Drop**: Seamlessly move tasks between columns using smooth animations
- **CRUD Operations**:
  - ✨ Create: Add new tasks via modal
  - 📖 Read: View all tasks organized in three columns
  - ✏️ Update: Edit task titles or drag tasks between columns
  - 🗑️ Delete: Remove tasks with one click
- **Data Persistence**: All tasks are automatically saved to localStorage
- **Modern Light Theme**: Clean, professional white theme with premium styling
- **Responsive**: Works great on all screen sizes
- **Edit Inline**: Click on a task title to edit it directly

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── TaskCard.jsx      # Individual task card with edit/delete
│   ├── Column.jsx        # Kanban column container
│   └── AddTaskModal.jsx  # Modal for creating new tasks
├── Pages/
│   └── Home.jsx          # Main kanban board view
├── Interfaces/
│   └── initialData.js    # Initial data and mock tasks
├── App.jsx               # Root component
├── main.jsx              # Entry point
└── index.css             # Tailwind styles and custom CSS
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The development server will open automatically at `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Design System

### Colors

- **Primary Background**: `#FFFFFF` (White)
- **Secondary Background**: `#F8F9FA` (Light Gray)
- **Tertiary Background**: `#F3F4F6` (Lighter Gray)
- **Borders**: `#E5E7EB` (Light Border)
- **Primary Text**: `#1F2937` (Dark Gray)
- **Secondary Text**: `#6B7280` (Medium Gray)
- **Accent**: `#3B82F6` (Blue)
- **Accent Hover**: `#2563EB` (Darker Blue)

### Typography

- **Font**: Inter, Geist (Sans-serif)
- **Weight**: 400, 500, 600, 700

### Components

- Rounded corners: `rounded-lg` / `rounded-xl`
- Borders: Subtle light borders (`border-light`)
- Shadows: Premium subtle shadows on hover
- Animations: Smooth transitions throughout

## 💡 Usage

### Adding a Task

1. Click the "+ Add Task" button in the header
2. Enter your task title
3. Click "Add Task" or press Enter

### Editing a Task

1. Click on any task title to edit it inline
2. Make your changes
3. Press Enter to save or Escape to cancel

### Moving a Task

1. Click and hold a task card
2. Drag it to another column
3. Release to drop

### Deleting a Task

1. Hover over a task card
2. Click the delete icon (trash)
3. Task is immediately removed

## 📦 Dependencies

- **React 18.2.0** - UI library
- **@hello-pangea/dnd 16.5.0** - Drag and drop
- **Tailwind CSS 3.3.0** - Utility-first CSS
- **Vite 4.3.9** - Build tool

## 💾 Data Persistence

All task data is automatically saved to the browser's localStorage under the key `kanban-data`. Your tasks will persist even after closing and reopening the browser.

To clear your data: Open DevTools (F12) → Console → `localStorage.removeItem('kanban-data')`

## 🎨 Customization

### Adding More Columns

Edit `src/Interfaces/initialData.js` to add new columns to the `columns` object.

### Changing Colors

Edit the color values in `tailwind.config.js` or override in `src/index.css`

### Modifying Initial Tasks

Edit the `initialData` object in `src/Interfaces/initialData.js`

## 🔧 Tech Stack

- **Frontend**: React 18 (Hooks)
- **Styling**: Tailwind CSS
- **Drag & Drop**: @hello-pangea/dnd
- **Build**: Vite
- **Storage**: localStorage API

## 📝 Notes

- This is a frontend-only application (no backend required)
- Works completely offline after first load
- Modern light theme with premium, professional styling
- Responsive design optimized for desktop and tablet viewing
- Perfect for personal task management and organization

---

Built with ❤️ for minimal, focused productivity.
