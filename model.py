from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):

    __tablename__ = "users"

    _id = db.Column(db.Integer, autoincrement=True)
    username = db.Column(db.Text, unique=True, primary_key=True)
    
    def __repr__(self):
        """A reader friendly view of the User"""
        return f"<User id:{self._id} username:{self.username}>"
    

class Appointment(db.Model):

    __tablename__ = "appointments"

    _id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, db.ForeignKey("users.username"), nullable=False)
    date = db.Column(db.Date)
    time = db.Column(db.Time)

    def __repr__(self):
        """A reader friendly view of the Appointment"""
        return f"<Appointment id:{self._id} user:{self.username} Date:{self.date} Time:{self.time}>"


def connect_to_app(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///melonAppointments"
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.app = app  
    db.init_app(app)
    with app.app_context():
        db.create_all()
    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_app(app)