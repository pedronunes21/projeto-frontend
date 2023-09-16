import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/login';
import Register from '../pages/register';
import Trainigns from '../pages/training/trainings';
import Classes from '../pages/training/classes';
import Profiles from '../pages/training/profile';
import PrivateRoute from './private';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/entrar" exact />
                <Route component={Register} path="/registro" exact />
                <PrivateRoute component={Trainigns} path="/treinos" />
                <PrivateRoute component={Classes} path="/aulas" />
                <PrivateRoute component={Profiles} path="/perfil" />
                {/* <PrivateRoute element={GenerateCustomersPdf} path="/report" /> */}
                <Route render={() => <Redirect to="/entrar" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;