import Layout from "../../features/landing/layout/layout";
import Home from "../../features/landing";

import AttemptQuiz from "../../features/AttemptQuiz";
import QuizSubmitted from "../../features/AttemptQuiz/quizSubmitted";

import Dashboard from "../../features/Dashboard";
import Content from "../../features/Dashboard/content";
import QuizManager from "../../features/createQuiz/QuizManager";
import QuizResponses from "../../features/Dashboard/components/quizResponses";

import Editor from "../../features/Editor";
import Admin from "../../pages/admin";

import PageNotFound from "../../shared/components/pageNotFound";

import Login from "../../features/auth/login";
import Register from "../../features/auth/register";
import VerifyUser from "../../pages/verifyUser";
import ProtectedRoute from "./protectedRoutes";

export const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/verified/:status",
    element: <VerifyUser />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "editor/:workspaceId/:quizId",
            element: <Editor />,
          },
          {
            path: "dashboard",
            element: (
              <Dashboard>
                <Content />
              </Dashboard>
            ),
          },
          {
            path: "dashboard/:quizId",
            element: (
              <Dashboard>
                <QuizResponses />
              </Dashboard>
            ),
          },
          {
            path: "dashboard/create/:workspaceId",
            element: <QuizManager />,
          },
        ],
      },
      {
        path: "attempt/:quizId",
        element: <AttemptQuiz />,
      },
      {
        path: "submit/success/:quizId/:responseId",
        element: <QuizSubmitted />,
      },
      {
        path: "preview/:quizId",
        element: <AttemptQuiz previewMode={true} />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
