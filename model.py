from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

class User(db.Model):

    __tablename__ = "users"

    _id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, unique=True)
    
    def __repr__(self):
        """A reader friendly view of the User"""
        return f"<User id:{self.id} username:{self.username}>"
    

class Appointment(db.Model):

    __tablename__ = "appointments"

    _id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users._id"), nullable=False)
    date = db.Column(db.Date)
    time = db.Column(db.Time)

    def __repr__(self):
        """A reader friendly view of the Appointment"""
        return f"<Appointment id:{self.id} user:{self.user_id} Date:{self.date} Time:{self.time}>"


def connect_to_app(app, db_name):
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)
    print("Connected to db!")


if __name__ == "__main__":
    from server import app
    connect_to_app(app, "melonAppointments")