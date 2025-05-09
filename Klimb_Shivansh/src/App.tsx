import GooeyNav from './components/ui/GooeyNav'
import { Search } from './components/ui/search'
import { EditUserForm } from './components/ui/user-edit-form'
import { InputForm } from './components/ui/user-form'
import { useFormStateStore } from './store/use-form-state-store'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

function App() {
  const { mode, currentUser, openForm } = useFormStateStore()
  const [activeIndex, setActiveIndex] = useState(0)

  const items = [
    { label: "New User", href: "new" },
    { label: "Manage User", href: "search" },
  ]

  const handleNavChange = (index: number) => {
    setActiveIndex(index)
    if (index === 0) {
      openForm("add")
    } else {
      
      openForm("search")
    }
  }

  const renderContent = () => {

    switch (mode) {
      case 'add':
        return <InputForm />
      case 'edit':
        return currentUser ? <EditUserForm user={currentUser} /> : null
      case 'search':
        return <Search />
      default:
        return <InputForm />
    }
  }

  useEffect(() => {

    openForm("add")
  }, [])
  

  useEffect(() => {

    if (mode === 'add') {
      setActiveIndex(0);

    } else if (mode === 'search') {
      setActiveIndex(1);

    }
  }, [mode]);

  return (
    <div className="min-h-screen w-screen bg-indigo-100 flex items-center justify-center p-4 flex-col gap-6 overflow-scroll">
      <div className='-mt-20'>
      <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={activeIndex}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          onActiveIndexChange={handleNavChange}
        />
      </div>

      <div className='mt-20'>
        {renderContent()}
      </div>
    <Toaster position="bottom-right" />
    </div>
  )
}

export default App