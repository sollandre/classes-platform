import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Event } from "./pages/Event";
import { Profile } from "./pages/Profile";
import { Subscribe } from "./pages/Subscribe";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="/event" element={<Event />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/event/lesson/:slug" element={
        <RequireAuth>
          <Event />
        </RequireAuth>
      }/>
    </Routes>
  )
}