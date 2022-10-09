import model
from datetime import datetime, time

def user_login(username):

    user = model.User.query.filter_by(username=username).first()

    return user


def create_user(username):

    new_user = model.User(username=username)

    model.db.session.add(new_user)
    model.db.session.commit()

    return new_user


def user_appointments(username):

    appointments = model.Appointment.query.filter_by(username=username).all()

    return appointments



def book_appoointment(date, time, username):

    book = model.Appointment(
                            date=date,
                            time=time,
                            username=username
                            )

    model.db.session.add(book)
    model.db.session.commit()

    return book


def get_times(date):
        
    taken = model.Appointment.query.filter_by(date=date).all()
    
    if not taken:
        return None

    times = set()

    for appointment in taken:
        times.add(appointment.time)
    
    all_time = []

    for i in range(24):
        hour = time(i,0)
        if hour in times:
            continue
        all_time.append(hour)

        half = time(i,30)
        if half in times:
            continue
        all_time.append(half)
   

    return all_time


    
        