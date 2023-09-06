import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import { createContext, useReducer, useState } from "react";
import { initialState, authReducer } from "./Reducers/authReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./client/components/layouts/Layout";
import ChatEditor from "./client/pages/ChatEditor";
import Templates from "./client/pages/Templates";
import PromptsStructure from "./client/pages/PromptsStructure";
import PromptTemplate from "./client/pages/PromptTemplate";
import Tool from "./client/pages/Tool";
import DalleForm from "./client/components/Tools/DalleForm/DalleForm";
import UsePrompt from "./client/pages/UsePrompt";
import Contact from "./client/components/essentials/Contact";
import Plans from "./client/components/essentials/Plans";
import TrackSubs from "./client/components/essentials/TrackSubs";
import useCache from "./hooks/useCache";
import PrivateRoute from "./client/components/essentials/PrivateRoute";
import useWords from "./hooks/useWords";
import Stepper from "./auth/Stepper";
import Profile from "./client/pages/Profile";
import Projects from "./client/pages/Projects";
import Prompts from "./client/pages/Prompts";
import VerifyEmail from "./client/components/essentials/VerifyEmail";
import { useToolsDesc } from "./hooks/useToolsDesc";
import Members from "./client/pages/Members";
import ChatBox from "./client/pages/ChatBox";
import ProjectByFolder from "./client/components/Projects/ProjectByFolder/ProjectByFolder";
import { DataProvider } from "./context/DataContext";
import Success from "./client/components/essentials/Success";
import ChatHistoryPage from "./client/pages/ChatHistoryPage";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [userWords, setUserWords] = useState(0);
  const toolsDesc = useToolsDesc();
  
  useCache();
  useWords(state, setUserWords);

  return (
    <>
      <Router>
        <UserContext.Provider
          value={{ state, dispatch, userWords, setUserWords }}
        >
          <DataProvider>
          <ToastContainer />
          <Routes>
           <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Stepper />} />
            <Route path="/:id/verify/:token" element={<VerifyEmail />} />
            <Route
              path="/plans"
              element={
                <Layout>
                  <Plans />
                </Layout>
              }
            />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to="/chat" />} />
              <Route path="/use-prompt/:promptId" element={<UsePrompt />} />
              <Route path="/subscription" element={<TrackSubs />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route
                path="*"
                element={
                  <>
                    <Layout>
                      <Routes>
                        <Route path="/chat-history" element={<ChatHistoryPage />} />
                        <Route path="/chat-with-sophia" element={<ChatBox />} />
                        <Route path="/chat-with-sophia/:id" element={<ChatBox />} />
                        <Route path="/folder/:folderId" element={<ProjectByFolder />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/members" element={<Members />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/prompts" element={<Prompts />} />
                        <Route path="/chat" element={<ChatEditor />} />
                        <Route path="/chat/:chatId" element={<ChatEditor />} />
                        <Route path="/templates" element={<Templates />} />
                        <Route path="/users-templates" element={<Templates />} />
                        <Route
                          path="/templates/:topic"
                          element={<Templates />}
                        />
                        <Route
                          path="/tools/generate-image"
                          element={<DalleForm />}
                        />
                        <Route path="/tools" element={<PromptsStructure />} />
                        <Route
                          path="/post-prompt"
                          element={<PromptTemplate />}
                        />
                        <Route
                          path="/edit-prompt/:id"
                          element={<PromptTemplate />}
                        />
                        <Route
                          path="/tools/:category"
                          element={<PromptsStructure />}
                        />
                        {toolsDesc.map((tool) => (
                          <Route
                            key={tool.link}
                            path={`${tool.link}`}
                            element={
                              <Tool
                                toolName={tool.name?.title}
                                tool={tool}
                              />
                            }
                          />
                        ))}
                      </Routes>
                    </Layout>
                  </>
                }
              />
            </Route>
          
          </Routes>
          </DataProvider>
        </UserContext.Provider>
        
      </Router>
    </>
  );
}

export default App;
