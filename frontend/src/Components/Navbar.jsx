/** @format */

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  ShoppingCart,
  PlusCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

import Login from "./Login";
import Departements from "./Departements";
import DepartementsList from "./DepartementsList";
import Demande from "./Demande";
import ListDemande from "./ListDemande";
import "./Styles/navbar.css";

const menuItems = [
  {
    title: "Tableau de bord",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Départements",
    path: "/departement",
    icon: Building2,
  },
  {
    title: "Ajouter département",
    path: "/ajouter/departement",
    icon: PlusCircle,
  },
  {
    title: "Demandes d'achat",
    path: "/demande",
    icon: ShoppingCart,
  },
  {
    title: "Liste des demandes",
    path: "/demande/liste",
    icon: ClipboardList,
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className='mobile-menu-button'
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {open ?
          <X size={23} />
        : <Menu size={23} />}
      </button>

      {open && (
        <div className='sidebar-overlay' onClick={() => setOpen(false)} />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className='sidebar-brand'>
          <div className='brand-icon'>
            <ShoppingCart size={25} />
          </div>

          <div>
            <h2>Suivi Achat</h2>
            <p>Gestion des achats</p>
          </div>
        </div>

        <div className='sidebar-section-title'>MENU PRINCIPAL</div>

        <nav className='sidebar-nav'>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={20} strokeWidth={1.8} />

                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className='sidebar-bottom'>
          <div className='user-profile'>
            <div className='user-avatar'>SA</div>

            <div className='user-info'>
              <strong>Administrateur</strong>
              <span>Gestionnaire</span>
            </div>
          </div>

          <NavLink
            to='/'
            className='sidebar-link logout-link'
            onClick={() => setOpen(false)}
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

const Dashboard = () => {
  return (
    <div className='dashboard-content'>
      <div className='welcome-card'>
        <span className='welcome-badge'>ESPACE DE GESTION</span>

        <h1>Bienvenue sur Suivi Achat</h1>

        <p>
          Gérez les départements et suivez les demandes d'achat de votre
          organisation depuis un seul endroit.
        </p>
      </div>

      <div className='dashboard-grid'>
        <div className='dashboard-card'>
          <div className='dashboard-card-icon blue'>
            <Building2 size={25} />
          </div>

          <h3>Départements</h3>
          <p>Consultez et gérez les départements.</p>

          <NavLink to='/departement'>Voir les départements →</NavLink>
        </div>

        <div className='dashboard-card'>
          <div className='dashboard-card-icon green'>
            <ShoppingCart size={25} />
          </div>

          <h3>Demandes d'achat</h3>
          <p>Créez et suivez les demandes d'achat.</p>

          <NavLink to='/demande'>Gérer les demandes →</NavLink>
        </div>

        <div className='dashboard-card'>
          <div className='dashboard-card-icon orange'>
            <ClipboardList size={25} />
          </div>

          <h3>Liste des demandes</h3>
          <p>Consultez les demandes enregistrées.</p>

          <NavLink to='/demande/liste'>Consulter la liste →</NavLink>
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  const location = useLocation();

  // La page de connexion s'affiche sans la sidebar.
  if (location.pathname === "/") {
    return <Login />;
  }

  return (
    <div className='app-layout'>
      <Sidebar />

      <main className='main-content'>
        <header className='topbar'>
          <div>
            <span className='topbar-label'>APPLICATION</span>
            <h2>Suivi des achats</h2>
          </div>

          <div className='topbar-status'>
            <span className='status-dot' />
            Système actif
          </div>
        </header>

        <div className='page-content'>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />

            <Route path='/departement' element={<DepartementsList />} />

            <Route path='/ajouter/departement' element={<Departements />} />

            <Route path='/demande' element={<Demande />} />

            <Route path='/demande/liste' element={<ListDemande />} />

            <Route
              path='*'
              element={
                <div className='not-found'>
                  <h2>Page introuvable</h2>
                  <p>La page demandée n'existe pas.</p>

                  <NavLink to='/dashboard'>Retour au tableau de bord</NavLink>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const Navbar = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default Navbar;
