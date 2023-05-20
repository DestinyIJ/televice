import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
// import { readdirSync } from 'fs';


function PageRoutes() {
  const [routes, setRoutes] = useState([]);
  const router = useRoutes()
  console.log(router)

  // useEffect(() => {
  //   const importRoutes = (dir) => {
  //     const files = readdirSync(dir);

  //     const newRoutes = files
  //       .filter((file) => file.endsWith('.jsx'))
  //       .map((file) => {
  //         file = file === "index.jsx" ? '' : file
  //         console.log(file)
  //         const path =
  //           dir === './pages'
  //             ? `/${file.replace(/\.jsx$/, '')}`
  //             : `/${dir.replace(/^\.\/pages/, '')}/${file.replace(/\.jsx$/, '')}`;

  //         return {
  //           path,
  //           component: React.lazy(() => import(`./${dir}/${file}.jsx`)),
  //           exact: true,
  //         };
  //       });

  //     const subdirs = files.filter((file) =>
  //       readdirSync(`${dir}/${file}`).some((f) => f.endsWith('.jsx'))
  //     );

  //     return newRoutes.concat(
  //       subdirs.flatMap((subdir) => importRoutes(`${dir}/${subdir}`))
  //     );
  //   };

  //   const newRoutes = importRoutes('./pages');

  //   setRoutes(newRoutes);
  // }, []);

  return (
    <Router>
      <Routes>
        {routes.map(({ path, component, exact }) => (
          <Route key={path} path={path} component={component} exact={exact} />
        ))}
      </Routes>
    </Router>
  );
}

export default PageRoutes;
