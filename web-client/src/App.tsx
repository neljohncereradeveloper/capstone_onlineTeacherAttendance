import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  CampusRecordsPage,
  ClassRecordsPage,
  ClassRegistrationPage,
  ClassRoomRecordsPage,
  HomePage,
  LoginPage,
  SettingsPage,
  TeacherEditPage,
  TeacherPage,
  TeacherRegistrationPage,
} from './pages';
import PrivateRoute from './routes/privateRoutes';
import PublicRoute from './routes/publicRoute';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login">
          <LoginPage />
        </PublicRoute>
        <PrivateRoute path="/campus-records">
          <CampusRecordsPage />
        </PrivateRoute>
        <PrivateRoute path="/classroom-records">
          <ClassRoomRecordsPage />
        </PrivateRoute>
        <PrivateRoute path="/class-records">
          <ClassRecordsPage />
        </PrivateRoute>
        <PrivateRoute path="/class-registration">
          <ClassRegistrationPage />
        </PrivateRoute>
        <PrivateRoute path="/teachers">
          <TeacherPage />
        </PrivateRoute>
        <PrivateRoute path="/teacher-registration">
          <TeacherRegistrationPage />
        </PrivateRoute>
        <PrivateRoute path="/teacher-edit">
          <TeacherEditPage />
        </PrivateRoute>
        <PrivateRoute path="/settings">
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
