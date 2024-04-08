import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Recipes from './components/Recipes.jsx'
import Recipe from './components/Recipe.jsx'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/recipes/:recipeId",
    element: <Recipe />,
  },
]);

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

  // </React.StrictMode>,
)
