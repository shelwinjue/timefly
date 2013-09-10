#coding:utf-8
import datetime
from flask.blueprints import Blueprint
from flask.ext.login import current_user
from flask.globals import request
from flask.templating import render_template
from werkzeug.exceptions import abort
from models.todo import Todo
from models.user import User
from utils.database_session import session_cm

todo = Blueprint('todo', __name__, template_folder='templates/todo')


@todo.route('/')
@todo.route('/index')
def index():
    with session_cm() as session:
        user_list = session.query(User).all()
        todo_list = session.query(Todo).filter_by(todo_visible=True)
        context = {
            'user_list': user_list,
            'todo_list': todo_list,
            'position': 'index'
        }
    return render_template('todo/index.html', **context)


@todo.route('/<username>')
def user_home(username):
    print username
    with session_cm() as session:
        owner = session.query(User).filter_by(username=username).first()
        if owner:
            status = request.args.get("status") if request.args.get("status") is not None else "ing"
            todo_list_query = session.query(Todo).filter(Todo.user_id == owner.user_id,
                                                         Todo.todo_is_deleted == False)
            if status == "ing":
                todo_list_query = todo_list_query.filter(Todo.todo_is_completed == False,
                                                         Todo.todo_end > datetime.date.today())
                if not current_user.is_authenticated() or \
                        (current_user.is_authenticated() and owner.username != current_user.username):
                    todo_list_query = todo_list_query.filter(Todo.todo_visible == True)
            if status == "ed":
                todo_list_query = todo_list_query.filter(Todo.todo_is_completed == True)
                if not current_user.is_authenticated() or \
                        (current_user.is_authenticated() and owner.username != current_user.username):
                    todo_list_query = todo_list_query.filter(Todo.todo_visible == True)
            if status == "fail":
                todo_list_query = todo_list_query.\
                    filter(Todo.todo_is_completed == False).\
                    filter(Todo.todo_end < datetime.date.today().replace(day=datetime.date.today().day - 1))
                if not current_user.is_authenticated() or \
                        (current_user.is_authenticated() and owner.username != current_user.username):
                    todo_list_query = todo_list_query.filter(Todo.todo_visible == True)

            todo_list = todo_list_query.all()

            context = {
                'todo_list': todo_list,
                'owner': owner,
                'status': status,
                'ing_count': 0,
                'ed_count': 0,
                'fail_count': 0
            }
            return render_template('todo/home.html', **context)
        abort(404)