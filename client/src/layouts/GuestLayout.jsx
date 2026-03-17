import GuestNav from '../components/navigation/GuestNav'
import { Outlet } from 'react-router-dom'

export default function GuestLayout() {
  return (
    <div className="cinematic-app min-h-screen text-primary" style={{ position: 'relative', overflow: 'hidden' }}>
      <GuestNav />
      <div className="landing-lamp-glow">
        <div className="landing-lamp-source" />
        <div className="landing-lamp-beam" />
        <div className="landing-lamp-core" />
        <div className="landing-lamp-haze" />
        <div className="landing-lamp-floor" />
      </div>
      <Outlet />
    </div>
  )
}
