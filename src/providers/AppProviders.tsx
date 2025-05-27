import { NotesProvider } from "../context/NotesContext";

type Props = {
  children: React.ReactNode;
};

function AppProviders({ children }: Props) {
  return <NotesProvider>{children}</NotesProvider>;
}

export default AppProviders;
