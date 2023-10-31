import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Event } from "./pages/Event";
import { Profile } from "./pages/Profile";
import { Subscribe } from "./pages/Subscribe";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="/event" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="/event/:courseSlug" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="/event/:course/:slug" element={
        <RequireAuth>
          <Event />
        </RequireAuth>
      }/>
    </Routes>
  )
}