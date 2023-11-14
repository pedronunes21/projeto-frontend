import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/login';
import Register from '../pages/register';
import Trainigns from '../pages/training/trainings';
import Lessons from '../pages/lesson/lesson';
import Profiles from '../pages/profile/profile';
import PrivateRoute from './private';
import AdminRoute from './admin';
import AdminCreateTraining from '../pages/admin/adminCreateTraining';
import AdminEditTraining from '../pages/admin/adminEditTraining';
import AdminCreateLesson from '../pages/admin/adminCreateLesson';
import AdminEditLesson from '../pages/admin/adminEditLesson';
import AdminListLessonUsers from '@/pages/admin/adminListLessonUsers';
import LessonReports from '@/pages/lesson/lessonReports';
import LessonsCalendar from '@/pages/lesson/lessonCalendar';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/entrar" exact />
                <Route component={Register} path="/registro" exact />
                <PrivateRoute component={Trainigns} path="/treinos" />
                <PrivateRoute component={Lessons} path="/aulas" />
                <PrivateRoute component={LessonsCalendar} path="/calendario/aulas" />
                <PrivateRoute component={Profiles} path="/perfil" />

                <AdminRoute component={AdminCreateTraining} path='/admin/treinos/criar' />
                <AdminRoute component={AdminEditTraining} path='/admin/treinos/editar/:id' />

                <AdminRoute component={AdminCreateLesson} path='/admin/aulas/criar' />
                <AdminRoute component={LessonReports} path='/admin/aulas/relatorios' />
                <AdminRoute component={AdminListLessonUsers} path='/admin/aulas/alunos/:id' />
                <AdminRoute component={AdminEditLesson} path='/admin/aulas/editar/:id' />

                <Route render={() => <Redirect to="/entrar" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;