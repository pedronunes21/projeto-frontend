import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/login';
import Register from '../pages/register';
import Trainigns from '../pages/training/trainings';
import Lessons from '../pages/lesson/lesson';
import Profiles from '../pages/profile/profile';
import PrivateRoute from './private';
import AdminRoute from './admin';
import AdminCreateTraining from '../pages/admin/adminCreateTraining';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/entrar" exact />
                <Route component={Register} path="/registro" exact />
                <PrivateRoute component={Trainigns} path="/treinos" />
                <PrivateRoute component={Lessons} path="/aulas" />
                <PrivateRoute component={Profiles} path="/perfil" />
                {/* <PrivateRoute element={GenerateCustomersPdf} path="/report" /> */}

                <AdminRoute component={AdminCreateTraining} path='/admin/treinos/criar' />

                <Route render={() => <Redirect to="/entrar" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;