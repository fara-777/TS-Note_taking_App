import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../../types";
import { Navigate } from "react-router-dom";

type LayoutProps = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutProps) => {
  const { id } = useParams();
  // Find the note
  const note = notes.find((n) => n.id == id);
  // Redirect to the home page if the note is not found
  if (!note) return <Navigate to={"/"} replace />;

  // Render the child component if the note is found

  return <Outlet context={note} />;
};
// A function to access note information for use in child routers
export function useNote() {
  return useOutletContext<Note>();
}
export default Layout;
